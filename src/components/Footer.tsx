import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-16 mt-16">
      <div className="container mx-auto px-6">
        {/* Single row divided into left and right sections */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section: ORJU MEDIA, Company, Services */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="md:flex-1 mb-6 md:mb-0">
                <div className="mb-4">
                  <h3 className="text-lg font-bold flex items-center">
                    <img src="/favicon.png" alt="ORJU" className="w-6 h-6 inline-block mr-1" />
                    <span className="text-gradient">ORJU</span>
                    <span className="text-foreground">&nbsp;MEDIA</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">Turning stories into solutions</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">The people behind Diary of an OFW</p>
                </div>
              </div>
              <div className="md:flex-1 mb-6 md:mb-0">
                <h4 className="text-base font-semibold mb-4">Company</h4>
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
                  <li>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="md:flex-1 mb-6 md:mb-0">
                <h4 className="text-base font-semibold mb-4">Services</h4>
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
            </div>
          </div>

          {/* Right Section: Diary of an OFW */}
          <div className="flex-1 lg:border-l lg:border-border/50 lg:pl-12">
            <h4 className="text-base font-semibold mb-4">About Diary of an OFW</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Diary of an OFW is a media platform dedicated to sharing the stories, experiences, and voices of Overseas Filipino Workers around the world. We celebrate their resilience, document their journeys, and build a community that empowers and connects OFWs globally.
            </p>
            <div>
              <h5 className="text-sm font-semibold mb-3">DOAOFW Social Links</h5>
              <div className="flex flex-row items-center gap-3">
              <a href="https://www.facebook.com/diaryofanOFWofficial" target="_blank" rel="noopener noreferrer" aria-label="Diary of an OFW on Facebook" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-glow transform hover:-translate-y-1 hover:scale-105 transition">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.016 3.676 9.167 8.438 9.878V14.89h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.56v1.88h2.773l-.443 2.89h-2.33v6.988C18.324 21.167 22 17.016 22 12z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/diary_of_an_ofw/" target="_blank" rel="noopener noreferrer" aria-label="Diary of an OFW on Instagram" style={{ backgroundImage: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-glow transform hover:-translate-y-1 hover:scale-105 transition">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.163.46.347 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.163-1.26.347-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.163-.46-.347-1.26-.403-2.43C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.163 1.26-.347 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.167 0-3.546.012-4.797.069-1.033.049-1.59.218-1.96.363-.5.195-.857.43-1.234.806-.377.377-.61.735-.806 1.234-.145.37-.314.927-.363 1.96-.057 1.251-.069 1.63-.069 4.797s.012 3.546.069 4.797c.049 1.033.218 1.59.363 1.96.195.5.43.857.806 1.234.377.377.735.61 1.234.806.37.145.927.314 1.96.363 1.251.057 1.63.069 4.797.069s3.546-.012 4.797-.069c1.033-.049 1.59-.218 1.96-.363.5-.195.857-.43 1.234-.806.377-.377.61-.735.806-1.234.145-.37.314-.927.363-1.96.057-1.251.069-1.63.069-4.797s-.012-3.546-.069-4.797c-.049-1.033-.218-1.59-.363-1.96-.195-.5-.43-.857-.806-1.234-.377-.377-.735-.61-1.234-.806-.37-.145-.927-.314-1.96-.363-1.251-.057-1.63-.069-4.797-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              <a href="https://www.youtube.com/@diaryofanofw" target="_blank" rel="noopener noreferrer" aria-label="Diary of an OFW on YouTube" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FF0000] text-white shadow-glow transform hover:-translate-y-1 hover:scale-105 transition">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a2.993 2.993 0 0 0-2.11-2.116C19.48 3.5 12 3.5 12 3.5s-7.48 0-9.388.57A2.993 2.993 0 0 0 .502 6.186C0 8.13 0 12 0 12s0 3.87.502 5.814a2.993 2.993 0 0 0 2.11 2.116C4.52 20.5 12 20.5 12 20.5s7.48 0 9.388-.57a2.993 2.993 0 0 0 2.11-2.116C24 15.87 24 12 24 12s0-3.87-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>

              <a href="https://open.spotify.com/show/5oJDj8gVSPa87Mds6Oe9ty" target="_blank" rel="noopener noreferrer" aria-label="Diary of an OFW on Spotify" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1DB954] text-white shadow-glow transform hover:-translate-y-1 hover:scale-105 transition">
                <svg className="w-4 h-4 text-white" viewBox="0 0 168 168" fill="currentColor" aria-hidden="true">
                  <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm36.9 120.3c-1.6 2.6-4.9 3.6-7.6 2-20.8-12.7-47-15.6-77.8-8.4-3 0.8-6-1-6.9-3.9-0.8-2.9.6-6 3.6-7.7 35.8-18.8 66.9-15 91.1 5.9 2.7 2.5 3.1 6.8 1.6 9.9zM126 95.2c-2 3.2-6 4.3-9.2 2.3-24.2-15-61-19.4-89.3-10.4-3.5 1.1-7.2-0.9-8.3-4.4-1.1-3.5.9-7.2 4.4-8.3 32.8-10.6 75.8-6 103.1 12.2 3.2 2 4.2 6 2.3 9.1zM126.5 71.3c-28.4-16.6-80.5-18.1-106.6-9.7-4 1.4-8.3-.8-9.7-4.9s.8-8.3 4.9-9.7c30.9-10.6 88.6-9 121.1 11.1 4 2.3 5.3 7.4 3 11.3-2.3 3.9-7.4 5.2-11.7 2.9z" />
                </svg>
              </a>

              <a href="https://www.tiktok.com/@diary.of.an.ofw?_d=secCgYIASAHKAESPgo8KKVOzdq2py0hfcUqO2sexYFw6EoTmdxiFZQGAY9tWF7clcEyXn26SmkqAjAugeL5cYm2b899gd0gE1uGGgA%3D&_r=1&object_id=7538904547453666326&page_open_method=scan_code&schema_type=4&sec_uid=MS4wLjABAAAAnPvzQsX7aytEyivTZDuLfxhzaxMMWayczr3M5NA42q96wJKFZy28hrzTvtSjvSZB&share_app_id=1180&share_author_id=7538904547453666326&share_uid=7538904547453666326&tt_from=scan_code&utm_campaign=client_scan_code&utm_medium=2&utm_source=scan_code" target="_blank" rel="noopener noreferrer" aria-label="Diary of an OFW on TikTok" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(45deg,#69C9D0,#EE1D52)' }}>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.5 3h2.1c0 .2.1.4.1.6 0 1.8.6 3.5 1.7 4.9 1.2 1.4 2.9 2.3 4.7 2.6v1.9c-2.2-.4-4.2-1.6-5.6-3.4-1.2-1.6-1.8-3.5-1.9-5.5h-1.1V16c0 2.8-2.2 5-5 5-2.8 0-5-2.2-5-5s2.2-5 5-5c.3 0 .7 0 1 .1V5.5c-.3 0-.7 0-1 0-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V6h.5z" />
                </svg>
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p className="mb-3 text-sm">&copy; {new Date().getFullYear()} ORJU MEDIA. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-sm flex-wrap">
            <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Privacy</Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/cookies" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Cookies</Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/copyright" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Copyright</Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/shipping" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Shipping &amp; Returns</Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
