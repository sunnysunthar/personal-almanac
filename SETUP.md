# Email Setup Guide

To enable automatic email sending, you need to set up Resend (free email API service).

## Step 1: Create Resend Account

1. Go to: https://resend.com/signup
2. Sign up for a free account
3. Verify your email address

## Step 2: Get API Key

1. Go to: https://resend.com/api-keys
2. Click "Create API Key"
3. Name it: "Personal Almanac"
4. Copy the API key (starts with `re_...`)

## Step 3: Add to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `personal-almanac` project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Paste your Resend API key
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

## Step 4: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**

That's it! Your form will now send emails automatically.

## Testing

1. Go to your deployed site
2. Fill out the form
3. Submit
4. Check your email (sunthar.premakumar@gmail.com)

## Free Tier Limits

Resend free tier includes:
- 100 emails per day
- 3,000 emails per month
- Perfect for personal use!
