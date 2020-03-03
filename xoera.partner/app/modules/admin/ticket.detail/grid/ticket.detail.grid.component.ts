import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TicketDetailEntity } from "../../../../domains/entities/ticket.detail.entity";

@Component({
  selector: 'app-ticket-detail-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TicketDetailGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TicketDetailEntity, router, data)
  }
}
