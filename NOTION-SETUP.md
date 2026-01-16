# Notion Integration Setup Guide

This guide will help you connect your Personal Almanac to a Notion database.

## Step 1: Create Notion Database

1. **Open Notion** and create a new page
2. **Add a database** (Table view)
3. **Name it**: "Personal Almanac"

## Step 2: Set Up Database Properties

Create the following properties (columns) in your database:

| Property Name | Property Type | Notes |
|--------------|---------------|-------|
| Name | Title | Primary field (auto-created) |
| First Name | Text | |
| Last Name | Text | |
| Email | Email | |
| Phone | Phone | |
| Address | Text | |
| Birthday | Date | |
| Dietary Restrictions | Multi-select | Add options: Vegetarian, Vegan, Gluten Free, Dairy Free, No Seafood, No Red Meat, No Egg |

### Setting Up Multi-Select Options

For the "Dietary Restrictions" field:
1. Click the property header
2. Select "Multi-select" type
3. Add each option:
   - Vegetarian
   - Vegan
   - Gluten Free
   - Dairy Free
   - No Seafood
   - No Red Meat
   - No Egg

## Step 3: Create Notion Integration

1. Go to: https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. **Name**: `Personal Almanac`
4. **Associated workspace**: Select your workspace
5. **Capabilities**:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
6. Click **"Submit"**
7. **Copy the Internal Integration Secret** (starts with `secret_...`)

## Step 4: Share Database with Integration

1. Open your "Personal Almanac" database in Notion
2. Click the **"•••"** menu (top right)
3. Click **"Add connections"**
4. Search for and select **"Personal Almanac"** (your integration)
5. Click **"Confirm"**

## Step 5: Get Database ID

1. Open your database in Notion
2. Click **"Share"** → **"Copy link"**
3. The URL will look like:
   ```
   https://www.notion.so/workspace/abc123def456?v=xyz789
   ```
4. The database ID is the part between the last `/` and the `?`:
   - In the example above: `abc123def456`
   - It's a 32-character string (may have hyphens)

## Step 6: Add to Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your **personal-almanac** project
3. Go to **Settings** → **Environment Variables**
4. Add these two new variables:

### Variable 1: Notion API Key
- **Name**: `NOTION_API_KEY`
- **Value**: Your integration secret from Step 3 (starts with `secret_...`)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### Variable 2: Database ID
- **Name**: `NOTION_DATABASE_ID`
- **Value**: Your database ID from Step 5
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save** for each variable

## Step 7: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**

## Step 8: Test

1. Go to your deployed site: https://personal-almanac.vercel.app/
2. Fill out the form with test data
3. Submit
4. Check your Notion database - you should see new entries!
5. Check your email - you should receive the formatted email

## How It Works

When someone submits the form:
1. **Creates a row in Notion** for each person (primary + household members)
2. **Sends an email** with all the information
3. **Each person gets the same address** (from the primary person)
4. **Dietary restrictions** are added as multi-select tags in Notion

## Troubleshooting

### "Failed to submit entry" error
- Check that environment variables are set correctly in Vercel
- Make sure you redeployed after adding variables
- Verify the database is shared with your integration

### Data not appearing in Notion
- Confirm database ID is correct (32 characters)
- Check that all property names match exactly (case-sensitive):
  - Name, First Name, Last Name, Email, Phone, Address, Birthday, Dietary Restrictions

### Multi-select values not showing
- Ensure you've created all the dietary restriction options in Notion
- Options must match exactly: "Vegetarian", "Vegan", "Gluten Free", etc.

## Database View Suggestions

You can create different views in Notion:

1. **All Contacts** - Default table view
2. **Birthdays This Month** - Filter by birthday month
3. **Dietary Restrictions** - Group by dietary restrictions
4. **Recently Added** - Sort by creation date

Enjoy your automated Personal Almanac! 🎉
