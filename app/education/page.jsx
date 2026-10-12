import EducationTimeline from '@/components/EducationTimeline';
import { educationData } from '@/data/educationData';

export const metadata = {
  title: 'Education',
  description: 'Education details for Malik Kashif, including Bachelor of Science in Computer Science.',
};

export default function EducationPage() {
  return <EducationTimeline education={educationData.map((item) => item)} />;
}
