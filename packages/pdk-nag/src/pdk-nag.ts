/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  App,
  AppProps,
  Aspects,
  IAspect,
  Stack,
  Stage,
  StageSynthesisOptions,
} from "aws-cdk-lib";
import { CloudAssembly } from "aws-cdk-lib/cx-api";
import {
  AwsSolutionsChecks,
  NagPack,
  NagPackSuppression,
  NagSuppressions,
} from "cdk-nag";
import { IConstruct } from "constructs";

const CDK_NAG_MESSAGE_TYPES = {
  ERROR: "aws:cdk:error",
  WARNING: "aws:cdk:warning",
};
const CDK_NAG_MESSAGE_TYPES_SET = new Set(Object.values(CDK_NAG_MESSAGE_TYPES));
const DEFAULT_NAG_PACKS = [
  new AwsSolutionsChecks({
    verbose: true,
    reports: true,
  }),
];

/**
 * Message instance.
 */
export interface Message {
  /**
   * Message description.
   */
  readonly messageDescription: string;

  /**
   * Message type as returned from cdk-nag.
   */
  readonly messageType: string;
}

/**
 * Nag result.
 */
export interface NagResult {
  /**
   * Resource which triggered the message.
   */
  readonly resource: string;

  /**
   * List of messages.
   */
  readonly messages: Message[];
}

/**
 * @inheritDoc
 */
export interface PDKNagAppProps extends AppProps {
  /**
   * Determines whether any errors encountered should trigger a test failure.
   *
   * @default false
   */
  readonly failOnError?: boolean;

  /**
   * Determines whether any warnings encountered should trigger a test failure.
   *
   * @default false
   */
  readonly failOnWarning?: boolean;

  /**
   * Custom nag packs to execute.
   *
   * @default DEFAULT_NAG_PACKS
   */
  readonly nagPacks?: NagPack[];
}

/**
 * @inheritDoc
 */
export class PDKNagApp extends App {
  private readonly _nagResults: NagResult[] = [];
  private readonly failOnError: boolean;
  private readonly failOnWarning: boolean;
  public readonly nagPacks: NagPack[];

  constructor(props?: PDKNagAppProps) {
    super(props);
    this.failOnError = props?.failOnError ?? false;
    this.failOnWarning = props?.failOnWarning ?? false;
    this.nagPacks = props?.nagPacks ?? DEFAULT_NAG_PACKS;
  }

  synth(options?: StageSynthesisOptions): CloudAssembly {
    const assembly = super.synth(options);

    const typesToFail = new Set(
      [
        this.failOnError && CDK_NAG_MESSAGE_TYPES.ERROR,
        this.failOnWarning && CDK_NAG_MESSAGE_TYPES.WARNING,
      ].filter((t) => t)
    );
    if (
      this._nagResults.find((r) =>
        r.messages.find((m) => typesToFail.has(m.messageType))
      )
    ) {
      throw new Error(JSON.stringify(this._nagResults, undefined, 2));
    }

    return assembly;
  }

  addNagResult(result: NagResult) {
    this._nagResults.push(result);
  }

  /**
   * Returns a list of NagResult.
   *
   * Note: app.synth() must be called before this to retrieve results.
   */
  public nagResults(): NagResult[] {
    return this._nagResults;
  }
}

class PDKNagAspect implements IAspect {
  private readonly app: PDKNagApp;

  constructor(app: PDKNagApp) {
    this.app = app;
  }

  visit(node: IConstruct): void {
    this.app.nagPacks.forEach((nagPack) => nagPack.visit(node));

    const results = node.node.metadata.filter((m) =>
      CDK_NAG_MESSAGE_TYPES_SET.has(m.type)
    );
    results.length > 0 &&
      this.app.addNagResult({
        resource: node.node.path,
        messages: results.map((m) => ({
          messageDescription: m.data,
          messageType: m.type,
        })),
      });
  }
}

/**
 * Helper for create a Nag Enabled App.
 */
export class PDKNag {
  /**
   * Returns an instance of an App with Nag enabled.
   *
   * @param props props to initialize the app with.
   */
  public static app(props?: PDKNagAppProps): PDKNagApp {
    const app = new PDKNagApp(props);
    Aspects.of(app).add(new PDKNagAspect(app));

    return app;
  }

  /**
   * Wrapper around NagSuppressions which does not throw.
   *
   * @param stack stack instance
   * @param path resource path
   * @param suppressions list of suppressions to apply.
   * @param applyToChildren whether to apply to children.
   */
  public static addResourceSuppressionsByPathNoThrow(
    stack: Stack,
    path: string,
    suppressions: NagPackSuppression[],
    applyToChildren: boolean = false
  ): void {
    try {
      NagSuppressions.addResourceSuppressionsByPath(
        stack,
        path,
        suppressions,
        applyToChildren
      );
    } catch (e) {
      // Do Nothing
    }
  }

  /**
   * Returns a prefix comprising of a delimited set of Stack Ids.
   *
   * For example: StackA/NestedStackB/
   *
   * @param stack stack instance.
   */
  public static getStackPrefix(stack: Stack): string {
    if (stack.nested) {
      return `${PDKNag.getStackPrefix(stack.nestedStackParent!)}${
        stack.node.id
      }/`;
    } else {
      const stageName = Stage.of(stack)?.stageName;
      const stagePrefix = stageName && `${stageName}-`;
      let stackName = stack.stackName;

      stackName =
        stagePrefix && stackName.startsWith(stagePrefix)
          ? `${stageName}/${stackName.slice(stagePrefix.length)}`
          : stackName;
      return `${stackName}/`;
    }
  }

  /**
   * Returns a stack partition regex.
   *
   * @param stack stack instance.
   */
  public static getStackPartitionRegex(stack: Stack): string {
    if (stack.nested) {
      return PDKNag.getStackPartitionRegex(stack.nestedStackParent!);
    } else {
      return stack.partition.startsWith("${Token")
        ? "<AWS::Partition>"
        : `(<AWS::Partition>|${stack.partition})`;
    }
  }

  /**
   * Returns a stack region regex.
   *
   * @param stack stack instance.
   */
  public static getStackRegionRegex(stack: Stack): string {
    if (stack.nested) {
      return PDKNag.getStackRegionRegex(stack.nestedStackParent!);
    } else {
      return stack.region.startsWith("${Token")
        ? "<AWS::Region>"
        : `(<AWS::Region>|${stack.region})`;
    }
  }

  /**
   * Returns a stack account regex.
   *
   * @param stack stack instance.
   */
  public static getStackAccountRegex(stack: Stack): string {
    if (stack.nested) {
      return PDKNag.getStackAccountRegex(stack.nestedStackParent!);
    } else {
      return stack.account.startsWith("${Token")
        ? "<AWS::AccountId>"
        : `(<AWS::AccountId>|${stack.account})`;
    }
  }
}
