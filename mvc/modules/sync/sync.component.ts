import { Component } from '@angular/core';
import { ResultApi } from '../../../mvc/domains/data/result.api';
import { TableDto } from '../../../mvc/domains/objects/table.dto';
import { MvcApiService } from "../../../mvc/services/api.service";
import { ResultType } from '../../../mvc/domains/enums/result.type';
import { DatabaseDto } from '../../../mvc/domains/objects/database.dto';

@Component({
  selector: 'app-mvc-sync',
  templateUrl: './sync.component.html',
})
export class SyncComponent {
  public tables: TableDto[];
  public databases: DatabaseDto[];

  constructor(private service: MvcApiService) {
    this.loadDatabases();
  }

  public loadDatabases() {
    this.service.databases().then((result: ResultApi) => {
      if (result.Type == ResultType.Success) {
        this.databases = <DatabaseDto[]>result.Object;
      }
    });
  }

  public loadTables(database: DatabaseDto) {
    this.service.tables().then((result: ResultApi) => {
      if (result.Type == ResultType.Success) {
        this.tables = <TableDto[]>result.Object;
      }
    });
  }
}
