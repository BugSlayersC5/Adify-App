import React from 'react';
import { Shield, Users, FileText, AlertTriangle } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

export default function TermsAndConditionsPage ()  {
  const sections = [
    {
      icon: FileText,
      title: 'Terms of Service',
      content: [
        'By using AdMarket, you agree to comply with these terms and conditions.',
        'You must be at least 18 years old to use our services.',
        'You are responsible for maintaining the confidentiality of your account.',
        'We reserve the right to suspend or terminate accounts that violate our terms.',
      ],
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'Provide accurate and truthful information in your advertisements.',
        'Respect other users and maintain professional communication.',
        'Do not post illegal, harmful, or inappropriate content.',
        'Report any suspicious activity or violations to our support team.',
      ],
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      content: [
        'We protect your personal information according to our Privacy Policy.',
        'Your data is encrypted and stored securely on our servers.',
        'We do not sell or share your personal information with third parties.',
        'You can request deletion of your account and data at any time.',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      content: [
        'Posting false, misleading, or fraudulent advertisements.',
        'Attempting to circumvent our security measures or policies.',
        'Harassing, threatening, or abusing other users.',
        'Using the platform for illegal activities or transactions.',
      ],
    },
  ];

  return (
     <section>
      <Navbar />
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Please read these terms carefully before using our platform
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: January 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="card mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to AdMarket
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms and Conditions ("Terms") govern your use of the AdMarket platform and services. 
              By accessing or using our platform, you agree to be bound by these Terms. If you do not agree 
              with any part of these terms, you may not use our services.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="card">
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Intellectual Property
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                All content on AdMarket, including logos, text, graphics, and software, 
                is the property of AdMarket or its licensors and is protected by copyright 
                and other intellectual property laws.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                AdMarket shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of the platform 
                or any transactions conducted through it.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Dispute Resolution
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Any disputes arising from these terms will be resolved through binding 
                arbitration in accordance with the rules of the American Arbitration 
                Association.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be 
                notified of significant changes via email or platform notifications.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card mt-12">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about these Terms and Conditions, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:legal@admarket.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                legal@admarket.com
              </a>
              <span className="hidden sm:block text-gray-400">•</span>
              <a
                href="tel:+15551234567"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Acceptance */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>By using AdMarket, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms and Conditions.</strong>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    
   

    </section>
  
  );
};


