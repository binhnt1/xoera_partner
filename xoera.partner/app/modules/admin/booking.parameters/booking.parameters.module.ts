
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { BookingParametersGridComponent } from './grid/booking.parameters.grid.component';
import { BookingParametersEditComponent } from './edit/booking.parameters.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        BookingParametersGridComponent,
        BookingParametersEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: BookingParametersGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: BookingParametersGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: BookingParametersEditComponent },
                    { path: 'edit', component: BookingParametersEditComponent },
                ]
            }
        ])
    ]
})
export class BookingParametersModule { }
