import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Copyright as CopyrightIcon } from "lucide-react";

export default function Copyright() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-24 right-24 opacity-10 animate-pulse" style={{ animationDuration: '3s' }}>
          <CopyrightIcon className="w-32 h-32 text-blue-500" />
        </div>
        <div className="absolute bottom-28 left-20 opacity-8 animate-bounce" style={{ animationDuration: '4s' }}>
          <svg className="w-24 h-24 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <SEO title="Copyright Policy | Orju Media" description="Copyright policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-32 pb-24 px-6 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-6">
            <CopyrightIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Copyright Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Protecting our intellectual property and respecting the rights of others.
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
              At Orju Media, we respect the intellectual property rights of others and expect our users, customers, and partners to do the same. This Copyright Policy explains how our original content is protected, how it may be used, and the process for reporting copyright concerns.
            </p>
          </div>

          <h2 className="!mt-12 !mb-6 text-2xl">1. Ownership of Content</h2>
          <ul className="space-y-3 !my-4">
            <li>All content on <a href="https://www.orjumedia.com" className="text-primary hover:underline">www.orjumedia.com</a>, including but not limited to text, graphics, logos, images, videos, audio, designs, branding elements, and digital products, is the property of Orju Media unless otherwise stated.</li>
            <li>Our content is protected under applicable copyright, trademark, and intellectual property laws in Czechia, the European Union, and internationally.</li>
            <li>Unauthorized reproduction, distribution, modification, or public display of our content without prior written consent is strictly prohibited.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">2. Permitted Use</h2>
          <p className="!mb-4">You may:</p>
          <ul className="space-y-3 !my-4">
            <li>View, download, and print content from our website for personal, non commercial use only.</li>
            <li>Share links to our website or content, provided attribution is given and the content is not altered.</li>
          </ul>
          <p className="!my-6">You may not:</p>
          <ul className="space-y-3 !my-4">
            <li>Copy, reproduce, or redistribute our content for commercial purposes.</li>
            <li>Use our branding, logos, or creative assets without express written permission.</li>
            <li>Claim ownership of any Orju Media content or present it as your own.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">3. User Generated Content</h2>
          <p className="!my-6">
            If you submit or share content with Orju Media (e.g., testimonials, comments, or creative contributions), you grant us a non exclusive, royalty free, worldwide license to use, reproduce, and display that content in connection with our services and marketing.
          </p>
          <p className="!my-6">
            You are responsible for ensuring that any content you provide does not infringe on the rights of third parties.
          </p>

          <h2 className="!mt-12 !mb-6 text-2xl">4. Reporting Copyright Infringement</h2>
          <p className="!mb-4">If you believe that material on our website infringes your copyright, please notify us by providing the following information:</p>
          <ol className="space-y-3 !my-4">
            <li>A description of the copyrighted work you claim has been infringed.</li>
            <li>A description of where the infringing material is located on our website.</li>
            <li>Your name, address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, made under penalty of perjury, that the information you provide is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
          </ol>

          <h2 className="!mt-12 !mb-6 text-2xl">5. Consequences of Infringement</h2>
          <ul className="space-y-3 !my-4">
            <li>We reserve the right to remove or disable access to any content alleged to be infringing.</li>
            <li>Repeat infringers may be restricted from accessing our website or services.</li>
            <li>We may pursue legal remedies for unauthorized use of our intellectual property.</li>
          </ul>

          <h2 className="!mt-12 !mb-6 text-2xl">6. Changes to This Policy</h2>
          <p className="!my-6">We may update this Copyright Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.</p>

          <h2 className="!mt-12 !mb-6 text-2xl">7. Contact Us</h2>
          <div className="bg-card border border-border rounded-xl p-6 !my-8">
            <p className="!mb-2">
              For copyright notices or questions, please contact us:
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
