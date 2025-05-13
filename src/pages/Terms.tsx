
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: May 13, 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  Welcome to rentinlondon ("we," "our," or "us"). By accessing or using our website, mobile applications, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use our Services.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you are at least 18 years old and that you have the legal capacity to enter into a binding agreement with us.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
                <p>
                  To access certain features of our Services, you may need to create an account. When you create an account, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="mt-4">
                  You agree to immediately notify us of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">4. Property Listings</h2>
                <p>
                  Our Services allow landlords, property managers, and agents to list properties for rent. We do not own, control, or manage any of the properties listed on our platform.
                </p>
                <p className="mt-4">
                  We make no representations or warranties regarding the accuracy, completeness, legality, or suitability of any property listing. You acknowledge and agree that we are not responsible for any disputes, losses, or damages arising from property listings or transactions between users.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">5. User Conduct</h2>
                <p>
                  You agree not to use our Services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our Services or interfere with any other party's use of our Services.
                </p>
                <p className="mt-4">
                  You further agree not to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Post false, misleading, or deceptive content;</li>
                  <li>Impersonate any person or entity;</li>
                  <li>Harass, abuse, or harm another person;</li>
                  <li>Collect or store personal data about other users without their consent;</li>
                  <li>Use our Services for any illegal or unauthorized purpose;</li>
                  <li>Interfere with or disrupt our Services or servers;</li>
                  <li>Attempt to gain unauthorized access to our Services.</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
                <p>
                  Our Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by us, our licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, we exclude all liability for any loss, damage, cost, or expense, whether direct, indirect, incidental, special, consequential, or exemplary, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our Services.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">8. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our Services after such notice constitutes your acceptance of the modified Terms.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">9. Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at legal@rentinlondon.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
