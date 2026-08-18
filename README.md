# Kapakki

Static personal website built with React, TypeScript, Vite, Tailwind CSS, and TanStack Router.

## Development

```bash
cd frontend
npm ci
npm run dev
```

## Production build

```bash
cd frontend
npm run build
```

The build output is written to `frontend/dist`. It includes a `404.html` fallback so GitHub Pages can load client-side routes such as blog posts on direct visits.

## Deployment

The GitHub Actions workflow at `.github/workflows/deploy-pages.yml` builds and deploys the site whenever `kapakki.com` is updated.

In the repository's GitHub Pages settings, select **GitHub Actions** as the source and configure `kapakki.com` as the custom domain. Point the domain's DNS records to GitHub Pages before enabling HTTPS.
