import {
  Activity,
  BadgeCheck,
  Bandage,
  Bone,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  MessageCircle,
  MoveRight,
  PersonStanding,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TriangleAlert,
  Users
} from "lucide-react";
import { TendonMuscleIconName } from "../../../pages/procedures/tendon-muscle/tendonMuscleTypes";

const icons = {
  Activity,
  BadgeCheck,
  Bandage,
  Bone,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  MessagesCircle: MessageCircle,
  MoveRight,
  PersonStanding,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TriangleAlert,
  Users
} as const;

export function TendonMuscleIcon({ name, className = "" }: { name: TendonMuscleIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
