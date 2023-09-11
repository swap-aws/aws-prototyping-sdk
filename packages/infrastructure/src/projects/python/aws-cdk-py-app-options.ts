// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
import { awscdk, github, GitOptions, IgnoreFileOptions, LoggerOptions, Project, ProjectType, ProjenrcJsonOptions, python, RenovatebotOptions, SampleReadmeProps } from 'projen';

/**
 * AwsCdkPythonAppOptions
 */
export interface AwsCdkPythonAppOptions {
  /**
   * Python sources directory.
   * @default "tests"
   * @stability experimental
   */
  readonly testdir?: string;
  /**
   * Minimum version of the `constructs` library to depend on.
   * @default - for CDK 1.x the default is "3.2.27", for CDK 2.x the default is
"10.0.5".
   * @stability experimental
   */
  readonly constructsVersion?: string;
  /**
   * Use pinned version instead of caret version for CDK.
   * You can use this to prevent mixed versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   * @stability experimental
   */
  readonly cdkVersionPinning?: boolean;
  /**
   * AWS CDK modules required for testing.
   * @deprecated For CDK 2.x use 'devDeps' (in node.js projects) or 'testDeps' (in java projects) instead
   * @stability deprecated
   */
  readonly cdkTestDependencies?: Array<string>;
  /**
   * If this is enabled (default), all modules declared in `cdkDependencies` will be also added as normal `dependencies` (as well as `peerDependencies`).
   * This is to ensure that downstream consumers actually have your CDK dependencies installed
   * when using npm < 7 or yarn, where peer dependencies are not automatically installed.
   * If this is disabled, `cdkDependencies` will be added to `devDependencies` to ensure
   * they are present during development.
   *
   * Note: this setting only applies to construct library projects
   * @default true
   * @deprecated Not supported in CDK v2.
   * @stability deprecated
   */
  readonly cdkDependenciesAsDeps?: boolean;
  /**
   * Which AWS CDKv1 modules this project requires.
   * @deprecated For CDK 2.x use "deps" instead. (or "peerDeps" if you're building a library)
   * @stability deprecated
   */
  readonly cdkDependencies?: Array<string>;
  /**
   * Install the assertions library?
   * Only needed for CDK 1.x. If using CDK 2.x then
   * assertions is already included in 'aws-cdk-lib'
   * @default - will be included by default for AWS CDK >= 1.111.0 < 2.0.0
   * @stability experimental
   */
  readonly cdkAssertions?: boolean;
  /**
   * Warning: NodeJS only.
   * Install the
   * @default - will be included by default for AWS CDK >= 1.0.0 < 2.0.0
   * @deprecated The
   * @stability deprecated
   * @aws-cdk /assertions (in V1) and included in `aws-cdk-lib` for V2.
   */
  readonly cdkAssert?: boolean;
  /**
   * Minimum version of the AWS CDK to depend on.
   * @default "2.1.0"
   * @stability experimental
   */
  readonly cdkVersion?: string;
  /**
   * Glob patterns to include in `cdk watch`.
   * @default []
   * @stability experimental
   */
  readonly watchIncludes?: Array<string>;
  /**
   * Glob patterns to exclude from `cdk watch`.
   * @default []
   * @stability experimental
   */
  readonly watchExcludes?: Array<string>;
  /**
   * To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.
   * @default ApprovalLevel.BROADENING
   * @stability experimental
   */
  readonly requireApproval?: awscdk.ApprovalLevel;
  /**
   * Include all feature flags in cdk.json.
   * @default true
   * @stability experimental
   */
  readonly featureFlags?: boolean;
  /**
   * Additional context to include in `cdk.json`.
   * @default - no additional context
   * @stability experimental
   */
  readonly context?: Record<string, any>;
  /**
   * cdk.out directory.
   * @default "cdk.out"
   * @stability experimental
   */
  readonly cdkout?: string;
  /**
   * A command to execute before synthesis.
   * This command will be called when
   * running `cdk synth` or when `cdk watch` identifies a change in your source
   * code before redeployment.
   * @default - no build command
   * @stability experimental
   */
  readonly buildCommand?: string;
  /**
   * Use setuptools with a setup.py script for packaging and publishing.
   * @default - true, unless poetry is true, then false
   * @stability experimental
   * @featured true
   */
  readonly setuptools?: boolean;
  /**
   * Include sample code and test if the relevant directories don't exist.
   * @default true
   * @stability experimental
   */
  readonly sample?: boolean;
  /**
   * Path to the python executable to use.
   * @default "python"
   * @stability experimental
   */
  readonly pythonExec?: string;
  /**
   * pytest options.
   * @default - defaults
   * @stability experimental
   */
  readonly pytestOptions?: python.PytestOptions;
  /**
   * Include pytest tests.
   * @default true
   * @stability experimental
   * @featured true
   */
  readonly pytest?: boolean;
  /**
   * Options related to projenrc in python.
   * @default - default options
   * @stability experimental
   */
  readonly projenrcPythonOptions?: python.ProjenrcOptions;
  /**
   * List of dev dependencies for this project.
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDevDependency()`.
   * @default []
   * @stability experimental
   * @featured true
   */
  readonly devDeps?: Array<string>;
  /**
   * List of runtime dependencies for this project.
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDependency()`.
   * @default []
   * @stability experimental
   * @featured true
   */
  readonly deps?: Array<string>;
  /**
   * Name of the python package as used in imports and filenames.
   * Must only consist of alphanumeric characters and underscores.
   * @default $PYTHON_MODULE_NAME
   * @stability experimental
   */
  readonly moduleName?: string;
  /**
   * Additional fields to pass in the setup() function if using setuptools.
   * @stability experimental
   */
  readonly setupConfig?: Record<string, any>;
  /**
   * Additional options to set for poetry if using poetry.
   * @stability experimental
   */
  readonly poetryOptions?: python.PoetryPyprojectOptionsWithoutDeps;
  /**
   * Package name.
   * @stability experimental
   */
  readonly packageName?: string;
  /**
   * License of this package as an SPDX identifier.
   * @stability experimental
   */
  readonly license?: string;
  /**
   * A URL to the website of the project.
   * @stability experimental
   */
  readonly homepage?: string;
  /**
   * A short description of the package.
   * @stability experimental
   * @featured true
   */
  readonly description?: string;
  /**
   * A list of PyPI trove classifiers that describe the project.
   * @stability experimental
   */
  readonly classifiers?: Array<string>;
  /**
   * Version of the package.
   * @default "0.1.0"
   * @stability experimental
   * @featured true
   */
  readonly version?: string;
  /**
   * Author's name.
   * @default $GIT_USER_NAME
   * @stability experimental
   */
  readonly authorName?: string;
  /**
   * Author's e-mail.
   * @default $GIT_USER_EMAIL
   * @stability experimental
   */
  readonly authorEmail?: string;
  /**
   * Enable VSCode integration.
   * Enabled by default for root projects. Disabled for non-root projects.
   * @default true
   * @stability experimental
   */
  readonly vscode?: boolean;
  /**
   * Auto-close stale issues and pull requests.
   * To disable set `stale` to `false`.
   * @default - see defaults in `StaleOptions`
   * @stability experimental
   */
  readonly staleOptions?: github.StaleOptions;
  /**
   * Auto-close of stale issues and pull request.
   * See `staleOptions` for options.
   * @default false
   * @stability experimental
   */
  readonly stale?: boolean;
  /**
   * The README setup.
   * @default - { filename: 'README.md', contents: '# replace this' }
   * @stability experimental
   */
  readonly readme?: SampleReadmeProps;
  /**
   * The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.
   * This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   * @default "PROJEN_GITHUB_TOKEN"
   * @deprecated use `projenCredentials`
   * @stability deprecated
   */
  readonly projenTokenSecret?: string;
  /**
   * Choose a method of providing GitHub API access for projen workflows.
   * @default - use a personal access token named PROJEN_GITHUB_TOKEN
   * @stability experimental
   */
  readonly projenCredentials?: github.GithubCredentials;
  /**
   * Which type of project this is (library/app).
   * @default ProjectType.UNKNOWN
   * @deprecated no longer supported at the base project level
   * @stability deprecated
   */
  readonly projectType?: ProjectType;
  /**
   * Options for mergify.
   * @default - default options
   * @deprecated use `githubOptions.mergifyOptions` instead
   * @stability deprecated
   */
  readonly mergifyOptions?: github.MergifyOptions;
  /**
   * Whether mergify should be enabled on this repository or not.
   * @default true
   * @deprecated use `githubOptions.mergify` instead
   * @stability deprecated
   */
  readonly mergify?: boolean;
  /**
   * Add a Gitpod development environment.
   * @default false
   * @stability experimental
   */
  readonly gitpod?: boolean;
  /**
   * Options for GitHub integration.
   * @default - see GitHubOptions
   * @stability experimental
   */
  readonly githubOptions?: github.GitHubOptions;
  /**
   * Enable GitHub integration.
   * Enabled by default for root projects. Disabled for non-root projects.
   * @default true
   * @stability experimental
   */
  readonly github?: boolean;
  /**
   * Add a VSCode development environment (used for GitHub Codespaces).
   * @default false
   * @stability experimental
   */
  readonly devContainer?: boolean;
  /**
   * Add a `clobber` task which resets the repo to origin.
   * @default - true, but false for subprojects
   * @stability experimental
   */
  readonly clobber?: boolean;
  /**
   * Configure options for automatic merging on GitHub.
   * Has no effect if
   * `github.mergify` or `autoMerge` is set to false.
   * @default - see defaults in `AutoMergeOptions`
   * @stability experimental
   */
  readonly autoMergeOptions?: github.AutoMergeOptions;
  /**
   * Enable automatic merging on GitHub.
   * Has no effect if `github.mergify`
   * is set to false.
   * @default true
   * @stability experimental
   */
  readonly autoMerge?: boolean;
  /**
   * Enable and configure the 'auto approve' workflow.
   * @default - auto approve is disabled
   * @stability experimental
   */
  readonly autoApproveOptions?: github.AutoApproveOptions;
  /**
   * Options for renovatebot.
   * @default - default options
   * @stability experimental
   */
  readonly renovatebotOptions?: RenovatebotOptions;
  /**
   * Use renovatebot to handle dependency upgrades.
   * @default false
   * @stability experimental
   */
  readonly renovatebot?: boolean;
  /**
   * Options for .projenrc.json.
   * @default - default options
   * @stability experimental
   */
  readonly projenrcJsonOptions?: ProjenrcJsonOptions;
  /**
   * Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.
   * @default false
   * @stability experimental
   */
  readonly projenrcJson?: boolean;
  /**
   * The shell command to use in order to run the projen CLI.
   * Can be used to customize in special environments.
   * @default "npx projen"
   * @stability experimental
   */
  readonly projenCommand?: string;
  /**
   * The parent project, if this project is part of a bigger project.
   * @stability experimental
   */
  readonly parent?: Project;
  /**
   * The root directory of the project.
   * Relative to this directory, all files are synthesized.
   *
   * If this project has a parent, this directory is relative to the parent
   * directory and it cannot be the same as the parent or any of it's other
   * sub-projects.
   * @default "."
   * @stability experimental
   */
  readonly outdir?: string;
  /**
   * Configure logging options such as verbosity.
   * @default {}
   * @stability experimental
   */
  readonly logging?: LoggerOptions;
  /**
   * Configuration options for git.
   * @stability experimental
   */
  readonly gitOptions?: GitOptions;
  /**
   * Configuration options for .gitignore file.
   * @stability experimental
   */
  readonly gitIgnoreOptions?: IgnoreFileOptions;
  /**
   * Whether to commit the managed files by default.
   * @default true
   * @stability experimental
   */
  readonly commitGenerated?: boolean;
  /**
   * @default $BASEDIR
   */
  readonly name: string;
}
