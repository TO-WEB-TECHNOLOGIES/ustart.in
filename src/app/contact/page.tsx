import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the USTART team. We are here to help customers, restaurant partners, and riders.',
};

export default function Page() {
  return <ContactPage />;
}
