import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
};

const UPDATED = "16 September 2026";

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy" title="Privacy policy" updated={UPDATED}>
      <h2>Who we are</h2>
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a guided-hiking service operated by {site.guide.fullName} in Cape
        Town, South Africa. We are the &ldquo;responsible party&rdquo; for your personal information under the Protection
        of Personal Information Act 4 of 2013 (&ldquo;POPIA&rdquo;). You can reach us at{" "}
        <a href={`mailto:${site.guide.email}`}>{site.guide.email}</a> or on WhatsApp at {site.guide.whatsapp}.
      </p>

      <h2>What we collect</h2>
      <p>We only collect what you give us through the enquiry form or by contacting us directly:</p>
      <ul>
        <li>Your name and email address</li>
        <li>Your phone or WhatsApp number, if you choose to share it</li>
        <li>The trail you are interested in, your preferred date, group size and a self-described fitness level</li>
        <li>Anything you write in the message field (for example, medical or dietary needs you want the guide to know about)</li>
      </ul>
      <p>
        We do not use analytics cookies, advertising trackers or third-party pixels on this site. The site does not
        set cookies for visitors.
      </p>

      <h2>Why we collect it</h2>
      <ul>
        <li>To reply to your enquiry and arrange a hike</li>
        <li>To plan a safe outing — group size, fitness and any needs you mention affect the route we recommend</li>
        <li>To contact you on the day if plans change (weather, closures, delays)</li>
        <li>To keep a record of bookings for our own accounts and, where required, to comply with the law</li>
      </ul>
      <p>
        Our lawful basis under POPIA is that processing is necessary to take steps at your request before entering
        into, and then to perform, a contract with you. Any health information you volunteer is treated as special
        personal information and is used solely to keep you safe on the trail. You may share it or not.
      </p>

      <h2>Who sees it</h2>
      <ul>
        <li>
          <strong>Lenzo</strong> — your enquiry is emailed directly to him and he handles it personally.
        </li>
        <li>
          <strong>Resend</strong> (resend.com) — the email delivery service that sends your enquiry to us and a
          confirmation to you. Resend processes the message content and your email address on our behalf.
        </li>
        <li>
          <strong>Vercel</strong> — the hosting provider that serves this website and processes the form request.
        </li>
        <li>
          <strong>Emergency services</strong> — in an emergency on the mountain we may share your name and relevant
          medical information with Wilderness Search and Rescue, SANParks or medical responders.
        </li>
      </ul>
      <p>We never sell, rent or trade your information, and we do not share it with marketers.</p>

      <h2>Where it is stored</h2>
      <p>
        Enquiries live in our email inbox and, for a limited period, in Resend&rsquo;s delivery logs. These providers
        may store data outside South Africa (for example in the United States or the European Union). We only use
        providers who apply safeguards equivalent to those required by POPIA.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries and booking correspondence for up to three years after your last contact with us, so we can
        answer follow-ups and meet our record-keeping obligations. If you never book, you can ask us to delete your
        enquiry at any time.
      </p>

      <h2>Your rights</h2>
      <p>Under POPIA you have the right to:</p>
      <ul>
        <li>Ask what personal information we hold about you and receive a copy</li>
        <li>Ask us to correct or delete it</li>
        <li>Object to processing, or withdraw consent where processing is based on consent</li>
        <li>
          Lodge a complaint with the Information Regulator of South Africa (
          <a href="https://inforegulator.org.za" target="_blank" rel="noreferrer">
            inforegulator.org.za
          </a>
          )
        </li>
      </ul>
      <p>
        To exercise any of these, email <a href={`mailto:${site.guide.email}`}>{site.guide.email}</a>. We will
        respond within a reasonable time and, in any case, within the periods set by POPIA.
      </p>

      <h2>Security</h2>
      <p>
        The form is submitted over HTTPS, the site includes basic spam protection, and access to the inbox that
        receives enquiries is password-protected. No method of transmission is perfectly secure, but we take
        reasonable steps to protect your information.
      </p>

      <h2>Children</h2>
      <p>
        Enquiries must be made by an adult (18 or older). If you are booking for children, you are responsible for
        the information you share about them.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The date at the top tells you when it last changed. Continued
        use of the site after a change means you accept the updated policy.
      </p>
    </LegalPage>
  );
}
