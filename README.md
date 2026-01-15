# Personal Almanac

A quiet place to remember the people I care about.

## Overview

Personal Almanac is a single-purpose intake form that helps friends and family share important personal details. Each submission creates one well-formatted email sent directly to you — no database, no user accounts, no long-term storage.

## Features

- Clean, minimal 5-step wizard interface
- Collects contact info, birthdays, and dietary preferences
- Supports household members
- Sends formatted email on submission
- No data persistence beyond email delivery
- Mobile-responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your email credentials:

**For Gmail:**
1. Enable 2-factor authentication in your Google account
2. Generate an App Password at: https://myaccount.google.com/apppasswords
3. Use the App Password (not your regular Gmail password) in the `.env` file

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
PORT=3000
```

**For other email providers:**
- Update the `service` field in `server.js` (line 15)
- Or use custom SMTP settings with `host`, `port`, and `secure` options

### 3. Run the Application

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Design Specifications

- **Background:** #F4F1ED
- **Primary Accent:** #6D4248
- **Secondary Accent:** #EA874B
- **Fonts:** Montserrat (body), Playfair Display (headers)

## Email Format

Each submission generates an email with:
- **Subject:** Personal Almanac — [First Name] [Last Name]
- **To:** sunthar.premakumar@gmail.com
- **Body:** Clean bullet-point list of all people and their information

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Email: Nodemailer
- No database required

## Privacy & Data Handling

- No database persistence
- No user accounts
- No cookies beyond basic functionality
- Data exists only long enough to send the email
- No analytics tracking

## Deployment Options

### Option 1: Deploy to Vercel/Netlify with Serverless Functions
- Convert the Express endpoint to serverless functions
- No server management required

### Option 2: Deploy to Heroku/Railway/Render
- Push the entire app as-is
- Set environment variables in the platform

### Option 3: Deploy to your own VPS
- Use PM2 or similar process manager
- Set up nginx as reverse proxy

## License

This is a personal project. Use as you see fit.
