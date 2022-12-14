import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ClassesDetailsComponent } from './classes-details.component';
// time error
describe('ClassesDetailsComponent', () => {
  let component: ClassesDetailsComponent;
  let fixture: ComponentFixture<ClassesDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesDetailsComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
