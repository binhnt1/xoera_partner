import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VertifyComponent } from './vertify.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        VertifyComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: VertifyComponent, pathMatch: 'full' },
        ])
    ]
})
export class VertifyModule { }
