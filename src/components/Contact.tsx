import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // FOOLPROOF SOLUTION: Web3Forms
      const accessKey = "2f68ac8b-0426-4c94-8dc3-1db3311ae254";

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Network error');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {status === 'success' && (
        <div className="fixed inset-0 z-50 bg-evergrow-dark flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">Thank You</h2>
          <p className="text-xl text-gray-400 max-w-md mb-10">
            Your message has been sent, we will be in touch.
          </p>
          <button 
            onClick={() => {
              setStatus('idle');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold rounded-full transition-all shadow-lg shadow-orange-900/20"
          >
            Return to Home
          </button>
        </div>
      )}
      <section id="contact" className="py-24 bg-evergrow-dark">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-medium tracking-wider text-sm uppercase mb-4 block">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-semibold mb-6">
            Start Your <span className="text-green-500">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Support starts with a simple conversation. Connect with us today to explore options for you or your loved one — and discover personalised support designed around your goals, preferences, and evolving needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-evergrow-card border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/20 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">Gold Coast, Queensland<br />Australia</p>
            </div>

            <a href="tel:+61402961486" className="p-8 rounded-2xl bg-evergrow-card border border-white/5 hover:border-yellow-500/50 transition-colors cursor-pointer block">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/20 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">0402 961 486</p>
            </a>

            <a href="mailto:info@evergrowsupportgroup.com" className="p-8 rounded-2xl bg-evergrow-card border border-white/5 hover:border-yellow-500/50 transition-colors cursor-pointer block">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/20 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-[11px] sm:text-sm whitespace-nowrap">info@evergrowsupportgroup.com</p>
            </a>

            <div className="p-8 rounded-2xl bg-evergrow-card border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hours</h3>
              <p className="text-gray-400 text-sm">24/7 Support Available</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:p-10 rounded-2xl bg-evergrow-card border border-white/5">
            <h3 className="text-2xl font-semibold text-white mb-8">Send us a message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Your name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-evergrow-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Ever Grow"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-evergrow-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="evergrow@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Phone number</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-evergrow-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0400 000 000"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Tell us about your support needs...</label>
                <textarea 
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-evergrow-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20 cursor-pointer"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-center">{errorMessage || 'Something went wrong. Please try again.'}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
