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
}

export interface SingleScheduleFull extends ScheduleFull {
  coachInfo: string;
  classInfo: string;
  classInfoUk: string;
}
