import ProjectsGrid from '@/components/ProjectsGrid';
import { projectsData } from '@/data/projectsData';

export const metadata = {
  title: 'Projects',
  description: 'Selected live projects by Malik Kashif, including production frontend and full stack web work.',
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={projectsData.map((project) => project)} />;
}
