# Security and maintenance

The site is static and is published from `main` to GitHub Pages over HTTPS.
These controls reduce risk; they do not guarantee the absence of vulnerabilities.

## Repository controls

- The active `main` ruleset blocks branch deletion and non-fast-forward updates,
  including for administrators. Normal authorized commits remain possible.
- Dependabot alerts and security update pull requests are enabled. Scheduled
  npm and GitHub Actions updates are configured in `.github/dependabot.yml`.
- Updates are reviewed manually; no auto-merge is configured.
- Pull requests run lint, dependency auditing, and a production build with read-only
  repository permissions. They cannot deploy the website.
- Deployment builds use read-only permissions. Only the separate deployment job
  receives Pages write and OIDC permissions, and it runs only on `main`.
- GitHub Actions are pinned to verified full commit hashes. Checkout does not
  persist Git credentials, and jobs have execution time limits.
- Secret scanning and push protection are enabled on GitHub. These detectors do
  not recognize every kind of secret; never commit passwords, tokens, or keys.
- Local `.env` files and key files are ignored. All `VITE_*` environment values
  used in the browser are public, even if supplied through GitHub Secrets.

## Owner actions

1. Enable two-factor authentication or a passkey in GitHub account settings:
   <https://github.com/settings/security>. Store recovery codes securely, separately
   from this public repository. The owner must complete enrollment personally.
2. Review GitHub collaborators, SSH/deploy keys, tokens, and connected applications
   periodically, revoking access that is no longer needed.
3. Verify the custom domain at <https://github.com/settings/pages>. This requires
   adding the exact TXT record GitHub issues at the DNS provider. Registrar/DNS
   changes are outside this implementation and were not performed.
4. Review Dependabot pull requests and successful validation before merging.
5. Keep an independent backup and maintain access to the domain registration.

## Incident response

If an account or token is compromised, revoke the affected credentials first,
secure the account, and inspect repository changes and Actions runs. Roll back a
bad release using a normal `git revert` commit rather than a force push. Removing
an exposed secret from the latest file does not revoke it or remove it from history.

Security controls should be reviewed whenever login, backend APIs, payments,
third-party scripts, or other data collection is added to the site.
