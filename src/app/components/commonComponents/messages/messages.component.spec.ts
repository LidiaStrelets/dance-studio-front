import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MessagesComponent } from './messages.component';
import { MessageService } from './services/message.service';
// timeout error
describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  const messagesServiceSpy = jasmine.createSpyObj<MessageService>(['get']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: MessageService, useValue: messagesServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
