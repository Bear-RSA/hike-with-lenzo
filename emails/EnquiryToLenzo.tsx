import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { Enquiry } from "@/lib/enquiry-schema";
import { fitnessLabel } from "@/lib/enquiry-schema";
import { site } from "@/lib/site.config";

type Props = {
  enquiry: Enquiry;
  trailName: string;
};

const navy = "#32364F";
const gold = "#E3BB47";
const mist = "#E9EAEF";
const ink = "#2C2A30";
const slate = "#9496A1";

export default function EnquiryToLenzo({ enquiry, trailName }: Props) {
  const date = enquiry.date
    ? new Date(enquiry.date + "T00:00:00").toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Flexible";

  return (
    <Html>
      <Head />
      <Preview>
        {enquiry.name} wants to hike {trailName} — {String(enquiry.groupSize)}{" "}
        {enquiry.groupSize === 1 ? "hiker" : "hikers"}
      </Preview>
      <Body style={{ backgroundColor: mist, fontFamily: "Inter, Helvetica, Arial, sans-serif", margin: 0, padding: "24px 12px" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 16, overflow: "hidden" }}>
          <Section style={{ backgroundColor: navy, padding: "22px 28px" }}>
            <Text style={{ color: gold, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: 0, fontWeight: 700 }}>
              New enquiry
            </Text>
            <Heading as="h1" style={{ color: "#fff", fontSize: 24, margin: "6px 0 0", fontWeight: 700 }}>
              {trailName}
            </Heading>
          </Section>

          <Section style={{ padding: "24px 28px 8px" }}>
            <Row label="Name" value={enquiry.name} />
            <Row label="Email" value={<Link href={`mailto:${enquiry.email}`} style={{ color: navy }}>{enquiry.email}</Link>} />
            {enquiry.phone ? (
              <Row label="Phone / WhatsApp" value={<Link href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`} style={{ color: navy }}>{enquiry.phone}</Link>} />
            ) : null}
            <Row label="Preferred date" value={date} />
            <Row label="Group size" value={`${enquiry.groupSize} ${enquiry.groupSize === 1 ? "hiker" : "hikers"}`} />
            <Row label="Fitness" value={fitnessLabel[enquiry.fitness]} />
          </Section>

          <Section style={{ padding: "0 28px 24px" }}>
            <Hr style={{ borderColor: mist, margin: "8px 0 16px" }} />
            <Text style={{ color: slate, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 6px", fontWeight: 700 }}>
              Message
            </Text>
            <Text style={{ color: ink, fontSize: 15, lineHeight: "24px", margin: 0, whiteSpace: "pre-wrap" }}>
              {enquiry.message}
            </Text>
          </Section>

          <Section style={{ backgroundColor: mist, padding: "16px 28px" }}>
            <Text style={{ color: slate, fontSize: 12, margin: 0, lineHeight: "18px" }}>
              Hit reply to answer {enquiry.name.split(" ")[0]} directly — replies go to their address.
              Sent from {site.name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
      <tbody>
        <tr>
          <td style={{ width: 150, color: slate, fontSize: 13, verticalAlign: "top", paddingTop: 2 }}>{label}</td>
          <td style={{ color: ink, fontSize: 15, fontWeight: 600 }}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}
