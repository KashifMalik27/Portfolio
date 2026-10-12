import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <article className="panel group w-full max-w-sm overflow-hidden p-4 transition duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-black/40">
      <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <Image
          src={project.image}
          alt={`${project.title} website screenshot`}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
        </div>
        <p className="mb-4 text-sm leading-6 text-slate-400">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Image src="/assets/link.png" alt="" width={20} height={20} className="h-5 w-5 invert" aria-hidden="true" />
            Demo
          </a>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Image src="/assets/github.png" alt="" width={20} height={20} className="h-5 w-5 invert" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
