import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CoachClass } from '@coachClassesModule/types/types';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses } from '@personalsModule/types/types';
import { SocketService } from '@services/socket.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit {
  @Input()
  item: CoachClass = {} as CoachClass;

  constructor(
    private personalsService: PersonalsService,
    private socketService: SocketService
  ) {}

  ngOnInit() {}

  public hereWillBePaymentHandling() {
    if (this.item) {
      this.personalsService
        .update({ status: Statuses.submitted }, this.item['id'])
        ?.subscribe({
          next: (res) => {
            this.socketService.emitPersonal(res);
          },
          error: catchError,
        });
    }
  }
}
