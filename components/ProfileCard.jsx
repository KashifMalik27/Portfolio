import Image from 'next/image';

export default function ProfileCard({ linkedinHref }) {
  return (
    <article className="glass group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[2rem] text-left">
      <div className="relative aspect-[2512/1016] w-full shrink-0 overflow-hidden bg-[#11141c]">
        <Image
          src="/linkedin-cover1.png"
          alt="Full-stack developer workspace cover"
          fill
          priority
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-cover transition duration-700 group-hover:scale-[1.015]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#ff4d59]/20 via-transparent to-[#080a12]/20" />
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-8 pt-16 sm:px-7 sm:pb-9">
        <div className="absolute -top-12 right-5 h-32 w-32 overflow-hidden rounded-full border-[5px] border-[#0d0f17] bg-[#11131d] shadow-[0_14px_34px_rgba(0,0,0,0.52)]">
          <Image
            src="/profile-picture.jpg"
            alt="Malik Kashif"
            fill
            priority
            sizes="128px"
            className="scale-[1.05] object-cover object-[center_38%]"
          />
        </div>

        <div className="mb-5 min-w-0 text-left">
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-white">
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#9ab2ff]">
                Malik Kashif
              </a>
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Full-Stack Developer &middot; React, Next.js &amp; Node.js</p>
            <p className="text-sm text-slate-400">Rawalpindi District, Punjab</p>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#151515] shadow-lg shadow-black/25">
            <Image src="/mars-digital-logo.svg" alt="Mars Digital logo" fill sizes="48px" className="object-cover" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">Mars Digital</p>
            <p className="text-xs text-slate-400">Full-Stack Developer</p>
            <p className="mt-1 max-w-[17rem] text-xs leading-5 text-slate-300">Building scalable web experiences with React, Next.js &amp; Node.js</p>
          </div>
        </div>
      </div>
    </article>
  );
}
