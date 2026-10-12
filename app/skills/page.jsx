import SkillsSearch from '@/components/SkillsSearch';
import { skillsData } from '@/data/skillsData';

export const metadata = {
  title: 'Skills',
  description: 'Frontend, backend, database, DevOps, hosting, DNS, and server administration skills used by Malik Kashif.',
};

export default function SkillsPage() {
  return <SkillsSearch groups={skillsData.map((group) => group)} />;
}
