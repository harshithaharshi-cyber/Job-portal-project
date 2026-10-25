-- CareerConnect Online Job Portal
-- Example schema for MySQL 8+. Run this file in MySQL Workbench or another SQL client.

CREATE DATABASE IF NOT EXISTS careerconnect;
USE careerconnect;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('job_seeker', 'employer', 'admin') NOT NULL DEFAULT 'job_seeker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    job_type ENUM('Full-time', 'Part-time', 'Internship', 'Contract') NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    experience_level VARCHAR(60),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Open', 'Closed') NOT NULL DEFAULT 'Open',
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    cover_letter TEXT,
    application_status ENUM('Submitted', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired')
        NOT NULL DEFAULT 'Submitted',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_job_application (job_id, user_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Demo company and job records
INSERT INTO companies (company_name, website, description) VALUES
('PixelNorth', 'https://example.com', 'A fictional product and design company'),
('BrightMetrics', 'https://example.com', 'A fictional data and analytics company')
ON DUPLICATE KEY UPDATE company_name = VALUES(company_name);

INSERT INTO jobs (company_id, title, description, location, job_type, salary_min, salary_max, experience_level)
SELECT company_id, 'Frontend Developer', 'Build responsive web experiences using HTML, CSS, and JavaScript.',
       'Bengaluru', 'Full-time', 600000, 900000, '1–3 years'
FROM companies WHERE company_name = 'PixelNorth'
AND NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Frontend Developer' AND company_id = companies.company_id);

INSERT INTO jobs (company_id, title, description, location, job_type, salary_min, salary_max, experience_level)
SELECT company_id, 'Data Analyst Intern', 'Help teams explore datasets and prepare reports.',
       'Remote', 'Internship', 180000, 240000, 'Fresher'
FROM companies WHERE company_name = 'BrightMetrics'
AND NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Data Analyst Intern' AND company_id = companies.company_id);

-- Useful starter queries
SELECT j.title, c.company_name, j.location, j.job_type, j.salary_min, j.salary_max
FROM jobs AS j
JOIN companies AS c ON c.company_id = j.company_id
WHERE j.status = 'Open'
ORDER BY j.posted_at DESC;

SELECT application_status, COUNT(*) AS total
FROM applications
GROUP BY application_status;
