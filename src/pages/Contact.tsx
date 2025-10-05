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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Orju Media | Filipino Digital Agency Europe"
        description="Contact Orju Media for digital, media, and creative services. Offices in the Philippines, Canada, and Europe."
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
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Contact <span className="text-gradient">Orju Media</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '100ms'}}>
            We’d love to hear from you. Whether you have a project in mind, want to collaborate, or just want to say hello, fill out the form or reach us through the details below.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          {/* Contact Form - now full width, no margin */}
          <div className="bg-card/80 rounded-none shadow-none p-0 animate-fade-in-up border-0 w-full">
            <h2 className="text-3xl font-bold mb-6 px-6 pt-12">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-12 w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="companyWebsite">COMPANY WEBSITE (if there’s any)</Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobTitle">JOB TITLE*</Label>
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
                    <Label htmlFor="workEmail">WORK EMAIL*</Label>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="region">REGION*</Label>
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
                    <Label htmlFor="category">CHOOSE THE CATEGORY THAT BEST DESCRIBES YOUR INQUIRY*</Label>
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
                  <Label htmlFor="help">HOW CAN WE HELP YOUR BRAND?*</Label>
                  <Textarea
                    id="help"
                    name="help"
                    value={formData.help}
                    onChange={handleChange}
                    required
                    className="mt-2 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="hidden" />
                  <div>
                    <Label htmlFor="hearAbout">HOW DID YOU HEAR ABOUT US?*</Label>
                    <Input
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <input
                    id="stayInTouch"
                    name="stayInTouch"
                    type="checkbox"
                    checked={formData.stayInTouch}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border border-input accent-primary"
                  />
                  <Label htmlFor="stayInTouch" className="cursor-pointer select-none">
                    If you’d like to stay in touch, please check this box!
                  </Label>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow mt-2">
                  Send Message
                </Button>
              </form>
          </div>
          {/* Office Locations & Info - aligned horizontally below the form */}
          <div className="animate-fade-in-up px-6 pb-20 w-full max-w-6xl mx-auto" style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Our Offices */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Offices</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="gradient-card p-3 rounded-lg border border-border/50">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Europe Office</h3>
                      <p className="text-muted-foreground text-sm">
                        Dandova 2619/13<br />
                        Praha 9, Horni Počernice<br />
                        19300
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="gradient-card p-3 rounded-lg border border-border/50">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm">contact@orjumedia.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="gradient-card p-3 rounded-lg border border-border/50">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm">+420774900384</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Spacer or additional info (optional) */}
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
