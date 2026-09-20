import React, { useState } from "react";
import { motion } from "framer-motion";
import contactService from "../../services/contactService";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await contactService.submitMessage(formData);
      setStatus({ type: "success", message: res.message || "Message dispatched successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to send message." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[1.8rem] border border-cyan-200/25 p-6 md:p-8"
      style={{
        background:
          "linear-gradient(150deg, rgba(8, 18, 68, 0.92), rgba(16, 35, 139, 0.7), rgba(55, 12, 96, 0.78))",
        boxShadow:
          "0 26px 65px rgba(7, 15, 82, 0.42), inset 0 1px 0 rgba(191, 236, 255, 0.24)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-200 font-mono">Message Dispatch</p>

      {status && (
        <div
          className={`p-3 rounded-xl text-xs font-mono border ${
            status.type === "success"
              ? "bg-cyan-950/60 border-cyan-400 text-cyan-200"
              : "bg-red-950/60 border-red-400 text-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <input
        className="field"
        placeholder="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className="field"
        placeholder="Your Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        className="field min-h-36"
        placeholder="Your Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="neo-btn w-fit disabled:opacity-50 cursor-pointer"
      >
        {submitting ? "Sending Transmission..." : "Send Message"}
      </button>
    </motion.form>
  );
}

export default ContactForm;
