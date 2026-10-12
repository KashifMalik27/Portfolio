export default function AboutSection({ sections }) {
  return (
    <section className="page-shell font-mona">
      {sections.map((section) => (
        <div key={section.heading} className="text-center mb-12">
          <h1 className="page-title mb-6">{section.heading}</h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">{section.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
            {section.highlights.map((highlight) => (
              <div key={highlight} className="panel p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30">
                <p className="leading-7 text-slate-300">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
