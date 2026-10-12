export default function ExperienceTimeline({ experiences }) {
  return (
    <section className="page-shell flex flex-col items-center font-mona">
      <h1 className="page-title mb-16">Experience</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.title}`}
            className={`panel p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30 ${experience.cardClass}`}
          >
            <h2 className="text-xl font-semibold">{experience.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{experience.company}</span>
              <span>&bull;</span>
              <span>{experience.location}</span>
              <span>&bull;</span>
              <span>{experience.type}</span>
            </div>
            <div className="mt-2 text-sm font-medium text-[#8ba9ff]">
              <p>{experience.date}</p>
            </div>
            <p className="mt-4 leading-7 text-slate-300">{experience.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}

        <div className="hidden md:block col-start-2 row-span-3 relative min-h-[520px] row-start-1">
          <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#5b8cff] via-[#ff4d59] to-transparent" />
          {experiences.map((experience, index) => (
            <span
              key={experience.company}
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#5b8cff] ring-4 ring-white/10"
              style={{ top: experiences.length === 1 ? '1.5rem' : `${(index / (experiences.length - 1)) * 90 + 5}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
