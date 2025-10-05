import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Megaphone, Video, FileText } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website Development",
    image: "/services/web-dev.jpg",
    description: "We build modern, responsive websites tailored for entrepreneurs, creatives, and organizations. Our sites are fast, accessible, and designed to reflect your unique brand. From e-commerce to portfolios, we deliver digital experiences that drive results."
  },
  {
    icon: Megaphone,
    title: "Advertisement Partnership",
    image: "/services/affiliate-partnership.jpg",
    description: "Partner with Orju Media to expand your reach and earn commissions. Our program offers co-branded marketing, real-time tracking, and dedicated support—perfect for agencies, consultants, and community leaders."
  },
  {
    icon: FileText,
    title: "Content Creation",
    image: "/services/content-creation.jpg",
    description: "Engaging copy, blogs, and social media content that tells your story and connects with your audience. We craft compelling narratives and campaigns to grow your brand online."
  },
  {
    icon: Video,
    title: "Video & Podcast",
    image: "/services/media-production.jpg",
    description: "Professional video, podcast, and photography services for brands ready to amplify their voice. From concept to editing, we help you create media that inspires and informs."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Orju Media | Empowering Communities Through Storytelling"
        description="Orju Media empowers Filipino and multicultural communities through digital tools, creative storytelling, and culturally rooted media services. Connect, inspire, and grow with us."
        >
          {/* No children needed for SEO, but required by prop types */}
      </SEO>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative gradient-hero pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative SVG background */}
        <img
          src="/hero-bg.svg"
          alt="Decorative background"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
          style={{ left: '50%', transform: 'translateX(-50%)', top:30 }}
          aria-hidden="true"
        />
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="max-w-2xl animate-fade-in flex-1">
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
          {/* Hero GIF */}
          <div className="flex-1 flex justify-center items-center animate-fade-in">
            <img
              src="/media-hero.gif"
              alt="Animated media GIF"
              className="rounded-3xl shadow-card w-full max-w-md object-cover border border-border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Services Sections */}
  <section className="w-full bg-card/60 border border-border/40 rounded-2xl shadow-card py-8 md:py-12">
  <div className="flex justify-center mt-24 mb-12">
          <h2 className="text-5xl md:text-7xl font-extrabold text-center tracking-wide text-primary drop-shadow-md">What We Do</h2>
        </div>
  <div className="mt-10 mb-12 w-full flex justify-center">
          <p className="w-full text-2xl md:text-3xl font-semibold text-muted-foreground text-center px-4 md:px-0">
            At Orju Media, we blend creativity and technology to elevate your brand. Our services span website development, content creation, advertising partnerships, and multimedia production. Whether you’re a startup, a growing business, or a community organization, we help you connect with your audience, tell your story, and achieve real impact in the digital world.
          </p>
        </div>
        {/* What We Offer heading */}
  <div className="w-full flex justify-center mt-48 mb-[-5rem]">
         <h3 className="text-5xl md:text-6xl font-extrabold text-primary text-center">What We Offer</h3>
        </div>

        {services.map((service, index) => (
          <section
            key={service.title}
            className="w-full min-h-screen flex flex-col justify-center items-center bg-card/60 rounded-none shadow-none border-b border-border/40 p-0 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
              {/* Description and icon on the left */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start p-8 max-w-2xl">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg md:text-xl">{service.description}</p>
                </div>
              </div>
              {/* Animated Icon on the right */}
              <div className="relative w-full md:w-2/5 h-64 md:h-[70vh] flex-shrink-0 flex items-center justify-center">
                <span className="inline-block">
                  <service.icon
                    className="w-40 h-40 md:w-64 md:h-64 animate-bounce-slow drop-shadow-lg"
                    aria-label={service.title + ' icon'}
                    style={{
                      stroke: 'url(#gradient-' + index + ')',
                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))',
                    }}
                  />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6a00" />
                        <stop offset="50%" stopColor="#ee0979" />
                        <stop offset="100%" stopColor="#00c3ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <style>{`
                  @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-30px); }
                  }
                  .animate-bounce-slow {
                    animation: bounce-slow 2.5s infinite;
                  }
                  .drop-shadow-lg {
                    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
                  }
                  .w-40, .h-40, .md\\:w-64, .md\\:h-64 {
                    stroke-width: 1.5;
                  }
                `}</style>
              </div>
            </div>
          </section>
        ))}
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
