import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { BookingParametersEntity } from "../../../../domains/entities/booking.parameters.entity";

@Component({
  selector: 'app-booking-parameters-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class BookingParametersGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(BookingParametersEntity, router, data)
  }
}
