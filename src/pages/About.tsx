import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Target, Users, Award, Sparkles } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community Care",
    description: "Every project feels like a genuine collaboration. We treat your vision like family."
  },
  {
    icon: Sparkles,
    title: "Authentic Storytelling",
    description: "From Filipino journeys to global campaigns, we craft media that resonates with heart and truth."
  },
  {
    icon: Target,
    title: "Accessible Tech",
    description: "We simplify websites, workflows, and automation so anyone can build confidently."
  },
  {
    icon: Award,
    title: "Cultural Connection",
    description: "We bridge Filipino warmth with global professionalism, honoring every identity we serve."
  }
];

const About = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Orju Media | Filipino Community-First Digital Company"
        description="Learn about Orju Media, a community-first digital and media company rooted in Filipino creativity, serving multicultural entrepreneurs and organizations."
      >
      </SEO>
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Floating decorative icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-16 opacity-15 animate-pulse" style={{ animationDuration: '3s' }}>
            <Users className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute bottom-32 left-20 opacity-10 animate-bounce" style={{ animationDuration: '4s' }}>
            <Sparkles className="w-24 h-24 text-purple-500" />
          </div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-bold mb-8">
              About <span className="text-gradient">Orju Media</span>
            </h1>
            <p className="text-3xl text-muted-foreground">
              A community-first digital and media company proudly rooted in Filipino creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-10">Who We Are</h2>
          <div className="space-y-8 text-2xl text-muted-foreground">
            <p>
              Orju Media is a community-first digital and media company based in Europe, proudly rooted in Filipino creativity. 
              We specialize in website development, content creation, podcast and video production, and strategic partnerships—designed 
              to help entrepreneurs, creatives, and organizations thrive online.
            </p>
            <p>
              Whether you're a Filipino entrepreneur, a small business owner, or a global brand seeking authentic multicultural 
              engagement, we offer modular packages that blend tech, storytelling, and cultural insight.
            </p>
          </div>
          
          <h2 className="text-5xl font-bold mb-10 mt-20">Our Roots</h2>
          <div className="space-y-8 text-2xl text-muted-foreground">
            <p>
              Our platform <a href="https://diaryofanofw.com/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline hover:text-primary/80">Diary of an OFW</a> began as a storytelling space for 
              Filipinos abroad. Today, it fuels our mission to turn stories into solutions—helping clients build their digital presence 
              while honoring their cultural identity.
            </p>
            <p>
              We believe that every brand has a story worth telling, and every community deserves tools that empower them to share it 
              with the world. That's the heart of what we do at Orju Media.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-secondary/20 relative overflow-hidden">
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
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="gradient-card p-8 rounded-lg border border-border/50 shadow-card animate-fade-in-up relative group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glowing background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                <div className="relative z-10">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <value.icon className="w-16 h-16 text-primary relative z-10 transition-transform group-hover:scale-110 duration-300" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{value.title}</h3>
                  <p className="text-xl text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
