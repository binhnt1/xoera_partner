import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { TutorialCategoryEntity } from "../../../../domains/entities/tutorial.category.entity";

@Component({
  selector: 'app-tutorial-category-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class TutorialCategoryEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(TutorialCategoryEntity, router, data, event);
  }
}
