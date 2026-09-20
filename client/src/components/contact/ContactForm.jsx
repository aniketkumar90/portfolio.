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

    const whatsappNumber = "919525971964";
    const text = `*New Portfolio Contact*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    try {
      // Send to backend database in background
      contactService.submitMessage(formData).catch((err) => {
        console.warn("Backend submission note:", err);
      });

      setStatus({
        type: "success",
        message: "Redirecting to WhatsApp (+91 9525971964)...",
        whatsappUrl,
      });

      // Try opening in new tab, or redirect
      const newWin = window.open(whatsappUrl, "_blank");
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        window.location.href = whatsappUrl;
      }

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      // Fallback redirect to WhatsApp even if backend is offline
      window.location.href = whatsappUrl;
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
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200 font-mono">Message Dispatch</p>
        <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          WhatsApp Direct
        </span>
      </div>

      {status && (
        <div
          className={`p-3 rounded-xl text-xs font-mono border ${
            status.type === "success"
              ? "bg-emerald-950/70 border-emerald-400/80 text-emerald-200"
              : "bg-red-950/60 border-red-400 text-red-200"
          }`}
        >
          <p>{status.message}</p>
          {status.whatsappUrl && (
            <a
              href={status.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-emerald-300 underline font-sans font-semibold hover:text-emerald-100"
            >
              Click here to open WhatsApp directly →
            </a>
          )}
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
        className="neo-btn w-fit disabled:opacity-50 cursor-pointer flex items-center gap-2"
      >
        {submitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>
    </motion.form>
  );
}

export default ContactForm;
