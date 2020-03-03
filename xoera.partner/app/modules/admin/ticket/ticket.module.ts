
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TicketGridComponent } from '../../client/ticket/grid/ticket.grid.component';
import { TicketViewComponent } from '../../client/ticket/view/ticket.view.component';
import { TemplateEmptyComponent } from '../../../../../mvc/templates/empty/template.empty.component';

@NgModule({
    declarations: [
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateEmptyComponent,
                children: [
                    { path: '', component: TicketGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TicketGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEmptyComponent,
                children: [
                    { path: 'new', component: TicketViewComponent },
                    { path: 'edit', component: TicketViewComponent },
                    { path: 'view', component: TicketViewComponent },
                ]
            }
        ])
    ]
})
export class TicketModule { }
