import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { ClassItem } from '@classesModule/types/types';
import { ClassesService } from '@classesModule/services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPage implements OnInit {
  public classItems: ClassItem[] = [];

  constructor(
    private classesService: ClassesService,
    private loader: LoaderService,
    private languageService: LanguageService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.classesService.getClasses()?.subscribe({
      next: (res) => {
        this.classItems = this.languageService.translateClasses(res);
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }
}
