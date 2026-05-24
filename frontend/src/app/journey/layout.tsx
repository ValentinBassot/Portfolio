import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Journey',
  description: 'My learning journey and reflections on software engineering, cybersecurity, and personal development.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}