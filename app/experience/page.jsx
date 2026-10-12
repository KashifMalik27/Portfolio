import ExperienceTimeline from '@/components/ExperienceTimeline';
import { experienceData } from '@/data/experienceData';

export const metadata = {
  title: 'Experience',
  description: 'Professional experience of Malik Kashif as a full stack and frontend-focused developer.',
};

export default function ExperiencePage() {
  return <ExperienceTimeline experiences={experienceData.map((experience) => experience)} />;
}
