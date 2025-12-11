# ipakyulibank/actions/fortify-security-check@v3

This action performs a SAST scan on Fortify ScanCentral SAST, consisting of the following steps:

- Login to Fortify SSC and ScanCentral SAST Controller
- Automatically create application version for PR scans (copies state from base version)
- Package application source code using ScanCentral Client
- Submit the source code package to be scanned to ScanCentral SAST Controller
- Wait for the scan to complete
- If the GitHub workflow was triggered by a Pull Request event, creates a comment with a description of the changes in the issues that resulted from the code changes in the Pull Request
- Export scan results to the GitHub Workflow summary
- Output scan statistics for use in subsequent workflow steps (notifications, etc.)

### Prerequisites

This action assumes the standard software packages as provided by GitHub-hosted runners to be available. If you are using self-hosted runners, you may need to install some of these software packages in order to successfully use this action. In particular, not having the following software installed is known to cause issues when running `ipakyulibank/actions/fortify-security-check`:

- OpenJDK 21 JRE
- [Fortify CLI](https://github.com/fortify/fcli)
- Fortify CLI ScanCentral module

### Action inputs

**`fortify-ssc-url`** - REQUIRED

Fortify Software Security Center URL, for example https://ssc.customer.fortifyhosted.net/

**`fortify-sc-sast-url`** - REQUIRED

Fortify ScanCentral SAST Controller URL

**`ssc-token`** - REQUIRED

Required when authenticating with an SSC token (recommended). Most actions should work fine with a `CIToken`.

**`application`** - REQUIRED

Fortify SSC application name to use with this action

**`application-version`** - REQUIRED

Fortify SSC application version to use with this action. For PR scans, use `PR-{number}` format.

**`base-version`** - OPTIONAL (default `master`)

Base version for copying state when creating PR versions. Used to inherit issue suppression and other settings.

**`sast-version`** - OPTIONAL (default `23.2`)

Fortify SSC SAST module version

**`github-token`** - OPTIONAL

The GitHub token is required to create a comment in the Pull Request.
If a temporary token generated for the GitHub Workflow is used, the following settings need to be configured in the GitHub Workflow job:

```yaml
permissions:
  pull-requests: write
  contents: read
```

**`exit-with-error-on-severity`** - OPTIONAL (default `Medium`)

Fail the GitHub Workflow if issues with the specified and above severity are detected during the scan. Can be one of the following values - `Critical`, `High`, `Medium`, `Low`.

**`enable-report-comment`** - OPTIONAL (default `true`)

Add comment with summary to pull request conversation

### Action outputs

The action exports the following outputs for use in subsequent workflow steps:

| Output | Description |
|--------|-------------|
| `total-issues` | Total number of issues found |
| `new-issues` | Number of new/reintroduced issues |
| `removed-issues` | Number of removed issues |
| `critical-issues` | Number of critical severity issues |
| `high-issues` | Number of high severity issues |
| `medium-issues` | Number of medium severity issues |
| `low-issues` | Number of low severity issues |
| `scan-failed` | `true` if scan failed due to severity threshold |

### Sample usage: PR scan with notifications

```yaml
name: Fortify Security Check
on:
  merge_group:
    types: [checks_requested]
  pull_request:
    branches: [master]

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.ref }}
  cancel-in-progress: true

env:
  SSC_APPLICATION: my-application
  SSC_BASE_VERSION: master

jobs:
  scan:
    if: ${{ github.event.action == 'checks_requested' || github.event.action == 'opened' || github.event.action == 'reopened' }}
    runs-on: [fortify-scan-arc]
    timeout-minutes: 20
    permissions:
      pull-requests: write
      contents: read
    outputs:
      total-issues: ${{ steps.fortify.outputs.total-issues }}
      new-issues: ${{ steps.fortify.outputs.new-issues }}
      removed-issues: ${{ steps.fortify.outputs.removed-issues }}
      critical-issues: ${{ steps.fortify.outputs.critical-issues }}
      high-issues: ${{ steps.fortify.outputs.high-issues }}
      medium-issues: ${{ steps.fortify.outputs.medium-issues }}
      low-issues: ${{ steps.fortify.outputs.low-issues }}
      scan-failed: ${{ steps.fortify.outputs.scan-failed }}
    steps:
      - uses: actions/checkout@v4

      - name: Fortify Security Check
        id: fortify
        uses: ipakyulibank/actions/fortify-security-check@v3
        with:
          fortify-ssc-url: ${{ secrets.SSC_URL }}
          fortify-sc-sast-url: ${{ secrets.SC_SAST_URL }}
          ssc-token: ${{ secrets.SSC_TOKEN }}
          ssc-sast-token: ${{ secrets.SC_SAST_TOKEN }}
          application: ${{ env.SSC_APPLICATION }}
          application-version: ${{ github.event_name == 'pull_request' && format('PR-{0}', github.event.pull_request.number) || env.SSC_BASE_VERSION }}
          base-version: ${{ env.SSC_BASE_VERSION }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          exit-with-error-on-severity: "High"
          enable-report-comment: "true"

  notify:
    needs: scan
    if: ${{ always() && needs.scan.outputs.scan-failed == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - name: Build notification message
        id: message
        uses: actions/github-script@v7
        with:
          result-encoding: string
          script: |
            const esc = (t) => ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
              .reduce((s, ch) => s.replaceAll(ch, '\\' + ch), t ?? '');

            const appVersion = `${{ env.SSC_APPLICATION }}:${{ github.event_name == 'pull_request' && format('PR-{0}', github.event.pull_request.number) || env.SSC_BASE_VERSION }}`;
            const workflowUrl = `${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}`;

            return `🔒 *Fortify SAST Scan FAILED*

            📋 App: \`${esc(appVersion)}\`

            📈 Results:
            • Total: ${{ needs.scan.outputs.total-issues }}
            • New: ${{ needs.scan.outputs.new-issues }}
            • Removed: ${{ needs.scan.outputs.removed-issues }}

            🎯 By Severity:
            • 🔴 Critical: ${{ needs.scan.outputs.critical-issues }}
            • 🟠 High: ${{ needs.scan.outputs.high-issues }}
            • 🟡 Medium: ${{ needs.scan.outputs.medium-issues }}
            • 🟢 Low: ${{ needs.scan.outputs.low-issues }}

            ❌ Status: Issues found at or above threshold
            🔗 [Details](${workflowUrl})`;

      - name: Send Telegram notification
        uses: ipakyulibank/actions/notify@v2
        with:
          BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
          BODY: ${{ steps.message.outputs.result }}
          PARSE_MODE: MarkdownV2
```

### Sample usage: Weekly full scan

```yaml
name: Fortify Weekly Full Scan

on:
  schedule:
    - cron: '0 5 * * 1'  # Monday 5:00 UTC
  workflow_dispatch:

env:
  SSC_APPLICATION: my-application
  SSC_VERSION: master

jobs:
  full-scan:
    runs-on: [fortify-scan-arc]
    timeout-minutes: 20
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
        with:
          ref: master

      - name: Fortify Full Security Check
        uses: ipakyulibank/actions/fortify-security-check@v3
        with:
          fortify-ssc-url: ${{ secrets.SSC_URL }}
          fortify-sc-sast-url: ${{ secrets.SC_SAST_URL }}
          ssc-token: ${{ secrets.SSC_TOKEN }}
          ssc-sast-token: ${{ secrets.SC_SAST_TOKEN }}
          application: ${{ env.SSC_APPLICATION }}
          application-version: ${{ env.SSC_VERSION }}
          base-version: ${{ env.SSC_VERSION }}
          exit-with-error-on-severity: "Critical"
          enable-report-comment: "false"
```
