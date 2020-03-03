import { Component, Input } from '@angular/core';
import { TableDto } from '../../../../mvc/domains/objects/table.dto';

@Component({
  styleUrls: ['./table.scss'],
  selector: 'app-mvc-sync-table',
  templateUrl: './table.component.html',
})
export class SyncTableComponent {
  @Input() tables: TableDto[];

  constructor() {    
  }
}
