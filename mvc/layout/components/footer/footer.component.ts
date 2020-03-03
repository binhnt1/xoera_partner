import { Component, OnInit, Input } from '@angular/core';
import { ThemeType, ThemeTypeAware } from '../../../domains/enums/theme.type';

@ThemeTypeAware
@Component({    
    selector: 'layout-metronic-footer',
    templateUrl: 'footer.component.html'
})
export class LayoutMetronicFooterComponent implements OnInit {
    @Input() theme: ThemeType;

    ngOnInit() {
        if (!this.theme) this.theme = ThemeType.Metronic;
    }
}
