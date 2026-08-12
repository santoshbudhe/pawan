import {
  Accessibility,
  Activity,
  Bandage,
  Bed,
  BookOpen,
  Brain,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ClipboardPlus,
  Droplets,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  LucideIcon,
  MessageCircle,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  TriangleAlert,
  Users
} from "lucide-react";
import { SdrIconName } from "../../../pages/procedures/sdr/sdrTypes";

const iconMap: Record<SdrIconName, LucideIcon> = {
  Accessibility,
  Activity,
  Bandage,
  Bed,
  BookOpen,
  Brain,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ClipboardPlus,
  Droplets,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  MessagesCircle: MessageCircle,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  TriangleAlert,
  Users
};

interface SdrIconProps {
  name: SdrIconName;
  className?: string;
}

export function SdrIcon({ name, className }: SdrIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={2} />;
}
