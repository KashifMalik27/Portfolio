import { footerData } from '@/data/footerData';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/70 px-6 py-8 font-mona text-slate-400">
      {footerData.map((footer) => (
        <div key={footer.name} className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{footer.name}</h2>
            <p className="text-sm mt-2">{footer.text}</p>
            <p className="text-sm mt-2">{footer.copyright}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            {footer.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </footer>
  );
}
