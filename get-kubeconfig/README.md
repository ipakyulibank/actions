# ipakyulibank/actions/get-kubeconfig@v2

The `get-kubeconfig` action retrieves a temporary kubeconfig for a Kubernetes cluster deployed via Rancher Server, using a custom secrets backend in HashiCorp Vault.

This action authenticates to Vault using a short-lived GitHub OIDC token issued automatically during the GitHub Workflow run. After successful authentication, the action constructs the Vault path for the selected cluster role and requests a temporary kubeconfig.
The retrieved kubeconfig is saved into a local file, and the file path is exported to the environment variable `KUBECONFIG`, allowing all subsequent workflow steps to interact with the target Kubernetes cluster.

### Prerequisites

The operating system running the GitHub Action must trust the root certificate authority (CA) that issued the TLS certificate for the HashiCorp Vault server.
If the root CA is not trusted, the action will be unable to establish a secure HTTPS connection to Vault, and all authentication or secret-retrieval requests will fail.

### Action inputs

**`vault_url`** - OPTIONAL (default `https://vault.ipakyulibank.uz`)

Vault base URL

**`oidc_audience`** - OPTIONAL (default `vault`)

Audience used when requesting the OIDC token

**`jwt_mount`** - OPTIONAL (default `github`)

Vault JWT auth mount

**`jwt_role`** - OPTIONAL (default `github-cloud-general`)

Vault JWT role name to use during authentication. This parameter is required when the auth backend does not define a default_role, or when you need to authenticate with a role different from the one set as default_role

**`jwt_ttl`** - OPTIONAL (default `60`)

Time in seconds, after which Vault token expires

**`rancher_mount`** - - OPTIONAL (default `rancher`)

Vault rancher secrets backend mount

**`use_ref`** - OPTIONAL (default `false`)

Add reference to branch or tag to vault path

**`environment`** - OPTIONAL

Add environment name to vault path

**`cluster`** - REQUIRED

Rancher kubernetes cluster name

Because the action uses a temporary GitHub Workflow token (OIDC token) to authenticate with Vault, the job must grant the permission `id-token: write`. Without this permission, the action will not be able to request the OIDC token required for Vault authentication.

```yaml
permissions:
  id-token: write
  contents: read
```

### Sample usage

The sample workflow below demonstrates how to configure the action for getting kubeconfig for kubernetes cluster `rancher-kubernetes-cluster`.

```yaml
steps:
  - name: Check out source code
    uses: actions/checkout@v4

  - name: Get kubeconfig
    uses: ipakyulibank/actions/get-kubeconfig@v2
    with:
      cluster: rancher-kubernetes-cluster
```

If the Vault configuration restricts kubeconfig retrieval based on a specific environment or ref, you must provide the corresponding `environment` and `use_ref` options to the action. These options ensure that the action constructs the correct Vault path and complies with the access rules defined on the Vault side.

```yaml
steps:
  - name: Check out source code
    uses: actions/checkout@v4

  - name: Get kubeconfig
    uses: ipakyulibank/actions/get-kubeconfig@v2
    with:
      cluster: rancher-kubernetes-cluster
      environment: production
      use_ref: true
```
