import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Cookies() {
  return (
    <div className="min-h-screen">
      <SEO title="Cookies Policy | Orju Media" description="Cookies policy for Orju Media" />
      <Navigation />
      <main className="container mx-auto pt-24 pb-24 px-4">
        <article className="prose lg:prose-xl max-w-none">
          <h1>Cookies Policy</h1>
          <p>
            <strong>Last updated:</strong> October 16, 2025
          </p>

          <p>
            This Cookies Policy explains what cookies are and how Orju Media
            (“Company,” “we,” “our,” or “us”) uses them. You should read this
            policy so you can understand what types of cookies we use, the
            information we collect using cookies, and how that information is used.
          </p>

          <p>
            Cookies do not typically contain any information that personally
            identifies a user, but personal information that we store about you
            may be linked to the information stored in and obtained from cookies.
            For further information on how we use, store, and keep your personal
            data secure, please see our <a href="/privacy">Privacy Policy</a>.
          </p>

          <p>
            We do not store sensitive personal information, such as mailing
            addresses or payment details, in the cookies we use.
          </p>

          <h2>1. Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            Words with initial capital letters have meanings defined under the
            following conditions. The following definitions shall have the same
            meaning regardless of whether they appear in singular or plural.
          </p>

          <h3>Definitions</h3>
          <p>For the purposes of this Cookies Policy:</p>
          <ul>
            <li>
              <strong>Company</strong> (referred to as either "the Company," "We," "Us," or "Our") refers to Orju Media.
            </li>
            <li>
              <strong>Cookies</strong> means small files that are placed on your computer, mobile device, or any other device by a website, containing details of your browsing history on that website among its many uses.
            </li>
            <li>
              <strong>Website</strong> refers to Orju Media, accessible from <a href="https://www.orjumedia.com">www.orjumedia.com</a>.
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.
            </li>
          </ul>

          <h2>2. The Use of Cookies</h2>
          <h3>Types of Cookies We Use</h3>
          <p>Cookies can be Persistent or Session cookies.</p>
          <ul>
            <li><strong>Persistent Cookies</strong> remain on your device when you go offline.</li>
            <li><strong>Session Cookies</strong> are deleted as soon as you close your web browser.</li>
          </ul>

          <p>We use both session and persistent cookies for the purposes set out below:</p>

          <h3>a. Necessary / Essential Cookies</h3>
          <ul>
            <li><strong>Type:</strong> Session Cookies</li>
            <li><strong>Administered by:</strong> Us</li>
            <li><strong>Purpose:</strong> These cookies are essential to provide you with services available through the Website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these cookies, the services you have asked for cannot be provided.</li>
          </ul>

          <h3>b. Functionality Cookies</h3>
          <ul>
            <li><strong>Type:</strong> Persistent Cookies</li>
            <li><strong>Administered by:</strong> Us</li>
            <li><strong>Purpose:</strong> These cookies allow us to remember choices you make when you use the Website, such as remembering your language preference. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re enter your preferences every time you use the Website.</li>
          </ul>

          <h2>3. Your Choices Regarding Cookies</h2>
          <p>
            If you prefer to avoid the use of cookies on the Website, you must first disable cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option to prevent the use of cookies at any time.
          </p>

          <p>
            If you do not accept our cookies, you may experience some inconvenience in your use of the Website, and some features may not function properly.
          </p>

          <p>
            If you’d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your browser:
          </p>
          <ul>
            <li>Google Chrome</li>
            <li>Microsoft Internet Explorer</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
          </ul>
          <p>For any other web browser, please visit your browser’s official support pages.</p>

          <h2>4. More Information about Cookies</h2>
          <p>You can learn more about cookies here: <a href="https://www.allaboutcookies.org/">All About Cookies</a>.</p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Cookies Policy, you can contact us:
            <br />
            Email: <a href="mailto:support@orjumedia.com">support@orjumedia.com</a>
            <br />
            Website: <a href="https://www.orjumedia.com">www.orjumedia.com</a>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
