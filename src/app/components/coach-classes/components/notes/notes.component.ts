import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CoachClass } from '@coachClassesModule/types';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { AlertService } from '@services/alert.service';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  @Input() item?: CoachClass;

  value = '';

  constructor(
    private schedulesService: SchedulesService,
    private alertService: AlertService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.value = this.item?.notes ?? '';
  }

  setNotes = (event: Event) => {
    if (!this.item) {
      return;
    }
    const target = event.target as HTMLTextAreaElement;

    this.value = target.value;
  };

  patchItem = () => {
    if (!this.value || !this.item) {
      return;
    }
    this.loader.showSpinner();
    this.schedulesService
      .update(this.item!.id, { notes: this.value })
      ?.subscribe({
        next: (res) => {
          this.item = {
            ...res,
            type: this.item!.type,
            clients: this.item!.clients,
          };

          this.alertService.presentAlertSuccess(
            this.alertService.getTranslations().notesUpdatedMessage
          );
          this.loader.hideSpinner();
        },
        error: (err) => {
          catchError(err);
          this.loader.hideSpinner();
        },
      });
  };
}
