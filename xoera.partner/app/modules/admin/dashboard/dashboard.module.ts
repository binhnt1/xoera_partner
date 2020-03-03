
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full' }
    ])
  ]
})
export class DashboardModule { }
