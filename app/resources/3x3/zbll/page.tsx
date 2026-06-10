import type { Metadata } from 'next';
import ZBLLClient1 from './ZBLLClient1';

export const metadata: Metadata = {
  title: 'NTP Cuber | 3×3 ZBLL Algorithms',
  description: 'Complete 3x3 ZBLL algorithm database. Covers T, U, L, H, and Pi sets with visual diagrams.',
};

export default function ZBLLPage() {
  return <ZBLLClient1 />;
}
