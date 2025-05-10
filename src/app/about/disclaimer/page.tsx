// components/pa.tsx
import React from 'react';

const page = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:my-20 my-16 ">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <Section title="Interpretation and Definitions" />
      <SubSection title="Interpretation">
        <p>
          The words of which the initial letter is capitalized have meanings defined under the following conditions.
          The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>
      </SubSection>
      <SubSection title="Definitions">
        <ul className="list-disc pl-6">
          <li>
            <strong>Company</strong> refers to Printustaad, Delhi.
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
          </li>
          <li>
            <strong>Website</strong> refers to Printustaad, accessible from Printustaad.com
          </li>
        </ul>
      </SubSection>

      <Section title="Disclaimer">
        <p>The information contained on the Service is for general information purposes only.</p>
        <p>
          The Company assumes no responsibility for errors or omissions in the contents of the Service.
        </p>
        <p>
          In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages...
        </p>
        <p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>
      </Section>

      <Section title="External Links Disclaimer">
        <p>
          The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company...
        </p>
      </Section>

      <Section title="Errors and Omissions Disclaimer">
        <p>
          The information given by the Service is for general guidance only. Even if the Company takes precautions...
        </p>
      </Section>

      <Section title="Fair Use Disclaimer">
        <p>
          The Company may use copyrighted material which has not always been specifically authorized...
        </p>
      </Section>

      <Section title="Views Expressed Disclaimer">
        <p>
          The Service may contain views and opinions which are those of the authors and do not necessarily reflect...
        </p>
      </Section>

      <Section title="No Responsibility Disclaimer">
        <p>
          The information on the Service is provided with the understanding that the Company is not herein engaged...
        </p>
      </Section>

      <Section title="Use at Your Own Risk Disclaimer">
        <p>
          All information in the Service is provided as is, with no guarantee of completeness, accuracy, timeliness...
        </p>
      </Section>

      <Section title="Contact Us">
        <p>If you have any questions about this Disclaimer, You can contact Us:</p>
        <p className="mt-2">
          By email: <a href="mailto:printustaadofficial@gmail.com" className="text-blue-600 underline">printustaadofficial@gmail.com</a>
        </p>
      </Section>
    </div>
  );
};

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

export default page;
