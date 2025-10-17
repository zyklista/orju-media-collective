import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Cookie } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-28 left-16 opacity-10 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <Cookie className="w-28 h-28 text-orange-500" />
        </div>
        <div className="absolute bottom-32 right-20 opacity-8 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <Cookie className="w-20 h-20 text-orange-400" />
        </div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Cookies Policy | Orju Media" description="Cookies policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-32 pb-24 px-6 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/10 mb-6">
            <Cookie className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Cookies Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn how we use cookies to enhance your browsing experience.
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-10">
            <p className="text-sm text-muted-foreground !mb-0">
              <strong>Last Updated:</strong> October 16, 2025
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              This Cookies Policy explains what cookies are and how Orju Media
              ("Company," "we," "our," or "us") uses them. You should read this
              policy so you can understand what types of cookies we use, the
              information we collect using cookies, and how that information is used.
            </p>

            <p className="text-lg leading-relaxed">
              Cookies do not typically contain any information that personally
              identifies a user, but personal information that we store about you
              may be linked to the information stored in and obtained from cookies.
              For further information on how we use, store, and keep your personal
              data secure, please see our <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>.
            </p>

            <p className="text-lg leading-relaxed">
              We do not store sensitive personal information, such as mailing
              addresses or payment details, in the cookies we use.
            </p>
          </div>

          <h2 className="!mt-12 !mb-6 text-2xl">1. Interpretation and Definitions</h2>
          <h3 className="!mt-8 !mb-4">Interpretation</h3>
          <p className="!mb-6">
            Words with initial capital letters have meanings defined under the
            following conditions. The following definitions shall have the same
            meaning regardless of whether they appear in singular or plural.
          </p>

          <h3 className="!mt-8 !mb-4">Definitions</h3>
          <p className="!mb-4">For the purposes of this Cookies Policy:</p>
          <ul className="space-y-3 !my-4">
            <li>
              <strong>Company</strong> (referred to as either "the Company," "We," "Us," or "Our") refers to Orju Media.
            </li>
            <li>
              <strong>Cookies</strong> means small files that are placed on your computer, mobile device, or any other device by a website, containing details of your browsing history on that website among its many uses.
            </li>
            <li>
              <strong>Website</strong> refers to Orju Media, accessible from <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a>.
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.
            </li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">2. The Use of Cookies</h2>
          <h3 className="!mt-8 !mb-4">Types of Cookies We Use</h3>
          <p className="!mb-4">Cookies can be Persistent or Session cookies.</p>
          <ul className="space-y-3 !my-4">
            <li><strong>Persistent Cookies</strong> remain on your device when you go offline.</li>
            <li><strong>Session Cookies</strong> are deleted as soon as you close your web browser.</li>
          </ul>

          <p className="!my-6">We use both session and persistent cookies for the purposes set out below:</p>

          <h3 className="!mt-8 !mb-4">a. Necessary / Essential Cookies</h3>
          <ul className="space-y-3 !my-4">
            <li><strong>Type:</strong> Session Cookies</li>
            <li><strong>Administered by:</strong> Us</li>
            <li><strong>Purpose:</strong> These cookies are essential to provide you with services available through the Website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these cookies, the services you have asked for cannot be provided.</li>
          </ul>

          <h3 className="!mt-8 !mb-4">b. Functionality Cookies</h3>
          <ul className="space-y-3 !my-4">
            <li><strong>Type:</strong> Persistent Cookies</li>
            <li><strong>Administered by:</strong> Us</li>
            <li><strong>Purpose:</strong> These cookies allow us to remember choices you make when you use the Website, such as remembering your language preference. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re enter your preferences every time you use the Website.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">3. Your Choices Regarding Cookies</h2>
          <p className="!my-6">
            If you prefer to avoid the use of cookies on the Website, you must first disable cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option to prevent the use of cookies at any time.
          </p>

          <p className="!my-6">
            If you do not accept our cookies, you may experience some inconvenience in your use of the Website, and some features may not function properly.
          </p>

          <p className="!mb-4">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your browser:
          </p>
          <ul className="space-y-3 !my-4">
            <li>Google Chrome</li>
            <li>Microsoft Internet Explorer</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
          </ul>
          <p className="!my-6">For any other web browser, please visit your browser's official support pages.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">4. More Information about Cookies</h2>
          <p className="!my-6">You can learn more about cookies here: <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a>.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">5. Contact Us</h2>
          <div className="bg-card border border-border rounded-xl p-6 !my-8">
            <p className="!mb-2">
              If you have any questions about this Cookies Policy, you can contact us:
            </p>
            <div className="space-y-1 text-sm mt-4">
              <p className="font-semibold">Orju Media</p>
              <p>Email: <a href="mailto:support@orjumedia.com" className="text-primary hover:underline">support@orjumedia.com</a></p>
              <p>Website: <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a></p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
