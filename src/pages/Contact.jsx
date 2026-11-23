import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, MessageSquare, Send } from 'lucide-react';

const FAQS = [
  {
    q: 'Can the kitchen design be tailored to my space?',
    a: 'Yes. The design conversation starts with your room, its dimensions, and the way you want the kitchen to work.',
  },
  {
    q: 'Can I discuss a kitchen wardrobe as part of my project?',
    a: 'Absolutely. Share your kitchen and storage needs together so both can be considered as part of the overall design.',
  },
  {
    q: 'What should I bring to an initial consultation?',
    a: 'A floor plan or room dimensions, a few reference images, and a sense of your priorities are a helpful place to start.',
  },
  {
    q: 'How does the design process begin?',
    a: 'Start by telling us about your space and what matters to you. From there, the project can explore layout, storage, and finish direction.',
  },
];

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: 'Modular kitchen',
    requirements: location.state?.interest
      ? `I would like to discuss ${location.state.interest}.`
      : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const updateForm = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="contact-page min-h-screen font-sans py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-[#9A7410] font-medium block mb-3"
          >
            Your space, thoughtfully reimagined
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light mb-5 tracking-tight"
          >
            Let’s talk kitchens
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed text-base md:text-lg"
          >
            Tell us about your space, your plans, and the details that matter to
            you. Begin a conversation about an ALTEZZA kitchen or kitchen wardrobe.
          </motion.p>
          <div className="h-[2px] w-16 bg-[#C5A059] mx-auto mt-8 opacity-70" />
        </header>

        <section className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          <aside className="lg:col-span-5 bg-white p-8 md:p-10 border border-black/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7410] block mb-2">
                A considered beginning
              </span>
              <h2 className="text-2xl md:text-3xl font-serif mb-6">Your project, your way of living</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Every home has its own rhythm. Share what you are planning and
                we can begin exploring a kitchen layout, useful storage, and
                finishes that feel right for your space.
              </p>

              <div className="space-y-5 border-t border-gray-100 pt-7">
                {[
                  'A modular kitchen designed around your room',
                  'Kitchen wardrobe and storage planning',
                  'Materials, finishes, and design details',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-medium mt-10 hover:text-[#9A7410] transition-colors">
              Explore kitchen designs <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-black/5">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="notice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="min-h-[400px] flex flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div className="w-16 h-16 border border-[#C5A059]/40 flex items-center justify-center text-[#9A7410] mb-6">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif mb-4">Enquiry form preview</h2>
                  <p className="text-gray-600 text-sm max-w-md leading-relaxed mb-8">
                    This website preview is not connected to an enquiry service,
                    so your details have not been sent. Connect the form to your
                    preferred inbox or form provider before publishing.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-7 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9A7410] transition-colors"
                  >
                    Return to form
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                >
                  <div className="flex justify-between items-baseline mb-6 gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7410] block mb-1">Design consultation</span>
                      <h2 className="text-2xl font-serif">Tell us about your project</h2>
                    </div>
                    <span className="text-xs text-gray-400 font-light shrink-0">* Required</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      First name *
                      <input
                        required
                        autoComplete="given-name"
                        type="text"
                        value={formData.firstName}
                        onChange={(event) => updateForm('firstName', event.target.value)}
                        className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Last name *
                      <input
                        required
                        autoComplete="family-name"
                        type="text"
                        value={formData.lastName}
                        onChange={(event) => updateForm('lastName', event.target.value)}
                        className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Email *
                      <input
                        required
                        autoComplete="email"
                        type="email"
                        value={formData.email}
                        onChange={(event) => updateForm('email', event.target.value)}
                        className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Phone (optional)
                      <input
                        autoComplete="tel"
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => updateForm('phone', event.target.value)}
                        className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </label>
                  </div>

                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    What are you planning?
                    <select
                      value={formData.projectType}
                      onChange={(event) => updateForm('projectType', event.target.value)}
                      className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] transition-colors"
                    >
                      <option>Modular kitchen</option>
                      <option>Kitchen wardrobe</option>
                      <option>Kitchen and wardrobe</option>
                      <option>Design professional collaboration</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>

                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    A little about your space *
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your plans, priorities, and any details that would help us understand your project."
                      value={formData.requirements}
                      onChange={(event) => updateForm('requirements', event.target.value)}
                      className="mt-2 w-full bg-[#FAF8F5] border border-black/10 px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C5A059] transition-colors resize-y"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] hover:bg-[#9A7410] text-white py-4 font-semibold tracking-widest uppercase text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Preview enquiry <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    This form is a preview and does not send or store your details.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="bg-white p-8 md:p-12 border border-black/5">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7410] block mb-2">A few helpful details</span>
            <h2 className="text-3xl font-serif">Frequently asked questions</h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-100">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
                  >
                    <span className="text-base font-serif group-hover:text-[#9A7410] transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#9A7410]' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-600 font-light leading-relaxed pt-2 pb-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
