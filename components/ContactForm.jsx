'use client';

import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
};

export default function ContactForm({ contacts }) {
  const [contact] = contacts;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send message.');

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="page-shell font-mona">
      <div className="text-center mb-12">
        <h2 className="page-title mb-6">{contact.heading}</h2>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">{contact.intro}</p>
      </div>

      <div className="panel grid gap-12 p-6 md:grid-cols-2 sm:p-10">
        <div className="space-y-8 md:border-r md:border-white/10 md:pr-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6">{contact.infoHeading}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-300 transition-colors hover:text-white">
                <FaEnvelope className="h-5 w-5 text-[#8ba9ff]" aria-hidden="true" />
                <button type="button" className="cursor-pointer hover:underline" onClick={() => copyToClipboard(contact.email)}>
                  {contact.email}
                </button>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 transition-colors hover:text-white">
                <FaPhoneAlt className="h-5 w-5 text-[#8ba9ff]" aria-hidden="true" />
                <button type="button" className="cursor-pointer hover:underline" onClick={() => copyToClipboard(contact.phone)}>
                  {contact.phone}
                </button>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <FaMapMarkerAlt className="h-5 w-5 text-[#8ba9ff]" aria-hidden="true" />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">{contact.socialHeading}</h4>
            <div className="glass inline-flex gap-1 rounded-full p-1.5 text-2xl">
              {contact.socials.map((social) => {
                const Icon = socialIconMap[social.icon];

                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label={social.label}
                  >
                    {Icon ? <Icon aria-hidden="true" /> : social.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-lg font-semibold mb-2">{contact.responseHeading}</h4>
            <p className="text-sm text-slate-400">{contact.responseText}</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">{contact.formHeading}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="field resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="primary-button w-full gap-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-slate-950" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            {isSubmitted ? (
              <div role="status" className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-center">
                <h4 className="font-semibold text-emerald-200">✓ Message sent successfully</h4>
                <p className="mt-1 text-sm text-emerald-300">Thank you for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : null}

            {error ? (
              <div role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-center">
                <h4 className="font-semibold text-red-200">Message not sent</h4>
                <p className="mt-1 text-sm text-red-300">{error}</p>
                <button type="button" onClick={() => setError('')} className="mt-2 text-sm text-red-200 underline hover:text-white">
                  Dismiss
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
