import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  const scheduleServiceSpy = jasmine.createSpyObj<SchedulesService>(['update']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: SchedulesService, useValue: scheduleServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
