import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { MenuPageEntity } from "../../../../domains/entities/menu.page.entity";

@Component({
  selector: 'app-menu-page-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class MenuPageGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(MenuPageEntity, router, data)
  }
}
