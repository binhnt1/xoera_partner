import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { NewsEntity } from "../../../../domains/entities/news.entity";

@Component({
  selector: 'app-news-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class NewsEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(NewsEntity, router, data, event);
  }
}
