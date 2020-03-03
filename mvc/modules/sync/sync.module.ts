import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SyncComponent } from './sync.component';
import { SyncTableComponent } from './table/table.component';
import { SyncDatabaseComponent } from './database/database.component';

@NgModule({
  declarations: [
    SyncComponent,
    SyncTableComponent,
    SyncDatabaseComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild([
        { path: '', component: SyncComponent, pathMatch: 'full' },
        { path: '**', component: SyncComponent, pathMatch: 'full' }
    ])
  ]
})
export class SyncModule { }
