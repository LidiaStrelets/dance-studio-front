import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClassesPage } from '@classesModule/classes.page';
import { TranslateModule } from '@ngx-translate/core';
import { ClassesService } from './services/classes.service';

describe('ClassesPage', () => {
  let component: ClassesPage;
  let fixture: ComponentFixture<ClassesPage>;

  const classesServiceSpy = jasmine.createSpyObj<ClassesService>([
    'getClasses',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesPage],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: ClassesService, useValue: classesServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
