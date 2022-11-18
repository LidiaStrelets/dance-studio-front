import { ScheduleFull } from '@schedulesModule/types';

export interface Registration {
  schedule_id: string;
  client_id: string;
  id: string;
}

export interface Stats {
  totalClasses: number;
  totalMinutes: number;
  stretching?: number;
  poleSport?: number;
  poleExotic?: number;
  stripPlastic?: number;
  exoticBeginners?: number;
}

export type StatsKeys = keyof Stats;

export interface CancellEnrollmentEvent {
  scheduleId: string;
}

export interface ByCoachSchedule extends ScheduleFull {
  clients: string[];
}
