
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { XoeraPartnerNewsComponent } from '../components/news/news.component';

@NgModule({
  declarations: [
    DashboardComponent,
    XoeraPartnerNewsComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full' }
    ])
  ]
})
export class DashboardModule { }
