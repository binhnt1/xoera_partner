import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { TemplateEmailEntity } from "../../../../domains/entities/template.email.entity";

@Component({
  selector: 'app-template-email-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class TemplateEmailEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(TemplateEmailEntity, router, data, event);
  }
}
