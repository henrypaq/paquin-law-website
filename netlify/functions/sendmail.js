const { Resend } = require('resend');

exports.handler = async (event, context) => {
  // Log function invocation for debugging
  console.log('Sendmail function invoked');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Has RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
  
  // Check for API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from environment variables');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Server configuration error',
        message: 'Email service is not properly configured. Please contact support.',
      }),
    };
  }

  // Initialize Resend with API key
  let resend;
  try {
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch (error) {
    console.error('Failed to initialize Resend:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to initialize email service',
        message: 'Email service initialization failed. Please try again later.',
      }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    let body;
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid request format' }),
      };
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields:', { hasName: !!name, hasEmail: !!email, hasMessage: !!message });
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Please fill in all required fields (name, email, and message).'
        }),
      };
    }

    // Escape HTML to prevent XSS
    const escapeHtml = (text) => {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Format the submission date
    const submissionDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Send email using Resend
    // Note: Resend test mode only allows sending to the account owner's email
    // For production, verify a domain at resend.com/domains and update the 'from' address
    console.log('Attempting to send email...');
    console.log('Sending from: onboarding@resend.dev');
    console.log('Sending to: henry@aicallisto.com (account owner - Resend requirement)');
    console.log('Original recipient: henrypaquin0@gmail.com');
    
    // For now, send to account owner email due to Resend test domain restrictions
    // Once a domain is verified, update 'from' to use that domain and 'to' to henrypaquin0@gmail.com
    const { data, error } = await resend.emails.send({
      from: 'Paquin Law <onboarding@resend.dev>',
      to: ['henry@aicallisto.com'], // Account owner email (required for test domain)
      replyTo: email,
      subject: `[Paquin Law] Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="border-bottom: 3px solid #0B5524; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #0B5524; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
              <p style="color: #666; margin: 8px 0 0 0; font-size: 14px;">Paquin Law Website</p>
            </div>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #0B5524; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Submitted</p>
              <p style="margin: 0; color: #333; font-size: 16px; font-weight: 500;">${submissionDate}</p>
            </div>

            <div style="margin-bottom: 25px;">
              <h2 style="color: #333; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 120px; color: #666; font-weight: 500;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 16px;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-weight: 500;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <a href="mailto:${safeEmail}" style="color: #0B5524; text-decoration: none; font-size: 16px;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h2 style="color: #333; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Message</h2>
              <div style="background-color: #fafafa; padding: 20px; border-radius: 4px; border: 1px solid #e0e0e0; color: #333; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${safeMessage}</div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">This email was sent from the Paquin Law contact form</p>
              <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">You can reply directly to this email to respond to ${safeName}</p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 11px; font-style: italic;">Note: This email was forwarded due to Resend test domain restrictions. Original recipient: henrypaquin0@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission - Paquin Law Website

Submitted: ${submissionDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION

Name: ${name}
Email: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from the Paquin Law contact form.
You can reply directly to this email to respond to ${name}.

Note: Currently forwarded to account owner email due to Resend test domain restrictions.
To send directly to henrypaquin0@gmail.com, verify a domain at resend.com/domains.
      `,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      
      // Check for specific Resend validation errors
      if (error.statusCode === 403 && error.name === 'validation_error') {
        console.error('Resend domain verification required');
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            error: 'Email service configuration error',
            message: 'Email service requires domain verification. Please contact support.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          }),
        };
      }
      
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          error: 'Failed to send email',
          message: 'We encountered an error sending your message. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }),
      };
    }

    console.log('Email sent successfully:', data?.id);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        id: data?.id 
      }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error stack:', errorStack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.',
      }),
    };
  }
};

