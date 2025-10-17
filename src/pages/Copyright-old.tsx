import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Copyright() {
  return (
    <div className="min-h-screen">
      <SEO title="Copyright Policy | Orju Media" description="Copyright policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-24 pb-24 px-4">
        <article className="prose lg:prose-xl max-w-none">
          <h1>Copyright Policy</h1>
          <p>
            <strong>Last updated:</strong> October 16, 2025
          </p>

          <p>
            At Orju Media, we respect the intellectual property rights of others and expect our users, customers, and partners to do the same. This Copyright Policy explains how our original content is protected, how it may be used, and the process for reporting copyright concerns.
          </p>

          <h2>1. Ownership of Content</h2>
          <ul>
            <li>All content on <a href="https://www.orjumedia.com">www.orjumedia.com</a>, including but not limited to text, graphics, logos, images, videos, audio, designs, branding elements, and digital products, is the property of Orju Media unless otherwise stated.</li>
            <li>Our content is protected under applicable copyright, trademark, and intellectual property laws in Czechia, the European Union, and internationally.</li>
            <li>Unauthorized reproduction, distribution, modification, or public display of our content without prior written consent is strictly prohibited.</li>
          </ul>

          <h2>2. Permitted Use</h2>
          <p>You may:</p>
          <ul>
            <li>View, download, and print content from our website for personal, non commercial use only.</li>
            <li>Share links to our website or content, provided attribution is given and the content is not altered.</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Copy, reproduce, or redistribute our content for commercial purposes.</li>
            <li>Use our branding, logos, or creative assets without express written permission.</li>
            <li>Claim ownership of any Orju Media content or present it as your own.</li>
          </ul>

          <h2>3. User Generated Content</h2>
          <p>
            If you submit or share content with Orju Media (e.g., testimonials, comments, or creative contributions), you grant us a non exclusive, royalty free, worldwide license to use, reproduce, and display that content in connection with our services and marketing.
          </p>
          <p>
            You are responsible for ensuring that any content you provide does not infringe on the rights of third parties.
          </p>

          <h2>4. Reporting Copyright Infringement</h2>
          <p>If you believe that material on our website infringes your copyright, please notify us by providing the following information:</p>
          <ol>
            <li>A description of the copyrighted work you claim has been infringed.</li>
            <li>A description of where the infringing material is located on our website.</li>
            <li>Your name, address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, made under penalty of perjury, that the information you provide is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.</li>
          </ol>
          <p>Send notices to: Email: <a href="mailto:support@orjumedia.com">support@orjumedia.com</a> | Website: <a href="https://www.orjumedia.com">www.orjumedia.com</a></p>

          <h2>5. Consequences of Infringement</h2>
          <ul>
            <li>We reserve the right to remove or disable access to any content alleged to be infringing.</li>
            <li>Repeat infringers may be restricted from accessing our website or services.</li>
            <li>We may pursue legal remedies for unauthorized use of our intellectual property.</li>
          </ul>

          <h2>6. Changes to This Policy</h2>
          <p>We may update this Copyright Policy from time to time. Updates will be posted on this page with a revised “Last Updated” date.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
