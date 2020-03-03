import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { MenuPageDto } from '../domains/objects/menu.page.dto';
import { SystemParameter } from '../domains/data/system.parameter';
import { MvcDataService } from '../../../mvc/services/data.service';
import { SearchAddressType } from '../domains/enums/search.address.type';

@Injectable()
export class DataService extends MvcDataService {
    public pages: MenuPageDto[];
    public SearchAddressType: SearchAddressType;
    public SystemParameter: SystemParameter = new SystemParameter();
}
