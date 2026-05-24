import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epitech Projects',
  description: 'Explore the various projects completed during my studies in Artificial Intelligence, Cybersecurity, Data, and Web at Epitech.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}