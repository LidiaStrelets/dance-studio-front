export interface Schedule {
  coach_id: string;
  hall_id: string;
  class_id: string;
  coach: string;
  hall: string;
  class: string;
  date_time: Date;
  id: string;
  duration: number;
  enrolled?: boolean;
  notes?: string;
}
export interface ScheduleFull {
  coach_id: string;
  hall_id: string;
  class_id: string;
  coach: string;
  hall: string;
  class: string;
  hallUk: string;
  classUk: string;
  date_time: Date;
  id: string;
  duration: number;
  notes?: string;
}

export interface ScheduleUpdate {
  coach_id?: string;
  hall_id?: string;
  class_id?: string;
  hall?: string;
  class?: string;
  hallUk?: string;
  classUk?: string;
  date_time?: Date;
  duration?: number;
  notes?: string;
}

export interface SingleScheduleFull extends ScheduleFull {
  coachInfo: string;
  classInfo: string;
  classInfoUk: string;
}

export interface SingleSchedule extends Schedule {
  coachInfo: string;
  classInfo: string;
}
