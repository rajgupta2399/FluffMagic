// components/Terms.tsx
import React from "react";

export default function page() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:my-20 my-16">
      <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
      <p className="text-sm mb-6">Last updated: April 27, 2025</p>

      <p className="mb-6">
        Please read these terms and conditions carefully before using Our Service.
      </p>

      <Section title="Interpretation and Definitions" />
      <SubSection title="Interpretation">
        <p>
          The words with capitalized initial letters have meanings defined below.
        </p>
      </SubSection>
      <SubSection title="Definitions">
        <ul className="list-disc pl-6">
          <li><strong>Affiliate</strong>: Entity controlling or controlled by a party (50%+ ownership).</li>
          <li><strong>Country</strong>: Delhi, India</li>
          <li><strong>Company</strong>: Printustaad, Delhi (the Company, We, Us, Our)</li>
          <li><strong>Device</strong>: Any device that can access the Service.</li>
          <li><strong>Service</strong>: The Website (Printustaad.com)</li>
          <li><strong>Terms and Conditions</strong>: These terms that form the full agreement.</li>
          <li><strong>Third-party Social Media Service</strong>: Services or content provided by a third party.</li>
          <li><strong>You</strong>: The user accessing or using the Service.</li>
        </ul>
      </SubSection>

      <Section title="Acknowledgment">
        <p>
          These Terms govern Your use of the Service and are a binding agreement between You and the Company.
          By accessing or using the Service, You agree to these Terms.
        </p>
        <p>You must be over 18 to use this Service.</p>
        <p>
          Your use is also governed by our{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>.
        </p>
      </Section>

      <Section title="Links to Other Websites">
        <p>
          We are not responsible for third-party websites or services linked from our site.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          We may suspend or terminate access to our Service at any time, without notice.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          Our liability is limited to the amount You paid or $100 USD, whichever is lower.
        </p>
        <p>We are not liable for indirect or consequential damages.</p>
      </Section>

      <Section title="AS IS and AS AVAILABLE Disclaimer">
        <p>
          The Service is provided without warranties. We do not guarantee uninterrupted service, accuracy, or virus-free experience.
        </p>
      </Section>

      <Section title="Governing Law">
        <p>These Terms are governed by the laws of Delhi, India.</p>
      </Section>

      <Section title="Dispute Resolution">
        <p>Please contact us first to try to resolve any disputes informally.</p>
      </Section>

      <Section title="EU & US Compliance">
        <p>
          If You are an EU resident, local consumer laws apply. For US users, You confirm you are not under US restrictions or sanctions.
        </p>
      </Section>

      <Section title="Severability and Waiver">
        <p>
          If any term is invalid, the rest remain enforceable. No waiver applies unless explicitly stated.
        </p>
      </Section>

      <Section title="Translation">
        <p>
          If these Terms were translated, the English version shall prevail in case of disputes.
        </p>
      </Section>

      <Section title="Changes to Terms">
        <p>
          We may update these Terms. Material changes will be notified 30 days in advance.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>If you have any questions:</p>
        <ul className="list-disc pl-6">
          <li>Email: <a href="mailto:printustaadofficial@gmail.com" className="text-blue-600 underline">printustaadofficial@gmail.com</a></li>
        </ul>
      </Section>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="text-xl font-medium mb-1">{title}</h3>
    {children}
  </div>
);
