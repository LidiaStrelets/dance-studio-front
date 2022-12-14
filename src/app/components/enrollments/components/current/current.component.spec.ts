import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentComponent } from '@enrollmentsModule/components/current/current.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  let fixture: ComponentFixture<CurrentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
