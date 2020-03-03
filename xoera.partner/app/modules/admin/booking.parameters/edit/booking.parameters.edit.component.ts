import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { BookingParametersEntity } from "../../../../domains/entities/booking.parameters.entity";

@Component({
  selector: 'app-booking-parameters-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class BookingParametersEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(BookingParametersEntity, router, data, event);
  }
}
