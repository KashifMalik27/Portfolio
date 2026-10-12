import ContactForm from '@/components/ContactForm';
import { contactData } from '@/data/contactData';

export const metadata = {
  title: 'Contact',
  description: 'Contact Malik Kashif for frontend, full stack, UI, and web development projects.',
};

export default function ContactPage() {
  return <ContactForm contacts={contactData.map((contact) => contact)} />;
}
