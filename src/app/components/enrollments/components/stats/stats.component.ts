import { Component, Input, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { Classes, Schedule, TClass } from 'src/types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input() items: Schedule[] = [];

  classes = Classes;

  classesNames: TClass[] = Object.keys(this.classes) as TClass[];
  constructor(private dateService: DateService) {}

  ngOnInit() {}

  getTotalDuration = (sortBy?: TClass) => {
    const minutes = this.items.reduce((sum, item) => {
      if (!sortBy) {
        return sum + item.duration;
      } else {
        return item.class_id === this.classes[sortBy]
          ? sum + item.duration
          : sum;
      }
    }, 0);
    return Math.round(this.dateService.convertIntoHours(minutes));
  };
}
