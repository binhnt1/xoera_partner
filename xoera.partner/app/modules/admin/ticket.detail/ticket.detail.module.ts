
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TicketDetailGridComponent } from './grid/ticket.detail.grid.component';
import { TicketDetailEditComponent } from './edit/ticket.detail.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        TicketDetailGridComponent,
        TicketDetailEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: TicketDetailGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TicketDetailGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: TicketDetailEditComponent },
                    { path: 'edit', component: TicketDetailEditComponent },
                ]
            }
        ])
    ]
})
export class TicketDetailModule { }
