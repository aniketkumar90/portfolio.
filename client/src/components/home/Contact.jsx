import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import SectionTitle from "../common/SectionTitle";
import ContactForm from "../contact/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="section-wrap">
      <SectionTitle kicker="Connect" title="Contact" />

      <div className="mx-auto mt-6 md:mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <ContactForm />

        <motion.div
          className="rounded-[1.8rem] p-6 md:p-8"
          style={{
            background: "linear-gradient(155deg, rgba(81, 20, 124, 0.62), rgba(134, 17, 91, 0.5))",
            boxShadow: "inset 0 1px 0 rgba(255, 210, 242, 0.18)",
          }}
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid w-fit grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${i % 4 === 0 ? "bg-pink-400/45" : "bg-pink-500"}`}
              />
            ))}
          </div>
          <h3 className="mt-8 text-3xl font-bold text-white">Let's Connect</h3>
          <div className="mt-6 space-y-4 text-pink-50/90">
            <p>
              <span className="font-semibold text-white">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-semibold text-white">WhatsApp / Phone:</span>{" "}
              <a
                className="text-emerald-300 hover:underline font-mono"
                href="https://wa.me/919525971964"
                target="_blank"
                rel="noreferrer"
              >
                {profile.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold text-white">GitHub:</span>{" "}
              <a
                className="text-cyan-200 hover:underline"
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                aniketkumar90
              </a>
            </p>
            <p>
              <span className="font-semibold text-white">LinkedIn:</span>{" "}
              <a
                className="text-cyan-200 hover:underline"
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Aniket Kumar
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
