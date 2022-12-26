import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HallService } from '@homeModule/services/hall.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PickHallComponent } from '@coachClassesModule/components/pick-hall/pick-hall.component';

describe('PickHallComponent', () => {
  let component: PickHallComponent;
  let fixture: ComponentFixture<PickHallComponent>;

  const hallsServiceSpy = jasmine.createSpyObj<HallService>(['get']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickHallComponent],
      providers: [{ provide: HallService, useValue: hallsServiceSpy }],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PickHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
