import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { BookingEngineLicenceEntity } from "../../../../domains/entities/booking.engine.licence.entity";

@Component({
  selector: 'app-booking-engine-licence-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class BookingEngineLicenceEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(BookingEngineLicenceEntity, router, data, event);
  }
}
