import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TemplateEmailEntity } from "../../../../domains/entities/template.email.entity";

@Component({
  selector: 'app-template-email-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TemplateEmailGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TemplateEmailEntity, router, data)
  }
}
