import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-gradient">ORJU</span>
              <span className="text-foreground"> MEDIA</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Turning stories into solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Advertisement Partnership
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Content Creation
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect section with heading and Contact Us centered above address/info */}
          <div className="md:col-start-4 flex flex-col items-start ml-4">
            <div className="w-full flex flex-col items-start mb-4">
              <h4 className="font-semibold mb-2">Connect</h4>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="text-xs text-muted-foreground flex flex-row gap-8 space-y-0 w-full">
              <div className="text-left">
                <span className="font-bold block mb-1">Our Office</span>
                <span className="block">ORJU MEDIA</span>
                <span className="block">Dandova 2619/13</span>
                <span className="block">Praha 9, Horni Pocernice</span>
                <span className="block mb-2">19300</span>
              </div>
              <div className="text-left">
                <span className="font-bold block mb-1">Contact Information</span>
                <span className="block">Email</span>
                <span className="block">contact@orjumedia.com</span>
                <span className="block mt-1">Phone</span>
                <span className="block">+420774900384</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ORJU MEDIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
