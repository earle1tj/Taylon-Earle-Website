# cPanel Journal Studio setup

The production Node application uses:

- Node.js 22
- `app.cjs` as the startup file
- MySQL/MariaDB for journal entries
- `/studio/login` for the private author login

## Required cPanel environment variables

Set these in the Node.js application configuration:

```text
DB_HOST=localhost
DB_NAME=taylsqya_journal
DB_USER=taylsqya_journaladmin
DB_PASSWORD=<the database user password>
JOURNAL_ADMIN_EMAIL=<the private Studio login email>
JOURNAL_ADMIN_PASSWORD_HASH=<generated value>
SESSION_SECRET=<generated value>
NODE_ENV=production
```

Never commit the secret values to GitHub.

## First deployment

Open cPanel Terminal and enter the application environment using the command
shown at the top of cPanel's Node.js application page. Then run:

```bash
cd /home/taylsqya/taylon-james-music
npm ci
npm run auth:setup
```

The setup command privately prompts for the Studio password and prints
`JOURNAL_ADMIN_PASSWORD_HASH` and `SESSION_SECRET`. Add both generated values
to the application's environment variables.

Next run:

```bash
npm run db:migrate:cpanel
npm run build:cpanel
```

Start or restart the application from cPanel. Verify:

- `https://taylonearle.com/`
- `https://taylonearle.com/journal`
- `https://taylonearle.com/studio/login`

## Later deployments

After updating the application directory from GitHub:

```bash
cd /home/taylsqya/taylon-james-music
npm ci
npm run db:migrate:cpanel
npm run build:cpanel
mkdir -p tmp
touch tmp/restart.txt
```

The migration is safe to run repeatedly.
