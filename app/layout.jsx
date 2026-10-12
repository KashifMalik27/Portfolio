import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://malik-kashif.dev'),
  title: {
    default: 'Malik Kashif | Full Stack Developer',
    template: '%s | Malik Kashif',
  },
  description:
    'Malik Kashif is a Full Stack Developer with a primary focus on advanced frontend web design and development.',
  openGraph: {
    title: 'Malik Kashif | Full Stack Developer',
    description:
      'Advanced-level web designer and developer building fast, scalable, visually engaging digital experiences.',
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="liquid-orbits" aria-hidden="true">
          <span className="liquid-orbit liquid-orbit-one" />
          <span className="liquid-orbit liquid-orbit-two" />
          <span className="liquid-orbit liquid-orbit-three" />
        </div>
        <SmoothScroll />
        <Navbar />
        <main className="relative z-10 overflow-x-clip">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
