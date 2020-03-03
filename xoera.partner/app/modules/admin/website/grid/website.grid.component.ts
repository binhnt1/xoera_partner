import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { WebsiteEntity } from "../../../../domains/entities/website.entity";

@Component({
  selector: 'app-website-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class WebsiteGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(WebsiteEntity, router, data)
  }
}
