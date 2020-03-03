import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { LicenceEntity } from "../../../../domains/entities/licence.entity";

@Component({
  selector: 'app-licence-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class LicenceEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(LicenceEntity, router, data, event);
  }
}
