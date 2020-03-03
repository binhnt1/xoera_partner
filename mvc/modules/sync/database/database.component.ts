import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DatabaseDto } from '../../../../mvc/domains/objects/database.dto';

@Component({
  selector: 'app-mvc-sync-database',
  templateUrl: './database.component.html',
})
export class SyncDatabaseComponent {
  @Input() databases: DatabaseDto[];
  @Output() selectDatabase = new EventEmitter();

  constructor() {    
  }

  public choiceDatabase(item: DatabaseDto) {
    this.selectDatabase.emit(item);
  }
}
