import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProfileCard from './ProfileCard';

const socialIconMap = { github: FaGithub, linkedin: FaLinkedin };

export default function Hero({ sections }) {
  return sections.map((section) => {
    const linkedinHref = section.socialLinks.find((social) => social.icon === 'linkedin')?.href;

    return (
    <section key={section.name} className="page-shell flex items-center font-mona">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for work
          </div>
          <p className="font-semibold uppercase tracking-[0.22em] text-[#8ba9ff]">{section.role}</p>
          <h1 className="text-6xl font-extrabold tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">{section.name}</h1>
          <div className="max-w-2xl text-lg leading-8 text-slate-300">
            {section.bullets.map((bullet) => (
              <p key={bullet} className="mb-2 flex gap-3"><span className="text-[#ef6a5b]">&bull;</span>{bullet}</p>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <div className="glass glass-cluster inline-flex w-fit flex-wrap items-center gap-1 rounded-full p-1.5">
              <Link href="/contact" className="primary-button">{section.ctaText}</Link>
              <a href={section.resumeHref} target="_blank" rel="noopener noreferrer" className="secondary-button">{section.resumeText}</a>
            </div>
            <div className="glass inline-flex w-fit gap-1 rounded-full p-1.5 text-xl" aria-label="Social profile links">
              {section.socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="rounded-full p-3 text-slate-300 transition hover:bg-white/10 hover:text-white">
                    {Icon ? <Icon aria-hidden="true" /> : social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[420px]"><ProfileCard linkedinHref={linkedinHref} /></div>
      </div>
    </section>
    );
  });
}
