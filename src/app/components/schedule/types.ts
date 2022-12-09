export interface Schedule {
  coach_id: string;
  hall_id?: string;
  class_id: string;
  coach: string;
  hall: string;
  class: string;
  date_time: Date;
  id: string;
  duration: number;
  notes?: string;
  enrolled?: boolean;
}
export interface ScheduleFull extends Schedule {
  hallUk: string;
  classUk: string;
}

export type ScheduleUpdate = Pick<ScheduleFull, 'notes'>;

export interface SingleScheduleFull extends ScheduleFull {
  coachInfo: string;
  classInfo: string;
  classInfoUk: string;
}

export interface SingleSchedule extends Schedule {
  coachInfo: string;
  classInfo: string;
}
