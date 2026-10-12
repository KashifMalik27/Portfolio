export default function EducationTimeline({ education }) {
  return (
    <section className="page-shell flex flex-col items-center font-mona">
      <h1 className="page-title mb-16">Education</h1>
      <div className="grid gap-14 grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start">
        {education.map((item) => (
          <article
            key={`${item.institute}-${item.title}`}
            className={`panel p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30 ${item.cardClass}`}
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{item.institute}</span>
              <span>&bull;</span>
              <span>{item.location}</span>
            </div>
            <div className="mt-2 text-sm font-medium text-[#8ba9ff]">
              <p>{item.date}</p>
            </div>
            <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}

        <div className="col-start-2 row-span-2 row-start-1 hidden h-full w-px bg-gradient-to-b from-[#5b8cff] via-[#ff4d59] to-transparent md:block" />
      </div>
    </section>
  );
}
