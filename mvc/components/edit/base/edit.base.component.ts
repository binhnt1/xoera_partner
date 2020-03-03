import * as _ from "lodash";
import { Router } from "@angular/router";
import { AppConfig } from "../../../helpers/app.config";
import { RouterHelper } from "../../../../mvc/helpers/router.helper";
import { ActionData } from "../../../../mvc/domains/data/action.data";
import { MvcDataService } from "../../../../mvc/services/data.service";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { MvcEventService } from "../../../../mvc/services/event.service";

export class EditBaseComponent {
  tools: ActionData[];
  actions: ActionData[];

  item: any;
  loading: boolean;
  decorators: ObjectEx[];

  constructor(
    public target: any,
    public router: Router,
    public data: MvcDataService,
    public event: MvcEventService,
    public menuTools?: ActionData[],
    public menuActions?: ActionData[]) {
    this.loading = true;    
    this.data.entity(target, (item: any, decorators: ObjectEx[]) => {
      this.item = item;
      let editEcorators = _.cloneDeep(decorators).filter(c => c.showInEdit);
      if (editEcorators) {
        editEcorators = _.orderBy(editEcorators, c => c.order, 'asc');
        editEcorators.forEach((decorator: ObjectEx) => {
          decorator.valid = true;
          decorator.message = '';
          decorator.editable = true;
        });
        this.decorators = editEcorators;
      }
      this.loading = false;
    });


    this.tools = menuTools;
    this.actions = menuActions;
    if (RouterHelper.IsNewPage(this.router)) {
      if (this.tools == undefined || this.tools == null) {
        this.tools = [];
        this.tools.push(ActionData.toolboxRefresh(this.router));
        this.tools.push(ActionData.toolboxDivider());
        this.tools.push(ActionData.toolboxBack(this.router));
      }

      if (this.actions == undefined || this.actions == null) {
        this.actions = [];
        this.actions.push(ActionData.save(this.router, () => {
          this.event.Save.emit(this.item);
        }));
        this.actions.push(ActionData.back(this.router));
      }
    } else if (RouterHelper.IsEditPage(this.router)) {
      if (this.tools == undefined || this.tools == null) {
        this.tools = [];
        this.tools.push(ActionData.toolboxRefresh(this.router));
        this.tools.push(ActionData.toolboxAddNew(this.router));
        this.tools.push(ActionData.toolboxClone(this.router));
        this.tools.push(ActionData.toolboxInformation(this.router));
        this.tools.push(ActionData.toolboxDivider());
        if (AppConfig.EnableDeleted) {
          this.tools.push(ActionData.toolboxDelete(() => {
            this.event.Delete.emit(this.item);
          }));
        }
        this.tools.push(ActionData.toolboxBack(this.router));
      }

      if (this.actions == undefined || this.actions == null) {
        this.actions = [];
        this.actions.push(ActionData.save(this.router, () => {
          this.event.Save.emit(this.item);
        }));
        if (AppConfig.EnableDeleted) {
          this.actions.push(ActionData.delete(() => {
            this.event.Delete.emit(this.item);
          }));
        }
        this.actions.push(ActionData.back(this.router));
      }
    }
  }
}
