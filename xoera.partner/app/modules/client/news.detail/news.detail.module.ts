
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { XoeraPartnerNewsDetailComponent } from './news.detail.component';

@NgModule({
  declarations: [
    XoeraPartnerNewsDetailComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: XoeraPartnerNewsDetailComponent, pathMatch: 'full' }
    ])
  ]
})
export class NewsDetailModule { }
