import React, { useState } from "react";
import {
  PiEnvelopeLight,
  PiPhoneLight,
  PiMapPinLight,
  PiLinkedinLogoLight,
  PiGithubLogoLight,
  PiInstagramLogoLight,
  PiPaperPlaneRightBold,
  PiCopyLight,
  PiCheckLight,
} from "react-icons/pi";
import { SiGitlab, SiSpotify } from "react-icons/si";
import PageTransition from "../../components/PageTransition";
import InteractiveTerminal from "../../components/home/InteractiveTerminal";
import profileJson from "../../data/profile.json";
import { playTick, playChime } from "@/lib/sound";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playChime();
    const mailSubject = encodeURIComponent(subject || `Inquiry from ${name}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${profileJson.contact.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const copyToClipboard = (text: string, key: string) => {
    playTick();
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/adityavahlevynugraha",
      icon: <PiLinkedinLogoLight size={16} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/adityavhlvy/",
      icon: <PiGithubLogoLight size={16} />,
    },
    {
      name: "GitLab",
      url: "https://gitlabduo.pupuk-indonesia.com/adityavhlvy",
      icon: <SiGitlab size={14} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/adityavhlvy",
      icon: <PiInstagramLogoLight size={16} />,
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu",
      icon: <SiSpotify size={14} />,
    },
  ];

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
            <PiEnvelopeLight size={14} />
            <span>Direct Channel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Reach out directly for AI engineering collaboration, geospatial consulting, or technical advisory.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-5 space-y-2 font-mono flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profileJson.contact.email, "email")}
                  className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Copy email"
                >
                  {copiedKey === "email" ? (
                    <PiCheckLight size={14} className="text-emerald-500" />
                  ) : (
                    <PiCopyLight size={14} />
                  )}
                </button>
              </div>
              <a
                href={`mailto:${profileJson.contact.email}`}
                className="text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors truncate block"
              >
                {profileJson.contact.email}
              </a>
              <span className="text-[10px] text-muted-foreground">
                Typical reply within 24 hours
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-5 space-y-2 font-mono flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  Direct Phone / WhatsApp
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profileJson.contact.phone, "phone")}
                  className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Copy phone"
                >
                  {copiedKey === "phone" ? (
                    <PiCheckLight size={14} className="text-emerald-500" />
                  ) : (
                    <PiCopyLight size={14} />
                  )}
                </button>
              </div>
              <a
                href={`tel:${profileJson.contact.phone}`}
                className="text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors block"
              >
                {profileJson.contact.phone}
              </a>
              <span className="text-[10px] text-muted-foreground">
                UTC+7 WIB Timezone
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="double-bezel">
            <div className="double-bezel-inner p-5 space-y-2 font-mono flex flex-col justify-between h-full">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                Geographic Base
              </span>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                Jakarta / Pekanbaru, ID
              </p>
              <span className="text-[10px] text-muted-foreground">
                Available for hybrid & remote engagements
              </span>
            </div>
          </div>
        </div>

        {/* Form & Social Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Email Form */}
          <form onSubmit={handleSend} className="lg:col-span-7 double-bezel">
            <div className="double-bezel-inner p-6 md:p-8 space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-black tracking-tight text-foreground">
                  Send a Structured Message
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  Triggers your native email client with pre-filled message structure.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-input border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-input border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Advisory / Discussion"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-input border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your technical needs, platform requirements, or project timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-input border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none resize-none font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!name || !email || !message}
                  className="btn-pill w-full justify-center bg-primary text-primary-foreground font-mono font-bold text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  <PiPaperPlaneRightBold size={14} />
                  <span>Send via Email Client</span>
                </button>
              </div>
            </div>
          </form>

          {/* Social Profiles & Developer Terminal */}
          <div className="lg:col-span-5 space-y-6">
            {/* Socials Box */}
            <div className="double-bezel">
              <div className="double-bezel-inner p-6 space-y-4">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                  Connected Networks
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTick()}
                      className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/70 hover:border-primary font-mono text-xs text-foreground/85 hover:text-primary transition-colors"
                    >
                      <span className="text-muted-foreground">{s.icon}</span>
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Embedded Interactive Shell */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Quick Shell
              </span>
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
