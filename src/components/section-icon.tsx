import { FileSignature, GraduationCap, Languages, LifeBuoy, Rocket, Scale, User } from 'lucide-react';
import type { Section } from '@/lib/sections';

const ICONS = {
  rocket: Rocket,
  user: User,
  scale: Scale,
  languages: Languages,
  'file-signature': FileSignature,
  'graduation-cap': GraduationCap,
  'life-buoy': LifeBuoy,
} as const;

export function SectionIcon({ icon, className }: { icon: Section['icon']; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}
