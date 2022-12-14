import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from '@commonComponents/header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PricesPage } from '@pricesModule/prices.page';
import { PricesService } from './services/prices.service';

describe('PricesPage', () => {
  let component: PricesPage;
  let fixture: ComponentFixture<PricesPage>;

  const pricesSpy = jasmine.createSpyObj<PricesService>(['get']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PricesPage],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: PricesService, useValue: pricesSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
