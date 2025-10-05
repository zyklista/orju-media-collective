import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Monitor, Megaphone, Video, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const packages = [
  {
    icon: Monitor,
    title: "Starter Presence Kit",
    tagline: "Pang-sideline starter 🚀",
    description: "Perfect for entrepreneurs and creatives ready to launch their digital presence with confidence.",
    price: "20,000 CZK / €800",
    features: [
      "5-page responsive website (Home, About, Services, Contact + 1 custom page)",
      "Mobile-friendly design with Filipino-inspired touches",
      "Basic SEO setup for local & global reach",
      "Social media link integration",
      "1-month post-launch support"
    ],
    addOns: "Add-ons: Custom forms (€150), Blog setup (€200), E-commerce (€400)",
    cta: "Get Started"
  },
  {
    icon: Megaphone,
    title: "Growth & Storytelling Bundle",
    tagline: "Para sa seryosong negosyo 💼",
    description: "For businesses ready to grow their brand with authentic storytelling and strategic content.",
    price: "45,000 CZK / €1,800",
    features: [
      "Everything in Starter Kit",
      "Content strategy session (1 hour)",
      "4 blog posts or social media campaigns per month",
      "Monthly analytics & insights report",
      "Email marketing setup (MailChimp/Brevo)",
      "3 months content + tech support"
    ],
    addOns: "Add-ons: Video testimonials (€300), Podcast editing (€250/episode)",
    cta: "Work With Us",
    popular: true
  },
  {
    icon: Video,
    title: "Media Launchpad",
    tagline: "Full Filipino storytelling power 🎙️",
    description: "Complete media production for brands ready to amplify their voice through podcasts, videos, and campaigns.",
    price: "Custom pricing",
    features: [
      "Podcast or video series production (4-6 episodes)",
      "Full editing, branding, and distribution strategy",
      "Social media content repurposing",
      "Audience growth consultation",
      "Ongoing partnership for long-term storytelling"
    ],
    addOns: "Perfect for: Cultural campaigns, OFW stories, business podcasts",
    cta: "Let's Talk"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the package that fits your journey. From launching your first site to building a full media presence—
              <span className="text-foreground font-semibold"> andito kami para sa'yo.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.title}
                className={`gradient-card p-8 rounded-xl border-2 ${
                  pkg.popular ? 'border-accent shadow-hover' : 'border-border'
                } hover:shadow-hover hover:border-primary/30 transition-all duration-300 animate-fade-in-up flex flex-col relative`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <pkg.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{pkg.tagline}</p>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-xs text-muted-foreground mb-4 italic">{pkg.addOns}</p>
                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        pkg.popular 
                          ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                    >
                      {pkg.cta} <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Not sure which package fits?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 30-minute consultation and let's map out your digital journey together. 
            <span className="text-foreground font-semibold"> Walang pressure, pure collaboration lang!</span>
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-card">
              Schedule a Call <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
