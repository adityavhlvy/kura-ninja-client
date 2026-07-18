import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SlRocket,
  SlSocialLinkedin,
  SlSocialInstagram,
  SlSocialSpotify,
  SlEnvolope,
} from "react-icons/sl";
import { SiGithub, SiGitlab } from "react-icons/si";
import { FiCopy, FiCheck } from "react-icons/fi";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import profileJson from "../../data/profile.json";

type MissionType =
  "HIRE_ME" | "COLLABORATION" | "FREELANCE_PROJECT" | "COFFEE_CHAT";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mission, setMission] = useState<MissionType>("HIRE_ME");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // JSON specimen representation
  const specObject = {
    requester: {
      name: name || "placeholder_name",
      email: email || "placeholder_email",
    },
    intent: {
      category: mission,
      message: message || "Type your message here...",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(specObject, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(
      `[${mission}] Quest Specification from ${name}`,
    );
    const body = encodeURIComponent(JSON.stringify(specObject, null, 2));
    window.location.href = `mailto:${profileJson.contact.email}?subject=${subject}&body=${body}`;
  };

  // Syntax highlighting helper for clean presentation
  const highlightJson = (json: string) => {
    const html = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = "text-amber-500 font-semibold";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "text-primary font-bold"; // key
            } else {
              cls = "text-success font-medium"; // string
            }
          }
          return `<span class="${cls}">${match}</span>`;
        },
      );
    return (
      <pre
        className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words select-all"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const getSocialUrl = (name: string, defaultUrl: string) => {
    const social = profileJson.contact.socials.find(s => s.name.toLowerCase() === name.toLowerCase());
    return social ? social.url : defaultUrl;
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: getSocialUrl("LinkedIn", "https://www.linkedin.com/in/adityavahlevynugraha"),
      icon: <SlSocialLinkedin size={18} />,
      color: "hover:text-[#0077b5] hover:border-[#0077b5]/30",
    },
    {
      name: "GitHub",
      url: getSocialUrl("GitHub", "https://github.com/adityavhlvy/"),
      icon: <SiGithub size={18} />,
      color: "hover:text-[#fafafa] hover:border-white/30",
    },
    {
      name: "GitLab",
      url: getSocialUrl("GitLab", "https://gitlabduo.pupuk-indonesia.com/adityavhlvy"),
      icon: <SiGitlab size={18} />,
      color: "hover:text-[#fc6d26] hover:border-[#fc6d26]/30",
    },
    {
      name: "Instagram",
      url: getSocialUrl("Instagram", "https://instagram.com/adityavhlvy"),
      icon: <SlSocialInstagram size={18} />,
      color: "hover:text-[#e1306c] hover:border-[#e1306c]/30",
    },
    {
      name: "Spotify",
      url: getSocialUrl("Spotify", "https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu"),
      icon: <SlSocialSpotify size={18} />,
      color: "hover:text-[#1db954] hover:border-[#1db954]/30",
    },
    {
      name: "Gmail",
      url: `mailto:${profileJson.contact.email}`,
      icon: <SlEnvolope size={18} />,
      color: "hover:text-primary hover:border-primary/30",
    },
  ];

  return (
    <PageTransition className="container mx-auto max-w-5xl p-6 md:p-10 relative min-h-screen">
      <BackgroundEffects />

      <div className="relative z-10 space-y-12 pb-16">
        <PageHeader
          title="Contact Specification"
          subtitle="contact.json"
          description={
            <>
              Connect directly or fill out the form parameters to compile a{" "}
              <span className="font-bold text-primary">contact.json</span> spec
              to launch in your mail client.
            </>
          }
          accentColor="primary"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Pure Form */}
          <form onSubmit={handleDispatch} className="lg:col-span-6 space-y-6">
            <div className="bg-card/40 border border-border rounded-sm p-6 backdrop-blur-sm space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Intent Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "HIRE_ME",
                      "COLLABORATION",
                      "FREELANCE_PROJECT",
                      "COFFEE_CHAT",
                    ] as const
                  ).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMission(type)}
                      className={`flex-1 min-w-[120px] py-2 px-3 border rounded-sm font-mono text-[10px] text-center font-bold tracking-tight transition-all duration-300 ${
                        mission === type
                          ? "bg-primary border-primary text-primary-foreground shadow-[0_0_8px_rgba(240,160,48,0.25)]"
                          : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your goals, project scope, or general message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!name || !email || !message}
                  className={`w-full h-10 font-mono text-xs uppercase tracking-wider font-bold transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer ${
                    !name || !email || !message
                      ? "bg-muted border border-border text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_rgba(240,160,48,0.3)]"
                  }`}
                >
                  <SlRocket />
                  <span>Dispatch Spec</span>
                </Button>
              </div>
            </div>
          </form>

          {/* Right panel: Live Spec Code Console & Direct socials */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card/60 border border-border rounded-sm backdrop-blur-sm flex flex-col overflow-hidden shadow-2xl">
              {/* IDE Header */}
              <div className="bg-muted/80 border-b border-border/80 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/80 ml-2">
                    contact.json
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-1 text-muted-foreground hover:text-primary rounded-sm border border-border bg-input transition-colors cursor-pointer"
                  title="Copy JSON Spec"
                >
                  {copied ? (
                    <FiCheck className="text-success text-xs" />
                  ) : (
                    <FiCopy className="text-xs" />
                  )}
                </button>
              </div>

              {/* Code Panel */}
              <div className="p-5 bg-black/20 overflow-auto max-h-[320px] scrollbar-senja font-mono">
                {highlightJson(JSON.stringify(specObject, null, 2))}
              </div>
            </div>

            {/* Direct Social Gateways */}
            <div className="bg-card/40 border border-border rounded-sm p-6 backdrop-blur-sm space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Direct Gateways
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== "Gmail" ? "_blank" : undefined}
                    rel={
                      link.name !== "Gmail" ? "noopener noreferrer" : undefined
                    }
                    className={`flex flex-col items-center justify-center p-3 border border-border rounded-sm bg-muted/10 font-mono text-[10px] font-bold text-muted-foreground transition-all duration-300 ${link.color}`}
                  >
                    <span className="mb-1.5">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
