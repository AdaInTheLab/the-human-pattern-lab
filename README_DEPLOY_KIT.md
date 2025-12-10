# Deploy Pipeline Kit — Setup Notes

This folder contains:
- GitHub Actions workflow for deploying the main site via SFTP
- Example .htaccess files for SPA routing at root and /docs

## Required GitHub Secrets

- `SFTP_HOST` – your DreamHost server or domain
- `SFTP_USER` – SFTP username
- `SFTP_PASS` – SFTP password (or switch the action to use an SSH key)
- `SFTP_PATH` – remote directory where the built site should be uploaded

After adding secrets and adjusting the paths, pushes to `main` will trigger a build and deploy.
