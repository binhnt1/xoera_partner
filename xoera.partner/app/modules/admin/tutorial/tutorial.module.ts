
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TutorialGridComponent } from './grid/tutorial.grid.component';
import { TutorialEditComponent } from './edit/tutorial.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        TutorialGridComponent,
        TutorialEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: TutorialGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TutorialGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: TutorialEditComponent },
                    { path: 'edit', component: TutorialEditComponent },
                ]
            }
        ])
    ]
})
export class TutorialModule { }
