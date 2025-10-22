import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Construction, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface UnderConstructionProps {
  pageName: string;
  pageTitle: string;
  description: string;
  expectedCompletion?: string;
}

export function UnderConstruction({ 
  pageName, 
  pageTitle, 
  description, 
  expectedCompletion = "soon" 
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Animated Construction Icon */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <Construction className="w-24 h-24 md:w-32 md:h-32 text-primary relative z-10 animate-bounce" />
          </div>

          {/* Page Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {pageTitle}
          </h1>

          {/* Under Construction Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 px-6 py-3 rounded-full mb-8">
            <Construction className="w-5 h-5" />
            <span className="font-semibold text-lg">Under Reconstruction</span>
          </div>

          {/* Description */}
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Expected Completion */}
          <p className="text-xl text-muted-foreground/80 mb-12">
            We're working hard to bring you an improved experience. Expected completion: <span className="font-semibold text-primary">{expectedCompletion}</span>
          </p>

          {/* Progress Animation */}
          <div className="max-w-md mx-auto mb-12">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-purple-500 animate-pulse" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Progress: 65%</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-lg px-8 py-6">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-6 bg-card/50 border border-border/50 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">What's Coming?</h3>
            <ul className="text-left text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Enhanced user interface and experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>New features and functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Improved performance and reliability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Better integration with our services</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
