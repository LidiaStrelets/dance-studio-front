import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EnrolledClientComponent } from '@schedulesModule/components/enrolled-client/enrolled-client.component';

describe('EnrolledClientComponent', () => {
  let component: EnrolledClientComponent;
  let fixture: ComponentFixture<EnrolledClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledClientComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrolledClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
