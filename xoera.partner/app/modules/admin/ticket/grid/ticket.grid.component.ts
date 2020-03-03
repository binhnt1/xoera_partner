import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TicketEntity } from "../../../../domains/entities/ticket.entity";

@Component({
  selector: 'app-ticket-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TicketGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TicketEntity, router, data)
  }
}
