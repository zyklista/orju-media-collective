import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Heart, TrendingUp, Users } from "lucide-react";

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
    title: "Senior Web Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote"
  },
  {
    title: "Content Strategist",
    department: "Content",
    type: "Full-time",
    location: "Hybrid"
  },
  {
    title: "Digital Marketing Manager",
    department: "Marketing",
    type: "Full-time",
    location: "On-site"
  },
  {
    title: "Video Producer",
    department: "Production",
    type: "Contract",
    location: "Remote",
    status: "Opening Soon"
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build your career at the intersection of creativity and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why ORJU MEDIA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="gradient-card p-8 rounded-lg border border-border/50 shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={position.title}
                className="gradient-card p-8 rounded-lg border border-border/50 shadow-card hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{position.title}</h3>
                      {position.status && (
                        <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                          {position.status}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Don't see the right role?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let's talk.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
