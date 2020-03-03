
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Error404Component } from './404/404.component';
import { Error503Component } from './503/503.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        Error404Component,
        Error503Component
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: Error404Component, pathMatch: 'full' },
            { path: '404', component: Error404Component, pathMatch: 'full' },
            { path: '503', component: Error503Component, pathMatch: 'full' },
            { path: '**', component: Error404Component, pathMatch: 'full' },
        ])
    ]
})
export class ErrorModule { }
