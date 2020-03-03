import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { WebsiteEntity } from "../../../../domains/entities/website.entity";

@Component({
  selector: 'app-website-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class WebsiteEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(WebsiteEntity, router, data, event);
  }
}
