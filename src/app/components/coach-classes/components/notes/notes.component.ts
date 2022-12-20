import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NotesService } from '@coachClassesModule/services/notes.service';
import { CoachClass, Note } from '@coachClassesModule/types';
import { AlertService } from '@services/alert.service';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit, OnChanges {
  @Input() item?: CoachClass;

  value?: Note;
  text = '';

  constructor(
    private alertService: AlertService,
    private loader: LoaderService,
    private notesService: NotesService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'item') {
        this.loader.showSpinner();
        this.notesService.get(value.id)?.subscribe({
          next: (res) => {
            if (res) {
              this.value = res;
              this.text = res.notes;
              this.changes.markForCheck();
            }
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
          complete: () => this.loader.hideSpinner(),
        });
      }
    }
  }

  setNotes = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;

    this.text = target.value;
  };

  handleSubmit = () => {
    if (!this.item || !this.text) {
      return;
    }
    this.loader.showSpinner();
    if (this.value) {
      this.notesService.update({ ...this.value, notes: this.text })?.subscribe({
        next: (res) => {
          this.onSuccess(res);
        },
        error: (err) => {
          catchError(err);
          this.loader.hideSpinner();
        },
      });
    } else {
      this.notesService
        .create({ class_id: this.item.id, notes: this.text })
        ?.subscribe({
          next: (res) => {
            this.onSuccess(res);
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
        });
    }
  };

  private onSuccess = (res: Note) => {
    this.value = res;
    this.text = res.notes;
    this.alertService.presentAlertSuccess(
      this.alertService.getTranslations().notesUpdatedMessage
    );
    this.changes.markForCheck();
    this.loader.hideSpinner();
  };
}
