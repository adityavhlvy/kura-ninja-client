import React, { useState } from "react";
import {
  SlRocket,
  SlSocialLinkedin,
  SlSocialInstagram,
  SlSocialSpotify,
  SlEnvolope,
} from "react-icons/sl";
import { SiGithub, SiGitlab } from "react-icons/si";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import profileJson from "../../data/profile.json";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profileJson.contact.email}?subject=${subject}&body=${body}`;
  };

  const getSocialUrl = (name: string, defaultUrl: string) => {
    const social = profileJson.contact.socials.find(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );
    return social ? social.url : defaultUrl;
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: getSocialUrl(
        "LinkedIn",
        "https://www.linkedin.com/in/adityavahlevynugraha",
      ),
      icon: <SlSocialLinkedin size={18} />,
    },
    {
      name: "GitHub",
      url: getSocialUrl("GitHub", "https://github.com/adityavhlvy/"),
      icon: <SiGithub size={18} />,
    },
    {
      name: "GitLab",
      url: getSocialUrl(
        "GitLab",
        "https://gitlabduo.pupuk-indonesia.com/adityavhlvy",
      ),
      icon: <SiGitlab size={18} />,
    },
    {
      name: "Instagram",
      url: getSocialUrl("Instagram", "https://instagram.com/adityavhlvy"),
      icon: <SlSocialInstagram size={18} />,
    },
    {
      name: "Spotify",
      url: getSocialUrl(
        "Spotify",
        "https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu",
      ),
      icon: <SlSocialSpotify size={18} />,
    },
    {
      name: "Email",
      url: `mailto:${profileJson.contact.email}`,
      icon: <SlEnvolope size={18} />,
    },
  ];

  return (
    <PageTransition className="container mx-auto max-w-6xl p-6 relative min-h-screen">
      <div className="relative z-10 space-y-12 pb-16">
        <PageHeader
          title="Contact"
          subtitle="get in touch"
          description="Send a message directly, or reach me on any of the links below."
          accentColor="primary"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <form onSubmit={handleSend} className="lg:col-span-7 space-y-6">
            <div className="bg-card/40 border border-border rounded-sm p-6 backdrop-blur-sm space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="What would you like to talk about?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-input border border-border rounded-sm py-2 px-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!name || !email || !message}
                className="w-full h-10 font-mono text-xs uppercase tracking-wider font-bold rounded-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <SlRocket />
                <span>Send message</span>
              </Button>
            </div>
          </form>

          {/* Direct links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card/40 border border-border rounded-sm p-6 backdrop-blur-sm space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Elsewhere
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={
                      link.name !== "Email" ? "noopener noreferrer" : undefined
                    }
                    className="flex flex-col items-center justify-center p-3 border border-border rounded-sm bg-muted/10 font-mono text-[10px] font-bold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    <span className="mb-1.5">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
              <div className="border-t border-border/40 pt-4 font-mono text-xs text-muted-foreground">
                <a
                  href={`mailto:${profileJson.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {profileJson.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}