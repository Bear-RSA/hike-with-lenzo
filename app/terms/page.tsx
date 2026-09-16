import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: `The terms on which ${site.name} offers guided hikes in Cape Town.`,
};

const UPDATED = "16 September 2026";

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms" title="Terms & conditions" updated={UPDATED}>
      <h2>1. About these terms</h2>
      <p>
        These terms apply to every guided hike arranged through {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;the guide&rdquo;) and to your use of this website. By sending an enquiry, confirming a booking or joining
        a hike, you agree to them on behalf of yourself and anyone you book for. If you do not agree, please do not
        book.
      </p>

      <h2>2. Enquiries and bookings</h2>
      <ul>
        <li>An enquiry through this site is not a booking. A hike is confirmed only once we have replied with a date,
          start time and price and you have accepted in writing (email or WhatsApp).</li>
        <li>Prices shown on the site are indicative. The confirmed price depends on the route, group size, duration and
          any park or cable-car fees, and will be stated in our reply.</li>
        <li>Unless we agree otherwise, payment is due before the hike starts. We will tell you the accepted payment
          methods when we confirm.</li>
        <li>Park entry, conservation and cable-car fees charged by SANParks, Kirstenbosch or the Table Mountain Aerial
          Cableway are payable by you unless our quote says they are included.</li>
      </ul>

      <h2>3. Cancellations and changes</h2>
      <ul>
        <li><strong>By you:</strong> cancel 48 hours or more before the start time for a full refund of any amount paid.
          Cancellations within 48 hours, or no-shows, are charged in full. You may transfer a booking to another date
          once, free of charge, subject to availability.</li>
        <li><strong>By us:</strong> mountain weather changes quickly. If the guide judges conditions unsafe (wind, cloud,
          rain, fire, closures), we may change the route, shorten the hike, move the start time or cancel. If we
          cancel, you may choose a new date or a full refund. We are not liable for other costs you incur (travel,
          accommodation and so on).</li>
        <li>If you arrive late, the guide may shorten the route so the group returns at the planned time. Arriving more
          than 30 minutes late without notice is treated as a no-show.</li>
      </ul>

      <h2>4. Your fitness, health and honesty</h2>
      <p>
        Hiking on the Cape Peninsula involves steep ground, loose rock, exposure to heights, heat, wind and sudden
        weather. You must:
      </p>
      <ul>
        <li>Give an honest picture of your fitness and experience when you enquire, so we can recommend a suitable route.</li>
        <li>Tell the guide before the hike of any medical condition, injury, allergy, medication or pregnancy that could
          affect you on the mountain, and carry any medication you need (for example, an inhaler or EpiPen).</li>
        <li>Not join a hike under the influence of alcohol or drugs.</li>
        <li>Bring what we ask you to bring — in particular enough water, closed shoes with grip, sun protection and a
          windproof layer.</li>
      </ul>
      <p>
        The guide may decline to take, or may turn back with, anyone who is unfit, unwell, inadequately equipped or
        unsafe to continue. No refund is due in that case.
      </p>

      <h2>5. Following the guide</h2>
      <p>
        On the mountain the guide&rsquo;s decisions on route, pace, breaks and turning back are final. You agree to
        stay with the group, follow instructions, keep to the path and not attempt sections the guide has ruled out.
        Anyone who repeatedly ignores instructions may be asked to leave the hike at the nearest safe exit.
      </p>

      <h2>6. Assumption of risk and liability</h2>
      <ul>
        <li>You acknowledge that hiking carries inherent risks — including slips, falls, rockfall, weather, wildlife,
          dehydration, exhaustion and, on some routes, exposure to serious heights — that cannot be eliminated even with
          a competent guide. You take part voluntarily and accept those risks.</li>
        <li>To the fullest extent the law allows, we are not liable for any injury, illness, death, loss or damage
          arising from those inherent risks, from your own actions or omissions, from the actions of third parties, or
          from events outside our control.</li>
        <li>Nothing in these terms excludes liability for gross negligence or wilful misconduct, or limits any right you
          have under the Consumer Protection Act 68 of 2008 that cannot lawfully be excluded.</li>
        <li>We strongly recommend that you hold personal accident and, for visitors, travel and medical insurance
          covering hiking. Mountain rescue in South Africa is provided by volunteers, but medical evacuation and
          treatment may be charged to you.</li>
      </ul>

      <h2>7. Children and groups</h2>
      <ul>
        <li>Hikers under 18 must be accompanied by a parent or guardian, who accepts these terms on their behalf and is
          responsible for them throughout.</li>
        <li>The person who makes a group booking confirms that they are authorised to accept these terms for everyone in
          the group and will share the &ldquo;what to bring&rdquo; and health information with them.</li>
      </ul>

      <h2>8. Photos</h2>
      <p>
        The guide may take photos during the hike and will share them with the group. We would love to use some on
        this site or social media, but will only do so with your permission, which you can give or withhold on the
        day and withdraw at any time by emailing us.
      </p>

      <h2>9. The mountain</h2>
      <p>
        All routes lie within Table Mountain National Park or neighbouring reserves and are subject to SANParks rules,
        closures and fire bans. Please leave no trace: take all litter out, stay on paths and do not pick plants or
        disturb wildlife. Fines issued by park authorities for a hiker&rsquo;s own conduct are that hiker&rsquo;s
        responsibility.
      </p>

      <h2>10. This website</h2>
      <ul>
        <li>Trail descriptions, distances, times and difficulty ratings are provided in good faith as a guide only.
          Conditions change; do not rely on them to hike unguided.</li>
        <li>Content on this site belongs to us or our licensors and may not be reproduced without permission. Trail
          photographs used as placeholders are credited to their photographers via Unsplash.</li>
        <li>We may change the site or these terms at any time. The date at the top shows the latest version.</li>
      </ul>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of South Africa. Any dispute will be subject to the
        jurisdiction of the courts of the Western Cape, without prejudice to your right to approach the National
        Consumer Commission or a consumer court.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.guide.email}`}>{site.guide.email}</a> or WhatsApp{" "}
        {site.guide.whatsapp}.
      </p>
    </LegalPage>
  );
}
