import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClassesService } from '@classesModule/services/classes.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollComponent } from '@personalsModule/components/enroll/enroll.component';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { UsersService } from '@userModule/services/users.service';
// timeout error
describe('EnrollComponent', () => {
  let component: EnrollComponent;
  let fixture: ComponentFixture<EnrollComponent>;

  const personalsSpy = jasmine.createSpyObj<PersonalsService>(['getByUser']);
  const usersSpy = jasmine.createSpyObj<UsersService>(['getCoaches']);
  const classesSpy = jasmine.createSpyObj<ClassesService>(['getClasses']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollComponent],
      providers: [
        { provide: PersonalsService, useValue: personalsSpy },
        { provide: UsersService, useValue: usersSpy },
        { provide: ClassesService, useValue: classesSpy },
      ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
