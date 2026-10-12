import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }) {
  return (
    <section className="page-shell flex flex-col items-center font-mona">
      <h1 className="page-title mb-12">Selected Projects</h1>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.demoLink} project={project} />
        ))}
      </div>
    </section>
  );
}
