
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: May 13, 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  At rentinlondon, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or any other services we offer (collectively, the "Services").
                </p>
                <p className="mt-4">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our Services.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-medium mt-6 mb-3">Personal Information</h3>
                <p>
                  We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and Services, participate in activities on our Services, or otherwise contact us. The personal information we collect may include:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Name and contact details (email address, phone number, etc.)</li>
                  <li>Account credentials</li>
                  <li>Billing and payment information</li>
                  <li>Property preferences and search history</li>
                  <li>Any other information you choose to provide</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Automatically Collected Information</h3>
                <p>
                  When you access our Services, we may automatically collect certain information about your device and usage of our Services, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent on pages, links clicked)</li>
                  <li>Location data (if you allow us to access your location)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p>
                  We may use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Providing, maintaining, and improving our Services</li>
                  <li>Processing transactions and sending transactional messages</li>
                  <li>Responding to your inquiries and providing customer support</li>
                  <li>Sending you marketing communications (subject to your preferences)</li>
                  <li>Personalizing your experience and tailoring content</li>
                  <li>Analyzing usage patterns to improve our Services</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">4. Information Sharing</h2>
                <p>
                  We may share your information with third parties in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>With service providers who perform services on our behalf</li>
                  <li>With landlords, tenants, or agents when necessary to facilitate rental transactions</li>
                  <li>With your consent or at your direction</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>In connection with a business transaction (e.g., merger or acquisition)</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Services and to maintain certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">7. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Accessing, correcting, or deleting your personal information</li>
                  <li>Withdrawing consent for processing your information</li>
                  <li>Objecting to processing of your information</li>
                  <li>Restricting processing of your information</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us using the information provided at the end of this Privacy Policy.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
                <p>
                  Our Services are not directed to children under 18 years of age, and we do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18, we will take steps to delete such information as soon as possible.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-4">
                  rentinlondon<br />
                  123 Rental Street<br />
                  Kensington<br />
                  London, W8 6EF<br />
                  United Kingdom<br />
                  privacy@rentinlondon.com
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

export default PrivacyPage;
