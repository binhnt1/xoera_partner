
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackGridComponent } from './grid/feedback.grid.component';
import { FeedbackEditComponent } from './edit/feedback.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        FeedbackGridComponent,
        FeedbackEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: FeedbackGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: FeedbackGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: FeedbackEditComponent },
                    { path: 'edit', component: FeedbackEditComponent },
                ]
            }
        ])
    ]
})
export class FeedbackModule { }
