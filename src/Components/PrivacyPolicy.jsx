import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">🔐 Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p>
          We collect personal information such as your name, email address, profile photo, and market interactions 
          (e.g., reviews, purchases, watchlist) when you sign up or interact with our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>
          Your information is used to personalize your experience, process secure payments, display vendor listings, 
          and provide customer support. We do not sell your information to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Cookies and Tracking</h2>
        <p>
          We use cookies and local storage to remember your login status, preferences, and improve performance. 
          You can control cookies through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payment Security</h2>
        <p>
          All payments are processed securely through Stripe. We do not store or have access to your credit/debit 
          card details.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
        <p>
          We retain user data as long as your account remains active or as needed to provide services and comply 
          with legal obligations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You can request to view, update, or delete your personal information at any time. Contact us if you 
          wish to exercise these rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. You will be notified of significant changes through 
          the website or email.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy practices, please contact us at:{' '}
          <a href="mailto:privacy@kanchabazar.com" className="text-teal-600 underline">
            privacy@kanchabazar.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
