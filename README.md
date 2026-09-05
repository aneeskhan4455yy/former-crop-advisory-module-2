# FarmAdvisor

FarmAdvisor is a responsive crop-management dashboard for agricultural teams. It provides an admin workspace for reviewing farmers, crops, and fertilizer guidance, with a PHP/MySQL API foundation for persistent data and authenticated administration.

![FarmAdvisor admin dashboard](Screenshot%202026-08-27%20142631.png)

## Features

- Responsive admin dashboard for desktop and mobile screens
- Farmer, crop, and fertilizer management views
- Add farmer, crop, and fertilizer forms
- Crop editing workflow
- Login and logout interface for the browser prototype
- PHP session handling and admin role checks in the API
- Password hashing with PHP `password_hash()` and `password_verify()`
- CSRF token generation and validation for protected API actions
- MySQL schema with starter records for local development

## Tech stack

- HTML5, CSS3, and vanilla JavaScript
- Bootstrap 5.3 and Bootstrap Icons via CDN
- PHP 8+ with PDO
- MySQL 8+ or MariaDB
- XAMPP for local Apache and MySQL hosting

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Dashboard and login interface |
| `styles.css` | Application styling and responsive layout |
| `app.js` | Browser prototype interactions and local row updates |
| `api.php` | JSON API for login, sessions, and admin CRUD actions |
| `config.php` | Database connection settings |
| `schema.sql` | Database, tables, and development seed data |
| `SETUP.md` | Original short-form local setup notes |

## Run locally

### Requirements

- XAMPP, or another Apache/PHP/MySQL environment
- PHP with the PDO MySQL extension enabled
- A modern web browser

### Installation

1. Clone or download this repository.
2. Copy the project directory into your web server document root. With XAMPP, use:

   ```text
   C:\xampp\htdocs\farmadvisor
   ```

3. Start **Apache** and **MySQL** from the XAMPP control panel.
4. Open phpMyAdmin at `http://localhost/phpmyadmin`.
5. Import [`schema.sql`](schema.sql). The script creates the `farmadvisor` database and inserts development seed data.
6. Check the database values in [`config.php`](config.php). The defaults expect a local MySQL root account with no password.
7. Open the dashboard:

   ```text
   http://localhost/farmadvisor/index.html
   ```

### Demo login

The seeded development account is:

```text
Email:    admin@farmadvisor.com
Password: password
```

Change or remove this account before deploying the application anywhere public.

## Current application behavior

The visible dashboard in `index.html` is currently a front-end prototype. Login validation and add/edit actions update the page in the browser and do not persist data to MySQL yet.

The backend API is ready for the next integration step. It supports these actions through `api.php`:

- `GET api.php?action=csrf`
- `POST api.php?action=login`
- `GET api.php?action=logout`
- `POST api.php?action=create-user`
- `POST api.php?action=create-crop`
- `POST api.php?action=update-crop`
- `POST api.php?action=delete-crop`
- `POST api.php?action=create-fertilizer`
- `POST api.php?action=delete-fertilizer`

Protected write requests require an authenticated admin session and the `X-CSRF-Token` header returned by the login or CSRF request.

## Security notes

- Do not use the seeded password in production.
- Store database credentials outside the web root or inject them through environment-specific configuration.
- Serve the application over HTTPS in production.
- Add server-side validation and authorization rules as the frontend is connected to the API.
- Consider adding rate limiting, secure cookie settings, and production error logging before deployment.

## Development notes

This project has no build step. After editing the HTML, CSS, or JavaScript, refresh the browser page. PHP changes should be tested through the Apache URL rather than opening the files directly from the filesystem.

## License

No license has been added yet. Add a license before publishing the repository for reuse by others.
