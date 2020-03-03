import * as _ from "lodash";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { TutorialEntity } from "../../../domains/entities/tutorial.entity";
import { TutorialCategoryEntity } from "../../../domains/entities/tutorial.category.entity";

@Component({
    styleUrls: ['./tutorial.scss'],
    templateUrl: './tutorial.component.html',
})
export class TutorialComponent {
    public items: TutorialEntity[];
    public tutorials: TutorialEntity[];
    public category: TutorialCategoryEntity;
    public categories: TutorialCategoryEntity[];

    constructor(public serive: ApiService) {    
        this.category = new TutorialCategoryEntity();   
        this.serive.selectAll('TutorialCategory', null, null, null, 1, 1000).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.categories = <TutorialCategoryEntity[]>result.Object;
                this.category = this.categories && this.categories[0];
            }
        }); 
        this.serive.selectAll('Tutorial', null, null, null, 1, 1000).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.items = <TutorialEntity[]>result.Object;
                let interval = setInterval(() => {
                    if (this.category) {
                        clearInterval(interval);
                        this.openTutorials(this.category);
                    }
                }, 100);
            }
        });
    }

    openTutorials(item: TutorialCategoryEntity) {
        this.category = item;
        if (this.items) {
            this.tutorials = _.cloneDeep(this.items.filter(c => c.CategoryId == item.Id));
        }
    }
}
