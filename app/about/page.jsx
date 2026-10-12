import AboutSection from '@/components/AboutSection';
import { aboutData } from '@/data/aboutData';

export const metadata = {
  title: 'About',
  description: 'Learn about Malik Kashif, a Full Stack Developer with a strong focus on frontend development.',
};

export default function AboutPage() {
  return <AboutSection sections={aboutData.map((section) => section)} />;
}
