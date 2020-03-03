import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { BookingEngineLicenceEntity } from "../../../../domains/entities/booking.engine.licence.entity";

@Component({
  selector: 'app-booking-engine-licence-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class BookingEngineLicenceGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(BookingEngineLicenceEntity, router, data)
  }
}
