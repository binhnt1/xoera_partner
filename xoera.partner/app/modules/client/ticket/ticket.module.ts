
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TicketGridComponent } from './grid/ticket.grid.component';
import { TicketEditComponent } from './edit/ticket.edit.component';
import { TicketViewComponent } from './view/ticket.view.component';

@NgModule({
  declarations: [
    TicketEditComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
        {
            path: '',
            component: TicketGridComponent,
            children: [
                { path: '', component: TicketGridComponent, pathMatch: 'full' },
                { path: 'grid', component: TicketGridComponent },
            ]
        },
        {
            path: '',
            component: TicketEditComponent,
            children: [
                { path: 'new', component: TicketEditComponent },
                { path: 'edit', component: TicketEditComponent },
            ]
        },
        {
            path: '',
            component: TicketViewComponent,
            children: [
                { path: 'view', component: TicketViewComponent },
            ]
        }
    ])
  ]
})
export class TicketModule { }
