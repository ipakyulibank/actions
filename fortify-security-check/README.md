# ipakyulibank/actions/fortify-security-check@v2

This action performs a SAST scan on Fortify ScanCentral SAST, consisting of the following steps:

- Login to ScanCentral SAST Controller
- Package application source code using ScanCentral Client
- Submit the source code package to be scanned to ScanCentral SAST Controller
- Wait for the scan to complete
- If the GitHub workflow was triggered by a Pull Request event, creates a comment with a description of the changes in the issues that resulted from the code changes in the Pull Request
- Export scan results to the GitHub Workflow summary (report includes issues with severity `Medium` and above)
- Saving the scan report in Sarif format as a GitHub Workflow artifact

Before running this action, please ensure that the appropriate application version has been created on SSC. Future versions of this action may add support for automating application version creation.

### Prerequisites

This action assumes the standard software packages as provided by GitHub-hosted runners to be available. If you are using self-hosted runners, you may need to install some of these software packages in order to successfully use this action. In particular, not having the following software installed is known to cause issues when running `ipakyulibank/actions/fortify-security-check`:

- OpenJDK 21 JRE
- [Fortify CLI](https://github.com/fortify/fcli)
- Fortify CLI ScanCentral module

### Action inputs

**`fortify-ssc-url`** - REQUIRED

Fortify Software Security Center URL, for example https://ssc.customer.fortifyhosted.net/

**`ssc-token`** - REQUIRED

Required when authenticating with an SSC token (recommended). Most actions should work fine with a `CIToken`.

**`ssc-sast-token`** - REQUIRED

ScanCentral SAST Client Authentication Token for authenticating with ScanCentral SAST Controller (This is the shared token that is set in `client_auth_token` in the file `<controller_install_dir>/tomcat/webapps/scancentral-ctrl/WEB-INF/classes/config.properties` on the Fortify SSC)

**`application`** - REQUIRED

Fortify SSC application name to use with this action

**`application-version`** - REQUIRED

Fortify SSC application version to use with this action

**`sast-version`** - OPTIONAL (default `23.2`)

Fortify SSC SAST module version

**`github-token`** - OPTIONAL

The GitHub token is required to create a comment in the Pull Request.
If a temporary token generated for the GitHub Workflow is used, the following settings need to be configured in the GitHub Workflow job:

**`exit-with-error-on-severity`** - OPTIONAL (default `Medium`)

Fail the GitHub Workflow if issues with the specified and above severity are detected during the scan

**`enable-report-comment`** - OPTIONAL (default `true`)

Add comment with summary to pull request conversation

```yaml
permissions:
  pull-requests: write
  contents: read
```

**`sast-version`** - OPTIONAL

The version of the SAST module in Fortify SSC (default - `23.2`)

**`exit-with-error-on-severity`** - OPTIONAL

Fail the GitHub Workflow if issues with the specified and above severity are detected during the scan. Can be one of the following values - `Critical`, `High`, `Medium`, `Low` (default - `Medium`)

### Sample usage

The sample workflow below demonstrates how to configure the action for running a SAST scan on ScanCentral SAST.

```yaml
steps:
  - name: Check out source code
    uses: actions/checkout@v4

  - name: Fortify Security Check
    uses: ipakyulibank/actions/fortify-security-check@v2
    with:
      fortify-ssc-url: ${{ secrets.SSC_URL }}
      ssc-token: ${{ secrets.SSC_TOKEN }}
      ssc-sast-token: ${{ secrets.SC_SAST_TOKEN }}
      application: application
      application-version: version
      github-token: ${{ secrets.GITHUB_TOKEN }}
      sast-version: "23.2"
      exit-with-error-on-severity: "High"
      enable-report-comment: "false"
```
