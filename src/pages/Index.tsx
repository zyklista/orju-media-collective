import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Megaphone, Video, FileText } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Cutting-edge web solutions that drive results and engage audiences."
  },
  {
    icon: Megaphone,
    title: "Advertisement Partnership",
    description: "Strategic partnerships that amplify your brand's reach and impact."
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Compelling content that tells your story and connects with your audience."
  },
  {
    icon: Video,
    title: "Video & Podcast",
    description: "Coming Soon - Professional production services for modern media."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Empowering Communities
              <br />
              <span className="text-gradient">Through Storytelling</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Orju Media empowers Filipino and multicultural communities through digital tools, 
              creative storytelling, and culturally rooted media services. We build platforms that 
              connect, inspire, and grow—one story, one website, one partnership at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                  Explore Services <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="gradient-card p-8 rounded-lg border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              Start a Project <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
