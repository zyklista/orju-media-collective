import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Code, Megaphone, FileText, Video, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Transform your digital presence with culturally-informed web solutions that connect with your community and grow your business.",
    features: [
      "Custom web applications",
      "Responsive design",
      "E-commerce solutions",
      "Performance optimization",
      "SEO-friendly architecture"
    ]
  },
  {
    icon: Megaphone,
    title: "Advertisement Partnership",
    description: "Strategic partnerships that amplify your brand's reach while honoring authentic multicultural engagement and community values.",
    features: [
      "Digital marketing strategy",
      "Social media campaigns",
      "Brand partnerships",
      "Performance analytics",
      "ROI optimization"
    ]
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Culturally-rooted content that tells your story with authenticity, engages your community, and builds lasting connections.",
    features: [
      "Brand storytelling",
      "Copywriting & editing",
      "Visual content design",
      "Content strategy",
      "Multi-platform optimization"
    ]
  },
  {
    icon: Video,
    title: "Video & Podcast Production",
    status: "Coming Soon",
    description: "Professional media production that amplifies Filipino and multicultural voices through podcasts, video series, and branded content.",
    features: [
      "Video production",
      "Podcast recording & editing",
      "Motion graphics",
      "Audio engineering",
      "Distribution strategy"
    ]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="gradient-card p-8 rounded-lg border border-border/50 shadow-card">
                    <service.icon className="w-16 h-16 text-primary mb-4" />
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                      {service.status && (
                        <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                          {service.status}
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to take your brand to the next level? Get in touch with us today.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
