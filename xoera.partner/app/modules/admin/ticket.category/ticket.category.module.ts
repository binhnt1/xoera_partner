
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TicketCategoryGridComponent } from './grid/ticket.category.grid.component';
import { TicketCategoryEditComponent } from './edit/ticket.category.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        TicketCategoryGridComponent,
        TicketCategoryEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: TicketCategoryGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TicketCategoryGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: TicketCategoryEditComponent },
                    { path: 'edit', component: TicketCategoryEditComponent },
                ]
            }
        ])
    ]
})
export class TicketCategoryModule { }
