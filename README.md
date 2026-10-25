# CareerConnect — Online Job Portal

A beginner-friendly portfolio project built with **HTML, CSS, JavaScript, and SQL**. CareerConnect is a responsive job portal landing page where visitors can browse sample job listings, search by keyword, filter by location and job type, and submit a demo application.

## Features

- Responsive layout for desktop and mobile
- Search jobs by title, company, location, and skills
- Filter by location and job type
- Application form with basic browser-side validation
- Demo applications saved in the browser's `localStorage`
- MySQL schema for users, companies, jobs, and applications
- Starter SQL queries for listing jobs and summarizing applications

## Project structure

```text
online_job_portal/
├── index.html
├── style.css
├── script.js
├── database.sql
└── README.md
```

## Run the website

1. Download or extract this project.
2. Open the `online_job_portal` folder.
3. Double-click `index.html` to open it in your browser.
4. Search/filter jobs and try the **Apply now** form.

No installation is needed to view the front-end demo.

## Set up the SQL database (optional)

This SQL file is written for **MySQL 8+**.

1. Install MySQL Community Server and MySQL Workbench if you want to run the database locally.
2. Open `database.sql` in MySQL Workbench.
3. Connect to your local MySQL server.
4. Execute the script.
5. Run the sample `SELECT` queries at the bottom to explore the demo data.

## Important project limitation

The HTML/CSS/JavaScript front end is a working demo, but it is **not connected to the SQL database**. Applications are stored only in the current browser using `localStorage`. To make this a full production portal, add a backend such as Node.js/Express or PHP, connect it securely to MySQL, implement login and authorization, validate data on the server, and store passwords using a secure password-hashing library. Never store plain-text passwords.

## Technologies

- HTML5 — page structure
- CSS3 — styling and responsive layout
- JavaScript — search, filters, and demo application form
- MySQL — relational database schema and example queries

## GitHub upload (Windows)

### Option A: GitHub website (easiest)

1. Sign in at https://github.com.
2. Click **New repository**.
3. Name it `online-job-portal`.
4. Choose **Public** if you want to show it in your portfolio (or Private if preferred).
5. Click **Create repository**.
6. In the new repository, choose **Add file → Upload files**.
7. Extract this ZIP on your computer and upload the files inside the `online_job_portal` folder.
8. Click **Commit changes**.

### Option B: Git commands

Install Git if needed, then open Command Prompt in the extracted project folder and run:

```bash
git init
git add .
git commit -m "Add CareerConnect online job portal project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/online-job-portal.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If `origin` already exists, run `git remote -v` and update it with `git remote set-url origin https://github.com/YOUR-USERNAME/online-job-portal.git` rather than adding it again.

## Suggested resume description

**CareerConnect — Online Job Portal:** Developed a responsive job portal interface using HTML, CSS, and JavaScript with job search, filters, and a demo application flow. Designed a MySQL relational schema for users, companies, job listings, and applications.
