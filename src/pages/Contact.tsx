import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyWebsite: "",
    jobTitle: "",
    workEmail: "",
    region: "",
    category: "",
    help: "",
    budget: "",
    hearAbout: "",
    stayInTouch: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic required field validation
    const requiredFields = [
      'firstName', 'lastName', 'jobTitle', 'workEmail', 'region', 'category', 'help', 'hearAbout'
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: 'Please complete all required fields.',
          description: '',
          variant: 'destructive',
        });
        return;
      }
    }

    // Insert into Supabase contacts table
    try {
      const { data, error } = await supabase.from('contacts').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_website: formData.companyWebsite,
          job_title: formData.jobTitle,
          email: formData.workEmail,
          region: formData.region,
          category: formData.category,
          message: formData.help,
          budget: formData.budget,
          hear_about: formData.hearAbout,
          stay_in_touch: formData.stayInTouch,
        }
      ]).select();

      if (error) throw error;

      // Invoke Supabase Edge Function to send to Brevo
      let edgeFunctionSuccess = false;
      try {
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.companyWebsite,
          jobTitle: formData.jobTitle,
          email: formData.workEmail,
          region: formData.region,
          category: formData.category,
          help: formData.help,
          budget: formData.budget,
          hearAbout: formData.hearAbout,
          stayInTouch: formData.stayInTouch,
        };

        console.log('Invoking Edge Function with payload:', payload);

        // Direct fetch to Edge Function (avoids 405 error)
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        // Validate environment variables
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('Missing Supabase environment variables');
          console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
          console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
          throw new Error('Supabase configuration missing');
        }
        
        console.log('Calling Edge Function at:', `${supabaseUrl}/functions/v1/send-contact-email`);
        
        const funcResponse = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify(payload)
        });

        console.log('Edge Function status:', funcResponse.status);
        const funcData = await funcResponse.json();
        
        if (!funcResponse.ok) {
          console.error('Edge function error:', funcResponse.status, funcData);
          throw new Error(funcData.error || 'Edge function failed');
        }

        console.log('Edge function response:', funcData);
        edgeFunctionSuccess = true;
      } catch (fnErr: any) {
        console.error('Edge function error', fnErr);
        console.error('Error details:', fnErr.message);
      }

      // Show appropriate success message
      if (edgeFunctionSuccess) {
        toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you as soon as possible." });
      } else {
        toast({ 
          title: "Message Saved", 
          description: "Your message was saved successfully. We'll get back to you soon!",
          variant: "default"
        });
      }
      
      setFormData({
        firstName: "",
        lastName: "",
        companyWebsite: "",
        jobTitle: "",
        workEmail: "",
        region: "",
        category: "",
        help: "",
        budget: "",
        hearAbout: "",
        stayInTouch: false,
      });
    } catch (err: any) {
      console.error('Insert error', err);
      toast({ title: 'Failed to send message', description: err?.message || String(err), variant: 'destructive' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox" && "checked" in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Orju Media | Filipino Digital Agency Europe"
        description="Contact Orju Media for digital, media, and creative services. Offices in the Philippines, Canada, and Europe."
        image="https://lovable.dev/opengraph-image-p98pqg.png"
        type="website"
        twitterHandle="@orjumedia"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative gradient-hero pt-32 pb-20 px-6 overflow-hidden">
        <img
          src="/hero-bg.svg"
          alt="Decorative background"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
          style={{ left: '50%', transform: 'translateX(-50%)', top: 20 }}
          aria-hidden="true"
        />
        
        {/* Floating contact-themed icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-20 opacity-15 animate-pulse" style={{ animationDuration: '2s' }}>
            <Mail className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute bottom-32 left-16 opacity-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
            <Phone className="w-16 h-16 text-purple-500" />
          </div>
          <div className="absolute top-1/2 right-1/3 opacity-10 animate-pulse" style={{ animationDuration: '4s' }}>
            <MapPin className="w-24 h-24 text-blue-500" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-bold mb-8">
              Contact <span className="text-gradient">Orju Media</span>
            </h1>
            <p className="text-3xl text-muted-foreground">
              We'd love to hear from you. Whether you have a project in mind, want to collaborate, or just want to say hello, fill out the form or reach us through the details below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          {/* Contact Form - now full width, no margin */}
          <div className="bg-card/80 rounded-none shadow-none p-0 animate-fade-in-up border-0 w-full">
            <h2 className="text-4xl xs:text-5xl font-bold mb-20 xs:mb-32 px-3 xs:px-6 pt-12 xs:pt-16">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6 px-3 xs:px-6 pb-8 xs:pb-12 w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div>
                    <Label htmlFor="firstName">FIRST NAME*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">LAST NAME*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyWebsite" className="text-lg xs:text-2xl">COMPANY WEBSITE (if there’s any)</Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="mt-2 text-lg xs:text-2xl"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div>
                    <Label htmlFor="jobTitle" className="text-lg xs:text-2xl">JOB TITLE*</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workEmail" className="text-lg xs:text-2xl">WORK EMAIL*</Label>
                    <Input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div>
                    <Label htmlFor="region" className="text-lg xs:text-2xl">REGION*</Label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground"
                    >
                      <option value="" disabled>Select region</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="Europe">Europe</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-lg xs:text-2xl">CHOOSE THE CATEGORY THAT BEST DESCRIBES YOUR INQUIRY*</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground"
                    >
                      <option value="" disabled>Select category</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media Services">Media Services</option>
                      <option value="Careers">Careers</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="help" className="text-lg xs:text-2xl">HOW CAN WE HELP YOUR BRAND?*</Label>
                  <Textarea
                    id="help"
                    name="help"
                    value={formData.help}
                    onChange={handleChange}
                    required
                    className="mt-2 min-h-[100px] text-lg xs:text-2xl"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                  <div className="hidden" />
                  <div>
                    <Label htmlFor="hearAbout" className="text-lg xs:text-2xl">HOW DID YOU HEAR ABOUT US?*</Label>
                    <Input
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      required
                      className="mt-2 text-lg xs:text-2xl"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 mt-2 xs:mt-4">
                  <input
                    id="stayInTouch"
                    name="stayInTouch"
                    type="checkbox"
                    checked={formData.stayInTouch}
                    onChange={handleChange}
                    className="w-4 h-4 xs:w-5 xs:h-5 rounded border border-input accent-primary"
                  />
                  <Label htmlFor="stayInTouch" className="cursor-pointer select-none text-lg xs:text-2xl">
                    If you'd like to stay in touch, please check this box!
                  </Label>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow mt-2 text-2xl xs:text-3xl py-6">
                  Send Message
                </Button>
              </form>
          </div>
          {/* Contact info below form is now hidden as requested */}
          {/* <div className="h-32 xs:h-48" />
          <div className="animate-fade-in-up px-3 xs:px-6 pb-12 xs:pb-20 w-full max-w-6xl mx-auto flex flex-col items-center" style={{ animationDelay: '200ms' }}>
            ...contact info content...
          </div> */}
        </div>
      </section>

  <div className="h-60 xs:h-80" />
  <Footer />
    </div>
  );
};

export default Contact;
