import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoachScheduleComponent } from '@schedulesModule/components/coach-schedule/coach-schedule.component';

describe('CoachScheduleComponent', () => {
  let component: CoachScheduleComponent;
  let fixture: ComponentFixture<CoachScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CoachScheduleComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
