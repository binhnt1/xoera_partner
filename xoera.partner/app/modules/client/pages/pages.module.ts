
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: PagesComponent, pathMatch: 'full' },
        ])
    ]
})
export class PagesModule { }
