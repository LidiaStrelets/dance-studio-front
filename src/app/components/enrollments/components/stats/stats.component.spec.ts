import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StatsComponent } from '@enrollmentsModule/components/stats/stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  const enrollmentsSpy = jasmine.createSpyObj<EnrollmentsService>(['getStats']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatsComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: EnrollmentsService, useValue: enrollmentsSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
