import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { TranslatedHall } from '@homeModule/types/types';
import { HallService } from '@homeModule/services/hall.service';
import { LanguageService } from '@services/language.service';
import { catchError } from 'rxjs';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-pick-hall',
  templateUrl: './pick-hall.component.html',
  styleUrls: ['./pick-hall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickHallComponent implements OnInit {
  @Output()
  onPickHall = new EventEmitter<string>();

  public halls: TranslatedHall[] = [];
  public pickedHall = '';

  constructor(
    private hallsService: HallService,
    private languageService: LanguageService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.hallsService.get()?.subscribe({
      next: (res) => {
        this.halls = this.languageService.translateHalls(res);
        this.loader.hideSpinner();
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
    });
  }

  public handleRadio() {
    this.onPickHall.emit(this.pickedHall);
  }
}
