import { ContactPage } from '@/views/ContactPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Us — Customer, Restaurant & Rider Support',
  description:
    'Get in touch with USTART. Customer support, restaurant partnership enquiries and rider questions, plus answers to the questions we get asked most.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
