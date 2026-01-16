// Format phone number to standard US format: (XXX) XXX-XXXX
function formatPhoneNumber(phone) {
  if (!phone) return null;

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Return original if can't format
  return phone;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, body, people } = req.body;

  // Get current date for submission tracking
  const submittedDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  try {
    // 1. Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Personal Almanac <onboarding@resend.dev>',
        to: 'sunthar.premakumar@gmail.com',
        subject: subject,
        text: body,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    // 2. Add each person to Notion database
    const notionResults = [];

    for (const person of people) {
      const notionResponse = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_DATABASE_ID },
          properties: {
            'Full Name': {
              title: [
                {
                  text: {
                    content: `${person.firstName} ${person.lastName}`,
                  },
                },
              ],
            },
            'First Name': {
              rich_text: [
                {
                  text: {
                    content: person.firstName,
                  },
                },
              ],
            },
            'Last Name': {
              rich_text: [
                {
                  text: {
                    content: person.lastName,
                  },
                },
              ],
            },
            'Email': {
              email: person.email || null,
            },
            'Phone Number': {
              phone_number: formatPhoneNumber(person.phone),
            },
            'Home Mailing Address': {
              rich_text: person.address ? [
                {
                  text: {
                    content: person.address,
                  },
                },
              ] : [],
            },
            'Birthday': {
              date: person.birthday ? {
                start: person.birthday,
              } : null,
            },
            'Dietary Restrictions': {
              multi_select: person.dietary.map(diet => ({ name: diet })),
            },
            'Submitted On': {
              date: {
                start: submittedDate,
              },
            },
          },
        }),
      });

      if (!notionResponse.ok) {
        const error = await notionResponse.text();
        console.error('Notion API error:', error);
        throw new Error('Failed to add to Notion');
      }

      const notionData = await notionResponse.json();
      notionResults.push(notionData.id);
    }

    return res.status(200).json({
      success: true,
      emailSent: true,
      notionEntriesCreated: notionResults.length,
    });

  } catch (error) {
    console.error('Error submitting entry:', error);
    return res.status(500).json({ error: 'Failed to submit entry' });
  }
}
