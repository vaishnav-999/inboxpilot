# InboxPilot: Smart Gmail Organizer, Job Email Tracker, and Unsubscribe Assistant

## 1. Project Overview

InboxPilot is a personal email management application that helps users organize Gmail messages automatically. The goal is to reduce inbox clutter, highlight important emails, track job and internship application replies, detect login/security emails, and suggest promotional senders for unsubscribe or archive actions.

## 2. Problem Statement

Many users receive a large number of promotional, newsletter, and automated emails every day. Important emails such as job application updates, interview messages, login alerts, university emails, bank messages, and account verification emails often get buried below less important emails. Manually scrolling, searching, and unsubscribing from emails is time-consuming.

## 3. Target Users

The primary target user is a student or job seeker who receives many emails from job portals, companies, universities, services, subscriptions, and promotional platforms.

Secondary users can include professionals, freelancers, and anyone who wants a cleaner inbox.

## 4. Main Goal

The goal is to build a Gmail-connected dashboard that automatically classifies emails into useful categories and helps the user take quick action.

## 5. MVP Features

### 5.1 Gmail Connection

The app should connect to the user’s Gmail account using OAuth authentication.

### 5.2 Fetch Recent Emails

The app should fetch recent Gmail messages and extract basic metadata such as sender, subject, date, snippet, and message ID.

### 5.3 Email Classification

The app should classify emails into categories:

* Job/Application
* Important
* Login/Security
* Promotions
* Receipts/Bills
* College/Work
* Unknown/Review

### 5.4 Priority Score

Each email should receive a priority score from 0 to 100 based on keywords, sender type, and category.

### 5.5 Dashboard

The user should see a clean dashboard with:

* Important emails
* Job-related emails
* Login/security emails
* Promotions
* Unsubscribe suggestions

### 5.6 Sender Rules

The user should be able to create rules such as:

* Always mark this sender as important
* Always label this sender as promotion
* Always show this sender in job emails
* Never archive this sender

### 5.7 Gmail Label Actions

The app should later support applying Gmail labels such as:

* InboxPilot/Important
* InboxPilot/Jobs
* InboxPilot/Security
* InboxPilot/Promotions

### 5.8 Safe Unsubscribe Suggestions

The app should detect promotional senders and show unsubscribe suggestions, but it should not automatically unsubscribe without user approval.

## 6. Non-Goals for Version 1

The first version will not:

* Delete emails automatically
* Send emails
* Read full email bodies unless needed
* Use paid AI APIs
* Handle multiple email providers
* Become a public SaaS product

## 7. Privacy Requirements

The app should store only necessary email metadata. It should avoid storing full email bodies, OTPs, passwords, attachments, and sensitive personal content. OAuth tokens should not be hardcoded in the codebase.

## 8. Recommended Tech Stack

Backend: Python, FastAPI
Frontend: React with Vite
Database: PostgreSQL
Email API: Gmail API
Local Development: Docker Compose
Version Control: Git and GitHub
CI/CD: GitHub Actions
Cloud Deployment: AWS EC2 first, AWS ECS/RDS later

## 9. First Milestone

The first milestone is to create a Python script that connects to Gmail and fetches the latest 10 emails with sender, subject, date, and snippet.

## 10. Success Criteria

The MVP is successful if the user can open the dashboard and quickly see:

* Important emails they should not miss
* Job or internship-related emails
* Login and security emails
* Promotional emails
* Suggested senders to unsubscribe from or archive
