import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApprovedComponent } from './approved.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        ApprovedComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: ApprovedComponent, pathMatch: 'full' },
        ])
    ]
})
export class ApprovedModule { }
