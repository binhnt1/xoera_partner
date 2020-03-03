
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeviceGridComponent } from './grid/device.grid.component';
import { DeviceEditComponent } from './edit/device.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        DeviceGridComponent,
        DeviceEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: DeviceGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: DeviceGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: DeviceEditComponent },
                    { path: 'edit', component: DeviceEditComponent },
                ]
            }
        ])
    ]
})
export class DeviceModule { }
