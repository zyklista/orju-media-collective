// Supabase Edge Function: send-contact-email
// Accepts POST JSON payload with contact info and forwards to Brevo (Sendinblue)
// Expects BREVO_API_KEY and BREVO_API_KEY_LIST_ID to be set in Supabase Function Secrets

import { serve } from "https://deno.land/std@0.167.0/http/server.ts";

serve(async (req: Request) => {
	try {
		if (req.method !== "POST") {
			return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
		}

		const body = await req.json().catch(() => null);
		if (!body || !body.email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
		const BREVO_LIST_ID = Deno.env.get('BREVO_API_KEY_LIST_ID');
		
		if (!BREVO_API_KEY) {
			console.error('Missing BREVO_API_KEY in function secrets');
			return new Response(JSON.stringify({ error: 'Server misconfigured: Missing API key' }), { status: 500 });
		}
		
		if (!BREVO_LIST_ID) {
			console.error('Missing BREVO_API_KEY_LIST_ID in function secrets');
			return new Response(JSON.stringify({ error: 'Server misconfigured: Missing List ID' }), { status: 500 });
		}

		// Determine which lists to add contact to
		// If stayInTouch is true, add them to the marketing list
		const listIds = body.stayInTouch ? [parseInt(BREVO_LIST_ID)] : [];
		
		// Upsert contact to Brevo contacts
		const contactPayload = {
			email: body.email,
			attributes: {
				FIRSTNAME: body.firstName || '',
				LASTNAME: body.lastName || '',
				COMPANY: body.company || '',
				JOB_TITLE: body.jobTitle || '',
				REGION: body.region || '',
				CATEGORY: body.category || '',
				BUDGET: body.budget || '',
				HEAR_ABOUT: body.hearAbout || '',
				STAY_IN_TOUCH: body.stayInTouch ? 'Yes' : 'No',
			},
			listIds: listIds,
			updateEnabled: true
		};

		// Create or update contact in Brevo
		console.log('Creating/updating Brevo contact:', body.email);
		const contactResp = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': BREVO_API_KEY
			},
			body: JSON.stringify(contactPayload)
		});

		const contactJson = await contactResp.json().catch(() => null);
		
		if (!contactResp.ok) {
			console.error('Brevo contact creation failed:', contactResp.status, contactJson);
			// Continue anyway to attempt sending email
		} else {
			console.log('Brevo contact created/updated successfully');
			if (body.stayInTouch) {
				console.log(`Contact added to list ID: ${BREVO_LIST_ID}`);
			}
		}

		// Optionally send notification email to site owner or confirmation to user
		const sendPayload = {
			sender: { name: 'Orju Media', email: 'noreply@orjumedia.com' },
			to: [{ email: 'hello@orjumedia.com', name: 'Orju Media' }],
			subject: `New contact from ${body.firstName || body.email}`,
			htmlContent: `<strong>New contact submission</strong><br/><br/>
				<p><strong>Name:</strong> ${body.firstName || ''} ${body.lastName || ''}</p>
				<p><strong>Email:</strong> ${body.email}</p>
				<p><strong>Company:</strong> ${body.company || ''}</p>
				<p><strong>Job Title:</strong> ${body.jobTitle || ''}</p>
				<p><strong>Region:</strong> ${body.region || ''}</p>
				<p><strong>Category:</strong> ${body.category || ''}</p>
				<p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
				<p><strong>How they heard about us:</strong> ${body.hearAbout || ''}</p>
				<p><strong>Stay in touch:</strong> ${body.stayInTouch ? 'Yes ✓' : 'No'}</p>
				<p><strong>Message:</strong><br/>${(body.help || '')}</p>`
		};

		console.log('Sending notification email to hello@orjumedia.com');
		const sendResp = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': BREVO_API_KEY
			},
			body: JSON.stringify(sendPayload)
		});

		const sendJson = await sendResp.json().catch(() => null);
		
		if (!sendResp.ok) {
			console.error('Brevo email send failed:', sendResp.status, sendJson);
		} else {
			console.log('Notification email sent successfully');
		}

		return new Response(JSON.stringify({ 
			success: true,
			contact: contactJson, 
			email: sendJson,
			addedToList: body.stayInTouch ? true : false
		}), { 
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
	}
});
