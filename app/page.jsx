import Hero from '@/components/Hero';
import { heroData } from '@/data/heroData';

export const metadata = {
  title: 'Home',
  description: 'Malik Kashif - Full Stack Developer focused on advanced frontend web design and development.',
};

export default function HomePage() {
  return <Hero sections={heroData.map((section) => section)} />;
}
