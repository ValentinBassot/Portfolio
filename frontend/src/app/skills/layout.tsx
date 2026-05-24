import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Skills',
  description: 'A comprehensive list of my technical skills, tools, and programming languages.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}