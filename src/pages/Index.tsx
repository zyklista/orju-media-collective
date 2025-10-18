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
        image="https://lovable.dev/opengraph-image-p98pqg.png"
        type="website"
        twitterHandle="@orjumedia"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative gradient-hero pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative SVG background */}
        <img
          src="/hero-bg.svg"
          alt="Decorative background"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
          style={{ left: '50%', transform: 'translateX(-50%)', top: 30 }}
          aria-hidden="true"
        />
        
        {/* Floating Media Icons - Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Camera Icon - Top Left */}
          <div className="absolute top-20 left-10 opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
            <Video className="w-16 h-16 text-primary" />
          </div>
          
          {/* Code Icon - Top Right */}
          <div className="absolute top-32 right-16 opacity-15 animate-pulse" style={{ animationDuration: '2s' }}>
            <Code className="w-20 h-20 text-purple-500" />
          </div>
          
          {/* Megaphone Icon - Middle Left */}
          <div className="absolute top-1/2 left-20 opacity-10 animate-bounce" style={{ animationDuration: '4s' }}>
            <Megaphone className="w-24 h-24 text-orange-500" />
          </div>
          
          {/* Document Icon - Bottom Right */}
          <div className="absolute bottom-32 right-20 opacity-15 animate-pulse" style={{ animationDuration: '3s' }}>
            <FileText className="w-18 h-18 text-blue-500" />
          </div>
          
          {/* Additional gradient orbs for depth */}
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16 max-w-7xl">
          <div className="w-full md:max-w-2xl animate-fade-in flex-1 order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-center md:text-left">
              Empowering Communities
              <br />
              <span className="text-gradient">Through Storytelling</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto md:mx-0 text-center md:text-left leading-relaxed">
              Orju Media empowers Filipino and multicultural communities through digital tools, 
              creative storytelling, and culturally rooted media services. We build platforms that 
              connect, inspire, and grow—one story, one website, one partnership at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow w-full sm:w-auto text-base px-8 py-6">
                  Explore Services <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto text-base px-8 py-6">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
          {/* Hero Video */}
          <div className="w-full md:flex-1 flex justify-center items-center animate-fade-in order-1 md:order-2">
            <div className="relative rounded-2xl md:rounded-3xl shadow-card w-full max-w-md md:max-w-lg overflow-hidden border border-border bg-muted">
              <div className="relative w-full aspect-video">
                {/* Orju Media brand video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster="/sample-hero.jpg"
                >
                  {/* Your custom Orju Media video */}
                  <source src="/orju.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Fallback image */}
                <img
                  src="/sample-hero.jpg"
                  alt="Hero media - Digital storytelling and content creation"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="w-full bg-card/60 border border-border/40 rounded-2xl shadow-card py-16 md:py-20 px-4 sm:px-6 lg:px-8 my-12 md:my-16 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10">
            <div className="grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-10 right-10">
            <div className="grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex justify-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-tight text-primary drop-shadow-md">
              What We Do
            </h2>
          </div>
          <div className="mb-12 md:mb-16 w-full flex justify-center">
            <p className="w-full max-w-5xl text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground text-center leading-relaxed px-4">
              At Orju Media, we blend creativity and technology to elevate your brand. Our services span website development, content creation, advertising partnerships, and multimedia production. Whether you're a startup, a growing business, or a community organization, we help you connect with your audience, tell your story, and achieve real impact in the digital world.
            </p>
          </div>
          {/* What We Offer heading */}
          <div className="w-full flex justify-center mt-20 md:mt-32 mb-16 md:mb-20">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary text-center">
              What We Offer
            </h3>
          </div>

          {services.map((service, index) => (
            <section
              key={service.title}
              className="w-full min-h-[500px] md:min-h-[600px] flex flex-col justify-center items-center bg-card/60 rounded-xl shadow-sm border border-border/40 p-8 md:p-12 mb-8 overflow-hidden animate-fade-in-up relative group hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-8 md:gap-12 max-w-6xl mx-auto relative z-10">
                {/* Description and icon on the left */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start">
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">{service.title}</h3>
                    <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">{service.description}</p>
                  </div>
                </div>
                {/* Animated Icon on the right */}
                <div className="relative w-full md:w-2/5 h-48 md:h-80 flex-shrink-0 flex items-center justify-center">
                  {/* Glowing circle background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl animate-pulse"></div>
                  </div>
                  
                  <span className="inline-block relative z-10">
                    <service.icon
                      className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 animate-bounce-slow drop-shadow-lg transition-transform group-hover:scale-110 duration-300"
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
                    50% { transform: translateY(-18px); }
                  }
                  .animate-bounce-slow {
                    animation: bounce-slow 2.5s infinite;
                  }
                  .drop-shadow-lg {
                    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
                  }
                  .w-24, .h-24, .xs\\:w-40, .xs\\:h-40, .md\\:w-64, .md\\:h-64 {
                    stroke-width: 1.5;
                  }
                `}</style>
              </div>
            </div>
          </section>
        ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 gradient-hero my-12 md:my-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Let's collaborate to create something extraordinary.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow text-lg px-10 py-7">
              Start a Project <ArrowRight className="ml-2" size={24} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
