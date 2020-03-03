
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { BookingEngineLicenceGridComponent } from './grid/booking.engine.licence.grid.component';
import { BookingEngineLicenceEditComponent } from './edit/booking.engine.licence.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        BookingEngineLicenceGridComponent,
        BookingEngineLicenceEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: BookingEngineLicenceGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: BookingEngineLicenceGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: BookingEngineLicenceEditComponent },
                    { path: 'edit', component: BookingEngineLicenceEditComponent },
                ]
            }
        ])
    ]
})
export class BookingEngineLicenceModule { }
