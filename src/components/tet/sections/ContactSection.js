import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Check, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { MONO, PALETTE, SERIF } from '../theme';
import { CONTACT_INTRO, EMAILJS, SOCIALS } from '../../../content/portfolioData';

const field = {
  width: '100%', boxSizing: 'border-box',
  background: PALETTE.fieldBg, border: `1px solid ${PALETTE.rule}`, borderRadius: 6,
  padding: '10px 14px', color: PALETTE.ink, font: `14px/1.5 ${MONO}`, outline: 'none',
};
const label = { display: 'block', font: `11px/1 ${MONO}`, letterSpacing: '0.14em', textTransform: 'uppercase', color: PALETTE.engraved, margin: '0 0 7px' };

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const onChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
          reply_to: formData.email,
          to_email: SOCIALS.email,
        },
        EMAILJS.publicKey
      );
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoRow = (Icon, labelText, value, action) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(179,64,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <Icon size={17} color={PALETTE.seal} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: `10px/1 ${MONO}`, letterSpacing: '0.14em', textTransform: 'uppercase', color: PALETTE.engraved, marginBottom: 4 }}>{labelText}</div>
        {action}
      </div>
    </div>
  );

  const rowLink = (href, text) => (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ font: `13.5px/1.4 ${MONO}`, color: PALETTE.ink, textDecoration: 'none', borderBottom: `1px solid ${PALETTE.rule}` }}>
      {text}
    </a>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 34, alignItems: 'start' }}>
      {/* left: direct channels */}
      <div>
        <h3 style={{ margin: '0 0 12px', font: `400 24px/1.25 ${SERIF}`, color: PALETTE.ink }}>Let&apos;s Connect</h3>
        <p style={{ margin: '0 0 24px', font: `13.5px/1.75 ${MONO}`, color: PALETTE.inkSoft }}>{CONTACT_INTRO}</p>
        <div style={{ display: 'grid', gap: 18 }}>
          {infoRow(Mail, 'Email', SOCIALS.email, (
            <button type="button" onClick={copyEmail} title="Copy email address" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: `13.5px/1.4 ${MONO}`, color: PALETTE.ink, borderBottom: `1px solid ${PALETTE.rule}` }}>
              {SOCIALS.email}
              {copied ? <Check size={13} color={PALETTE.success} /> : <Copy size={13} color={PALETTE.engraved} />}
              {copied && <span style={{ font: `11px/1 ${MONO}`, color: PALETTE.success }}>copied</span>}
            </button>
          ))}
          {infoRow(Phone, 'Phone', SOCIALS.phone, rowLink(SOCIALS.phoneHref, SOCIALS.phone))}
          {infoRow(MapPin, 'Location', SOCIALS.location, (
            <span style={{ font: `13.5px/1.4 ${MONO}`, color: PALETTE.ink }}>{SOCIALS.location}</span>
          ))}
          {infoRow(Github, 'GitHub', SOCIALS.github, rowLink(SOCIALS.github, 'github.com/Noctural123'))}
          {infoRow(Linkedin, 'LinkedIn', SOCIALS.linkedin, rowLink(SOCIALS.linkedin, 'linkedin.com/in/annguyen123'))}
        </div>
      </div>

      {/* right: form */}
      <form onSubmit={handleSubmit} style={{ background: PALETTE.cardBg, border: `1px solid ${PALETTE.rule}`, borderRadius: 10, padding: 24, display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label htmlFor="ct-name" style={label}>Name</label>
            <input id="ct-name" name="name" type="text" required placeholder="Your name" value={formData.name} onChange={onChange} style={field} />
          </div>
          <div>
            <label htmlFor="ct-email" style={label}>Email</label>
            <input id="ct-email" name="email" type="email" required placeholder="your.email@example.com" value={formData.email} onChange={onChange} style={field} />
          </div>
        </div>
        <div>
          <label htmlFor="ct-subject" style={label}>Subject</label>
          <input id="ct-subject" name="subject" type="text" required placeholder="What's this about?" value={formData.subject} onChange={onChange} style={field} />
        </div>
        <div>
          <label htmlFor="ct-message" style={label}>Message</label>
          <textarea id="ct-message" name="message" rows={6} required placeholder="Tell me about your project or opportunity..." value={formData.message} onChange={onChange} style={{ ...field, resize: 'vertical' }} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: PALETTE.seal, color: PALETTE.linen, border: 'none', borderRadius: 8,
            padding: '13px 18px', font: `600 13px/1 ${MONO}`, letterSpacing: '0.06em',
            cursor: isSubmitting ? 'wait' : 'pointer', opacity: isSubmitting ? 0.75 : 1,
          }}
        >
          {isSubmitting ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitStatus === 'success' && (
          <div style={{ font: `13px/1.6 ${MONO}`, color: PALETTE.success, background: 'rgba(74,93,58,0.12)', border: '1px solid rgba(74,93,58,0.3)', borderRadius: 8, padding: '12px 14px' }}>
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div style={{ font: `13px/1.6 ${MONO}`, color: PALETTE.error, background: 'rgba(138,47,34,0.1)', border: '1px solid rgba(138,47,34,0.3)', borderRadius: 8, padding: '12px 14px' }}>
            Failed to send message. Please try again or contact me directly.
          </div>
        )}
      </form>
    </div>
  );
}
