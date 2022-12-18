export interface Training {
  id: string;
  coach_id: string;
  hall_id: string;
  class_id: string;

  coach: string;
  hall: string;
  class: string;

  date_time: string;
  duration: number;
  notes?: string;
  enrolled?: boolean;
}
export interface TrainingFull extends Training {
  hallUk: string;
  classUk: string;
}

export type TrainingUpdate = Pick<TrainingFull, 'notes'>;

export interface TrainingWithInfo extends Training {
  coachInfo: string;
  classInfo: string;
}

export interface TrainingWithInfoFull extends TrainingFull {
  classInfoUk: string;
  coachInfo: string;
  classInfo: string;
}
