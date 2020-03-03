import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { TicketCategoryEntity } from "../../../../domains/entities/ticket.category.entity";

@Component({
  selector: 'app-ticket-category-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class TicketCategoryEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(TicketCategoryEntity, router, data, event);
  }
}
