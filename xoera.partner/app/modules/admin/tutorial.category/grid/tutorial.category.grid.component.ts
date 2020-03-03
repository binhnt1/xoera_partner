import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TutorialCategoryEntity } from "../../../../domains/entities/tutorial.category.entity";

@Component({
  selector: 'app-tutorial-category-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TutorialCategoryGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TutorialCategoryEntity, router, data)
  }
}
