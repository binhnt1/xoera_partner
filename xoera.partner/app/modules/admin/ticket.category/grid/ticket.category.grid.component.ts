import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TicketCategoryEntity } from "../../../../domains/entities/ticket.category.entity";

@Component({
  selector: 'app-ticket-category-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TicketCategoryGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TicketCategoryEntity, router, data)
  }
}
