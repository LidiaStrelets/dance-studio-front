import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '@homeModule/home.page';
import { TranslateModule } from '@ngx-translate/core';
import { HallService } from './services/hall.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const mockedHalls = [
  {
    id: '1',
    name: 'Big hall',
    description: 'string',
    nameUk: 'Translated',
    descriptionUk: 'translated string',
    polesAmount: 8,
    picture: 'string',
  },
  {
    id: '2',
    name: 'Small hall',
    description: 'string',
    nameUk: 'Translated',
    descriptionUk: 'translated string',
    polesAmount: 2,
    picture: 'string',
  },
];

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const hallsSpy = jasmine.createSpyObj<HallService>(['get']);
  hallsSpy.get.and.returnValue(of(mockedHalls));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomePage],
      providers: [{ provide: HallService, useValue: hallsSpy }],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have halls', () => {
    expect(component.halls.length).toBe(2);
  });
});
