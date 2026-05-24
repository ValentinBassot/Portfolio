import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Experiences',
  description: 'Hackathons, professional experiences, and notable events throughout my career.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}