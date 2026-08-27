# FarmAdvisor Module 1 share version

The current `index.html` is intentionally Module 1 only: login, logout, admin access, and farmer management. Module 2 is saved in `..\\intern-module-1-2-backup.zip` for later restoration.

## XAMPP backend setup

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin and import `schema.sql`.
3. Keep this folder at `xampp/htdocs/intern`.
4. Open `http://localhost/intern/index.html`.
5. Demo admin email: `admin@farmadvisor.com`
6. The SQL seed password is `password`.

The dashboard currently works as a browser prototype. `api.php` provides the PHP session, password hashing, role check, CSRF check, and CRUD endpoints for the next connection step.
