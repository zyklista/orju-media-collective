import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Target, Users, Award, Sparkles } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to delivering exceptional digital solutions that drive real business results."
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Your success is our success. We build lasting partnerships based on trust and transparency."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from strategy to execution."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We stay ahead of the curve, leveraging cutting-edge technology and creative thinking."
  }
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-gradient">ORJU MEDIA</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're a digital-first agency transforming how brands connect with their audiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              ORJU MEDIA was founded with a singular vision: to help brands thrive in the digital age. 
              We recognized that businesses needed more than just a website or a social media presence—they 
              needed a strategic partner who could understand their unique challenges and craft solutions 
              that deliver measurable results.
            </p>
            <p>
              Today, we're a team of passionate creatives, strategists, and technologists working together 
              to push the boundaries of what's possible in digital media. From website development to content 
              creation, we bring a holistic approach to every project, ensuring that all elements work in 
              harmony to achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="gradient-card p-8 rounded-lg border border-border/50 shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
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
