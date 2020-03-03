import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { TicketEntity } from "../../../../domains/entities/ticket.entity";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class TicketEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(TicketEntity, router, data, event);
  }
}
