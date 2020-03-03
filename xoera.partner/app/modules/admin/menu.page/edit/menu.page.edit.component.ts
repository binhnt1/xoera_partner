import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { MenuPageEntity } from "../../../../domains/entities/menu.page.entity";

@Component({
  selector: 'app-menu-page-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class MenuPageEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(MenuPageEntity, router, data, event);
  }
}
