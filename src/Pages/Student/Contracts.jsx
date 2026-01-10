import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/Jahidsheikh-rgb", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/jahidsheikh", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/jahidsheikh", label: "Twitter" },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "service_41bcfur";   // Your EmailJS Service ID
    const TEMPLATE_ID = "template_bb6zbg3"; // Your Template ID
    const PUBLIC_KEY = "lCaWiHFHQBTQ28R8L"; // Your Public Key

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: "jahidsheikhjdp@gmail.com" // Recipient Gmail
      },
      PUBLIC_KEY
    )
    .then(() => {
      setLoading(false);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      setLoading(false);
      console.error("EmailJS error:", error);
      alert("Oops! Check Service/Template/Public Key and Gmail settings.");
    });
  };

  return (
    <section className="relative py-28 bg-base-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h3 className="text-primary font-mono tracking-widest mb-2">CONTACT</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">Send me a message directly or reach me via social links.</p>
        </motion.div>

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg border border-white/10">
          
          {/* Left: Photo & Social */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <img src="https://via.placeholder.com/150" alt="Your Photo" className="w-40 h-40 rounded-full shadow-lg border-4 border-primary"/>
            <div className="flex gap-6 mt-4">
              {socialLinks.map((link, idx) => (
                <motion.a key={idx} href={link.url} target="_blank" rel="noreferrer" whileHover={{ scale: 1.2 }} className="text-2xl text-gray-300 hover:text-primary transition-colors" aria-label={link.label}>
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-4 text-gray-400 text-center md:text-left">
              <p className="flex items-center gap-2"><FaEnvelope /> jahidsheikhjdp@gmail.com</p>
              <p className="flex items-center gap-2 mt-2"><FaPhone /> +880123456789</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="flex-1 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="input input-bordered w-full bg-base-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"/>
            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="input input-bordered w-full bg-base-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"/>
            <textarea name="message" rows="6" placeholder="Your Message" value={form.message} onChange={handleChange} required className="textarea textarea-bordered w-full bg-base-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"/>
            <button type="submit" className="btn btn-primary px-8 py-3 mt-2 text-lg rounded-xl hover:scale-105 transition-all duration-300">{loading ? "Sending..." : "Send Message"}</button>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
