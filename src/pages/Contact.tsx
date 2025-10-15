import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
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
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you as soon as possible.",
    });
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
  <section className="relative gradient-hero pt-28 pb-14 px-3 sm:px-6 overflow-hidden">
        <img
          src="/hero-bg.svg"
          alt="Decorative background"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
          style={{ left: '50%', transform: 'translateX(-50%)', top: 20 }}
          aria-hidden="true"
        />
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl xs:text-7xl md:text-8xl font-bold mb-8 xs:mb-10 leading-tight animate-fade-in">
            Contact <span className="text-gradient">Orju Media</span>
          </h1>
          <p className="text-2xl xs:text-3xl text-muted-foreground max-w-2xl mb-10 xs:mb-14 animate-fade-in" style={{animationDelay: '100ms'}}>
            We'd love to hear from you. Whether you have a project in mind, want to collaborate, or just want to say hello, fill out the form or reach us through the details below.
          </p>
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
