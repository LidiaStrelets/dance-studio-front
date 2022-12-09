import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslatedHall } from '@homeModule/types';
import { HallService } from '@homeModule/services/hall.service';
import { LanguageService } from '@services/language.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-pick-hall',
  templateUrl: './pick-hall.component.html',
  styleUrls: ['./pick-hall.component.scss'],
})
export class PickHallComponent implements OnInit {
  @Output() onPickHall = new EventEmitter<string>();

  halls: TranslatedHall[] = [];
  pickedHall = '';

  constructor(
    private hallsService: HallService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.hallsService.get()?.subscribe({
      next: (res) => {
        this.halls = this.languageService.translateHalls(res);
      },
      error: catchError,
    });
  }

  handleRadio = () => {
    this.onPickHall.emit(this.pickedHall);
  };
}
