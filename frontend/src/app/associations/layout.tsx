import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Associations & Community',
  description: 'Community involvement and associative projects through POC Innovation and Junior Conseil Taker.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
