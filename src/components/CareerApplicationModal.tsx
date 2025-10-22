import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface CareerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: string;
  department: string;
}

export function CareerApplicationModal({ isOpen, onClose, position, department }: CareerApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    resumeUrl: "",
    stayInTouch: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log("💼 Career Application Submission");
      console.log("VITE_SUPABASE_URL:", supabaseUrl ? "SET ✓" : "MISSING ✗");
      console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "SET ✓" : "MISSING ✗");

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Configuration error. Please try again later.");
      }

      const applicationData = {
        ...formData,
        position,
        department,
      };

      console.log("Submitting application for:", position);

      // 1. Save to Supabase database
      const { data: dbData, error: dbError } = await supabase
        .from("career_applications")
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            position: position,
            department: department,
            linkedin_url: formData.linkedinUrl || null,
            portfolio_url: formData.portfolioUrl || null,
            cover_letter: formData.coverLetter || null,
            resume_url: formData.resumeUrl || null,
            stay_in_touch: formData.stayInTouch,
            application_status: "pending",
          },
        ])
        .select();

      if (dbError) {
        console.error("❌ Database error:", dbError);
        throw new Error(`Failed to save application: ${dbError.message}`);
      }

      console.log("✅ Application saved to database:", dbData);

      // 2. Call Edge Function to send to Brevo
      let edgeFunctionSuccess = false;
      try {
        console.log("📧 Calling Edge Function to send to Brevo...");
        
        const funcResponse = await fetch(
          `${supabaseUrl}/functions/v1/submit-career-application`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify(applicationData),
          }
        );

        console.log("Edge Function response status:", funcResponse.status);

        if (funcResponse.ok) {
          const result = await funcResponse.json();
          console.log("✅ Edge Function success:", result);
          edgeFunctionSuccess = true;
        } else {
          const errorText = await funcResponse.text();
          console.error("❌ Edge Function error:", errorText);
        }
      } catch (funcError) {
        console.error("❌ Edge Function call failed:", funcError);
      }

      // Show success even if edge function fails (graceful degradation)
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedinUrl: "",
          portfolioUrl: "",
          coverLetter: "",
          resumeUrl: "",
          stayInTouch: false,
        });
        onClose();
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">Apply for {position}</DialogTitle>
          <DialogDescription className="text-lg">
            {department} Department • Fill out the form below to submit your application
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest. We'll review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 flex items-start gap-3">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL (Google Drive, Dropbox, etc.)</Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/..."
              />
              <p className="text-xs text-muted-foreground">
                Upload your resume to a cloud service and paste the shareable link here
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="stayInTouch"
                checked={formData.stayInTouch}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, stayInTouch: checked as boolean }))
                }
              />
              <Label htmlFor="stayInTouch" className="text-sm font-normal cursor-pointer">
                I'd like to receive updates about future opportunities at Orju Media
              </Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
