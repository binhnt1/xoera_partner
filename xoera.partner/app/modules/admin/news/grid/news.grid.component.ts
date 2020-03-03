import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { NewsEntity } from "../../../../domains/entities/news.entity";

@Component({
  selector: 'app-news-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class NewsGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(NewsEntity, router, data)
  }
}
