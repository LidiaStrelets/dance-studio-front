import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LanguageService } from '@services/language.service';

import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  const languagesSpy = jasmine.createSpyObj<LanguageService>([
    'getLanguages',
    'setLanguage',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesComponent],
      providers: [{ provide: LanguageService, useValue: languagesSpy }],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
