import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Heart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { CareerApplicationModal } from "@/components/CareerApplicationModal";
import { UnderConstruction } from "@/components/UnderConstruction";

const benefits = [
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible schedules and remote work options to help you thrive."
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Continuous learning and career development programs."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented individuals who are passionate about innovation."
  },
  {
    icon: Briefcase,
    title: "Competitive Compensation",
    description: "Industry-leading salaries and comprehensive benefits packages."
  }
];

const openPositions = [
  {
    title: "Full-stack Web Developer",
    department: "Engineering",
    type: "Part-time",
    location: "Remote"
  },
  {
    title: "Content Strategist",
    department: "Content",
    type: "Part-time",
    location: "Hybrid"
  },
  {
    title: "Digital Marketing Manager",
    department: "Marketing",
    type: "Part-time",
    location: "On-site"
  },
  {
    title: "Videographer",
    department: "Production",
    type: "Project-based",
    location: "Remote or On-site"
  },
  {
    title: "Video Editor",
    department: "Production",
    type: "Project-based",
    location: "Remote"
  },
  {
    title: "Photographer",
    department: "Production",
    type: "Project-based",
    location: "On-site"
  }
];

const Careers = () => {
  // Temporary: Show under construction page
  const SHOW_UNDER_CONSTRUCTION = false;

  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Careers"
        pageTitle="Join Our Team"
        description="We're enhancing our careers portal with a better application experience and more opportunities. Check back soon!"
        expectedCompletion="Early November 2025"
      />
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({ title: "", department: "" });

  const handleApplyClick = (position: string, department: string) => {
    setSelectedPosition({ title: position, department });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Careers at Orju Media | Join Our Team"
        description="Explore career opportunities at Orju Media. Join a multicultural team passionate about digital, media, and creative innovation."
        image="https://lovable.dev/opengraph-image-p98pqg.png"
        type="website"
        twitterHandle="@orjumedia"
      />
      <Navigation />
      
      <CareerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={selectedPosition.title}
        department={selectedPosition.department}
      />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-28 pb-14 px-3 sm:px-6 relative overflow-hidden">
        {/* Floating career-themed icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-24 right-12 opacity-15 animate-pulse" style={{ animationDuration: '3s' }}>
            <Briefcase className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-10 animate-bounce" style={{ animationDuration: '4s' }}>
            <TrendingUp className="w-24 h-24 text-purple-500" />
          </div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl xs:text-7xl md:text-8xl font-bold mb-8 xs:mb-10">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-2xl xs:text-3xl text-muted-foreground">
              Build your career at the intersection of creativity and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-10 xs:py-16 md:py-20 px-3 xs:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl xs:text-5xl font-bold text-center mb-10 xs:mb-16">Why ORJU MEDIA?</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="gradient-card p-4 xs:p-8 rounded-lg border border-border/50 shadow-card animate-fade-in-up relative group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glowing background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                <div className="relative z-10">
                  <div className="relative inline-block mb-4 xs:mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <benefit.icon className="w-12 h-12 xs:w-16 xs:h-16 text-primary relative z-10 transition-transform group-hover:scale-110 duration-300" />
                  </div>
                  <h3 className="text-2xl xs:text-3xl font-bold mb-2 xs:mb-4">{benefit.title}</h3>
                  <p className="text-lg xs:text-xl text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-10 xs:py-16 md:py-20 px-3 xs:px-6 bg-secondary/20 relative overflow-hidden">
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
          <h2 className="text-4xl xs:text-5xl font-bold text-center mb-10 xs:mb-16">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-4 xs:space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={position.title}
                className="gradient-card p-4 xs:p-8 rounded-lg border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 xs:gap-4">
                  <div>
                    <div className="flex items-center gap-2 xs:gap-3 mb-1 xs:mb-2">
                      <h3 className="text-2xl xs:text-4xl font-bold">{position.title}</h3>
                      {"status" in position && position.status && (
                        <span className="text-xs bg-primary/20 text-primary px-2 xs:px-3 py-1 rounded-full">
                          {String(position.status)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 xs:gap-6 text-lg xs:text-xl text-muted-foreground">
                      <span>{position.department}</span>
                      <span> 202</span>
                      <span>{position.type}</span>
                      <span> 202</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleApplyClick(position.title, position.department)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full xs:w-auto text-lg px-8 py-3"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 xs:py-16 md:py-20 px-3 xs:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl xs:text-5xl font-bold mb-8 xs:mb-12">Don't see the right role?</h2>
          <p className="text-2xl xs:text-3xl text-muted-foreground mb-10 xs:mb-14 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let's talk.
          </p>
          <Button 
            onClick={() => handleApplyClick("General Application", "General")}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow w-full xs:w-auto text-xl px-10 py-4"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
