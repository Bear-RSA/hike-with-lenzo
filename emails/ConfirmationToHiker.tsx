import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { site } from "@/lib/site.config";

type Props = {
  firstName: string;
  trailName: string;
  groupSize: number;
};

const navy = "#32364F";
const gold = "#E3BB47";
const mist = "#E9EAEF";
const ink = "#2C2A30";
const slate = "#9496A1";

export default function ConfirmationToHiker({ firstName, trailName, groupSize }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Got it — Lenzo will be in touch about {trailName} within {site.replyWithin}</Preview>
      <Body style={{ backgroundColor: mist, fontFamily: "Inter, Helvetica, Arial, sans-serif", margin: 0, padding: "24px 12px" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 16, overflow: "hidden" }}>
          <Section style={{ backgroundColor: navy, padding: "28px", textAlign: "center" }}>
            <Text style={{ color: gold, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: 0, fontWeight: 700 }}>
              {site.name}
            </Text>
            <Heading as="h1" style={{ color: "#fff", fontSize: 26, margin: "8px 0 0", fontWeight: 700 }}>
              Boots on. Enquiry received.
            </Heading>
          </Section>

          <Section style={{ padding: "28px" }}>
            <Text style={{ color: ink, fontSize: 16, lineHeight: "26px", margin: "0 0 16px" }}>
              Hi {firstName},
            </Text>
            <Text style={{ color: ink, fontSize: 16, lineHeight: "26px", margin: "0 0 16px" }}>
              Thanks for reaching out about <strong>{trailName}</strong> for{" "}
              {groupSize === 1 ? "one hiker" : `${groupSize} hikers`}. Lenzo reads every
              enquiry himself and will reply within {site.replyWithin} with availability,
              a suggested start time and a price.
            </Text>
            <Text style={{ color: ink, fontSize: 16, lineHeight: "26px", margin: "0 0 16px" }}>
              In a hurry? WhatsApp him on{" "}
              <Link href={site.guide.whatsappLink} style={{ color: navy, fontWeight: 600 }}>
                {site.guide.whatsapp}
              </Link>
              .
            </Text>
            <Text style={{ color: ink, fontSize: 16, lineHeight: "26px", margin: 0 }}>
              {site.tagline}
            </Text>
          </Section>

          <Section style={{ backgroundColor: mist, padding: "16px 28px" }}>
            <Text style={{ color: slate, fontSize: 12, margin: 0, lineHeight: "18px" }}>
              You&apos;re receiving this because you submitted an enquiry at {site.url}. If that
              wasn&apos;t you, just ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
