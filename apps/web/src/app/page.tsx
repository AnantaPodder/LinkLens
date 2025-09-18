'use client';

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import ShortenUrl from '@/components/links/ShortenUrl';

export default function HomePage() {
  // const [url, setUrl] = useState('');
  // const [shortUrl, setShortUrl] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [copyButtonText, setCopyButtonText] = useState('Copy');

  // const handleShorten = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!url) return;

  //   setIsLoading(true);
  //   // Simulate API call - replace with actual API call later
  //   setTimeout(() => {
  //     setShortUrl(`https://lnks.ly/${Math.random().toString(36).substr(2, 8)}`);
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // const handleCopyToClipBoard = async () => {
  //   await navigator.clipboard.writeText(shortUrl);
  //   setCopyButtonText('Copied!');
  //   setTimeout(() => setCopyButtonText('Copy'), 2000);
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                Link<span className="text-blue-600">Lens</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                Transform your long URLs into short, trackable links with
                powerful analytics and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Get Started Free
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                  View Demo
                </button>
              </div>
            </div>

            {/* URL Shortener Form */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
              <ShortenUrl />

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-4xl mb-4">🔗</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    URL Shortening
                  </h3>
                  <p className="text-gray-600">
                    Create short, memorable links from long URLs with custom
                    aliases
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track clicks, locations, devices, and user behavior in
                    real-time
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Custom Branding
                  </h3>
                  <p className="text-gray-600">
                    Create branded short links with custom domains and aliases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose LinkLens?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides everything you need to manage, track, and
                optimize your links
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Get shortened URLs instantly with our optimized infrastructure
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Global CDN
                </h3>
                <p className="text-gray-600">
                  Fast redirects worldwide with our global content delivery
                  network
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Mobile Optimized
                </h3>
                <p className="text-gray-600">
                  Perfect experience on all devices with responsive design
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  API Integration
                </h3>
                <p className="text-gray-600">
                  Powerful REST API for seamless integration with your
                  applications
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Premium Features
                </h3>
                <p className="text-gray-600">
                  Advanced features like QR codes, expiry dates, and password
                  protection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust LinkLens for their URL
              shortening needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
