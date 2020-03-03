import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../mvc/helpers/api.url.helper';
import { TicketEntity } from '../domains/entities/ticket.entity';
import { MvcApiService } from '../../../mvc/services/api.service';
import { ResultApi } from '../../../mvc/domains/data/result.api';
import { FilterData } from '../../../mvc/domains/data/filter.data';
import { MethodType } from '../../../mvc/domains/enums/method.type';
import { CompareType } from '../../../mvc/domains/enums/compare.type';
import { TicketDetailEntity } from '../domains/entities/ticket.detail.entity';
import { UserAgreementEntity } from '../domains/entities/user.agreement.entity';
import { LoginDto, RegisterDto, RegisterVertifyDto } from '../domains/objects/user.dto';

@Injectable()
export class ApiService extends MvcApiService {

    async menupages(): Promise<ResultApi> {
        let page = 1,
            size = 1000,
            table = 'MenuPage',
            columns = ['Id', 'Name', 'Link', 'Icon', 'SvgIcon', 'IsShow', 'Order', 'ParentId', 'IsActive'].join(',');
        return this.selectAll(table, columns, null, null, page, size);
    }

    async menupage(link: string): Promise<ResultApi> {
        if (link.indexOf('/') != 0) link = '/' + link;
        let filters: FilterData[] = [{
            value: link,
            name: 'Link',
            compare: CompareType.S_Equals,
        }],
            table = 'MenuPage';
        return this.selectOneByFilter(table, filters);
    }

    async getAgreement(userId: number): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/agreement/getAgreement', [
            { key: 'userId', value: userId },
        ]);
        return await this.ToResultApi(api, MethodType.Get);
    }

    async acceptAgreement(entity: UserAgreementEntity): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/agreement/acceptAgreement', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, entity);
    }

    async signin(obj: LoginDto): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/user/signin', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async register(obj: RegisterDto): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/user/register', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async registerVertify(obj: RegisterVertifyDto): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/user/registerVertify', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async registerSendEmail(obj: RegisterVertifyDto): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/user/registerSendEmail', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async addNewTicket(entity: TicketEntity): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/ticket/addNewTicket', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, entity);
    }

    async assignTicket(entity: TicketEntity): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/ticket/assignTicket', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, entity);
    }

    async reOpenTicket(entity: TicketEntity): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/ticket/reOpenTicket', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, entity);
    }

    async addNewTicketDetail(entity: TicketDetailEntity): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('/ticket/addNewTicketDetail', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, entity);
    }
}
