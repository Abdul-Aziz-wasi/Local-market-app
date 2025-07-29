import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">📄 Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing and using our Local Market Price Tracker website, you agree to be bound by these
          Terms and Conditions. If you do not agree with any part, you must discontinue use of the site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
        <p>
          Users must provide accurate information and avoid using the platform for any unlawful purposes.
          Any misuse may result in account suspension or legal action.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Accuracy</h2>
        <p>
          While we strive to provide accurate price data, we do not guarantee 100% accuracy due to
          real-time changes in market conditions. Always verify prices before making purchases.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payment and Security</h2>
        <p>
          All payment transactions are securely processed through Stripe. We do not store your payment
          information. Ensure your browser is secure during checkout.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
        <p>
          All content, branding, and data on this site are the intellectual property of the website owners.
          You may not reproduce or redistribute any material without written consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Modifications</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time. Continued use of the site
          constitutes your acceptance of any changes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
        <p>
          For any questions or concerns about these terms, please contact us at:{' '}
          <a href="mailto:support@kanchabazar.com" className="text-teal-600 underline">
            support@kanchabazar.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
