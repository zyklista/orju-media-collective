import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log("Careers application handler function started");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    const BREVO_CAREERS_LIST_ID = Deno.env.get('BREVO_CAREERS_LIST_ID');
    
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured');
    }

    const body = await req.json();
    console.log("Received careers application:", body);

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      linkedinUrl,
      portfolioUrl,
      coverLetter,
      resumeUrl,
      stayInTouch = false
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !position) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare contact attributes for Brevo
    const contactData: any = {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: phone || "",
        POSITION_APPLIED: position,
        DEPARTMENT: department || "",
        LINKEDIN: linkedinUrl || "",
        PORTFOLIO: portfolioUrl || "",
        COVER_LETTER: coverLetter ? coverLetter.substring(0, 500) : "", // Brevo has character limits
        RESUME_URL: resumeUrl || "",
        APPLICATION_DATE: new Date().toISOString().split('T')[0]
      },
      updateEnabled: true
    };

    // Add to careers list if stayInTouch is true and list ID is configured
    if (stayInTouch && BREVO_CAREERS_LIST_ID) {
      contactData.listIds = [parseInt(BREVO_CAREERS_LIST_ID)];
      console.log(`Adding to careers list ID: ${BREVO_CAREERS_LIST_ID}`);
    }

    console.log("Creating/updating Brevo contact with data:", contactData);

    // Create or update contact in Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(contactData),
    });

    const brevoData = await brevoResponse.json();
    console.log("Brevo contact response:", brevoData);

    if (!brevoResponse.ok && brevoResponse.status !== 400) {
      // 400 might mean contact exists, which is okay
      throw new Error(`Brevo API error: ${JSON.stringify(brevoData)}`);
    }

    // Send notification email to HR/Admin
    const emailData = {
      sender: {
        name: "Orju Careers",
        email: "noreply@orjumedia.com"
      },
      to: [
        {
          email: "hello@orjumedia.com",
          name: "Orju HR Team"
        }
      ],
      subject: `New Career Application: ${position}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Career Application Received</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Department:</strong> ${department || "Not specified"}</p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Additional Information</h3>
            <p><strong>LinkedIn:</strong> ${linkedinUrl ? `<a href="${linkedinUrl}">${linkedinUrl}</a>` : "Not provided"}</p>
            <p><strong>Portfolio:</strong> ${portfolioUrl ? `<a href="${portfolioUrl}">${portfolioUrl}</a>` : "Not provided"}</p>
            <p><strong>Resume:</strong> ${resumeUrl ? `<a href="${resumeUrl}">View Resume</a>` : "Not provided"}</p>
            <p><strong>Wants Updates:</strong> ${stayInTouch ? "Yes" : "No"}</p>
          </div>

          ${coverLetter ? `
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Cover Letter</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This application was submitted through the Orju Media Careers page on ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `
    };

    console.log("Sending notification email to HR...");

    const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    const emailResult = await emailResponse.json();
    console.log("Email notification response:", emailResult);

    if (!emailResponse.ok) {
      console.error("Failed to send notification email:", emailResult);
      // Don't fail the whole request if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully",
        contactId: brevoData.id
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing careers application:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process application",
        details: error.toString()
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
