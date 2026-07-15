import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen text-gray-400">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="mb-8">Have questions about our real estate purchasing services? Reach out to us using the form or through our direct contact details below.</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-wealth-charcoal border border-white/10 rounded">
              <p className="font-bold text-white mb-1">Company</p>
              <p>998 Marketing LLC (dba Sovereign 998)</p>
            </div>
            
            <div className="p-4 bg-wealth-charcoal border border-white/10 rounded">
              <p className="font-bold text-white mb-1">Address</p>
              <p>1017 Plain Street, Newark, NY 14513, US</p>
            </div>
            
            <div className="p-4 bg-wealth-charcoal border border-white/10 rounded">
              <p className="font-bold text-white mb-1">Phone</p>
              <p>
                <a href="tel:+19394008306" className="text-wealth-gold hover:underline">+1 (939) 400-8306</a>
              </p>
            </div>
            
            <div className="p-4 bg-wealth-charcoal border border-white/10 rounded">
              <p className="font-bold text-white mb-1">Email</p>
              <p>
                <a href="mailto:prebay.inc@gmail.com" className="text-wealth-gold hover:underline">prebay.inc@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Send a Message</h2>
          {submitted ? (
            <div className="p-6 bg-wealth-gold/10 border border-wealth-gold/30 rounded text-wealth-gold">
              Thank you for reaching out. We will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-wealth-charcoal border border-white/10 p-3 text-white focus:border-wealth-gold focus:ring-1 focus:ring-wealth-gold outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-wealth-charcoal border border-white/10 p-3 text-white focus:border-wealth-gold focus:ring-1 focus:ring-wealth-gold outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-wealth-charcoal border border-white/10 p-3 text-white focus:border-wealth-gold focus:ring-1 focus:ring-wealth-gold outline-none transition-all"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 uppercase tracking-widest hover:bg-wealth-gold hover:text-white transition-colors"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
