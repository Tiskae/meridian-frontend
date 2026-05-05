"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Hairline from "@/components/ui/Hairline/Hairline";
import { SOCIAL_LINKS } from "@/components/ui/SocialIcons/SocialIcons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { gsap, EASE, DUR_REVEAL } from "@/lib/motion";
import styles from "./ContactMain.module.scss";

export default function ContactMain() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryType: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cm-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.grid}>
        {/* Left — Showroom Info */}
        <div data-cm-reveal>
          <div className={styles.infoLabel}>— The Showroom</div>
          <p className={styles.addressText}>
            No. 4 Kofo Abayomi Street
            <br />
            Victoria Island
            <br />
            Lagos, Nigeria
          </p>
          <Hairline className={styles.infoDivider} />

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Hours</span>
            <span className={styles.infoValue}>Mon-Fri: 8:00 - 21:00 · Sat: By appointment</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Telephone</span>
            <a href="tel:+2349120448767" className={styles.infoLink}>
              +234 912 044 8767
            </a>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Email</span>
            <a href="mailto:hello@meridianmotors.ng" className={styles.infoLink}>
              hello@meridianmotors.ng
            </a>
          </div>
          <div className={styles.infoRow}>
            <Button
              as="a"
              href={buildWhatsAppUrl("Hello, I have an enquiry about Meridian Motors.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </Button>
          </div>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className={styles.socialLink}>
                <Icon />
              </a>
            ))}
          </div>

          <div className={styles.imgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Meridian Motors showroom detail view"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right — Form */}
        <div data-cm-reveal>
          <div className={styles.infoLabel}>— Send a Message</div>

          {submitted ? (
            <div className={styles.submitted}>
              <p className={styles.submittedHead}>
                Message <em>sent</em>.
              </p>
              <p className={styles.submittedBody}>
                Thank you for reaching out. A member of the Meridian team will respond within one business day. If your
                enquiry is urgent, please message us directly on WhatsApp.
              </p>
              <Button as="a" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" variant="secondary">
                Continue on WhatsApp
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div>
                  <label className={styles.label} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="enquiryType">
                    Enquiry Type
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    className={styles.select}
                    value={form.enquiryType}
                    onChange={handleChange}
                  >
                    <option value="">Select a type</option>
                    <option value="vehicle">Vehicle Enquiry</option>
                    <option value="viewing">Book a Viewing</option>
                    <option value="financing">Financing</option>
                    <option value="selling">Selling a Vehicle</option>
                    <option value="subscription">Subscription Programme</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <Button type="submit">Send Message</Button>
                </div>
              </div>

              <div className={styles.responseTimes}>
                {[
                  { channel: "WhatsApp", time: "Within 1 hour" },
                  { channel: "Email", time: "Within 1 business day" },
                  { channel: "Phone", time: "Mon - Fri, 8:00 - 21:00" },
                  { channel: "This form", time: "Within 1 business day" },
                ].map((r) => (
                  <div key={r.channel} className={styles.responseRow}>
                    <span className={styles.responseChannel}>{r.channel}</span>
                    <span className={styles.responseDash}>—</span>
                    <span className={styles.responseTime}>{r.time}</span>
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
