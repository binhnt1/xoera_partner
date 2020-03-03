import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../../mvc/helpers/api.url.helper';
import { FileType } from '../../mvc/domains/enums/data.type';
import { ResultApi } from '../../mvc/domains/data/result.api';
import { UploadData } from '../../mvc/domains/data/upload.data';
import { MethodType } from '../../mvc/domains/enums/method.type';
import { LoginDto } from '../../mvc/domains/objects/account.dto';

@Injectable()
export class MvcApiService {

    constructor(protected http: HttpClient) {
    }

    async databases(): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('databases');
        return await this.ToResultApi(api);
    }

    async tables(): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('tables', []);
        return await this.ToResultApi(api);
    }

    async upload(item: UploadData) {
        let fd = new FormData(),
            result: ResultApi = null,
            type = item.type == FileType.Image ? 'image' : 'file',
            api = ApiUrl.ToUrl('upload/' + type);

        fd.append(type, item.data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 || xhr.status == 201)
                    result = <ResultApi>JSON.parse(xhr.responseText);
                else result = ResultApi.ToException(xhr.responseText);
            }
        }
        if (item.processFunction) {
            xhr.onprogress = (e) => {
                const percent = Math.round((e.loaded / e.total) * 100);
                item.processFunction(percent);
            }
        }
        if (item.completeFunction) {
            xhr.onload = (e) => {
                item.completeFunction(result);
            }
        }
        if (item.failFunction) {
            xhr.onerror = (e) => {
                item.failFunction(e);
            }
        }
        if (item.cancelFunction) {
            xhr.onabort = (e) => {
                item.cancelFunction(e);
            }
        }
        xhr.open("POST", api, false);
        await xhr.send(fd);
    }

    async login(obj: LoginDto): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('account/login', [
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async columns(table: string): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('columns', [{ key: 'table', value: table }]);
        return await this.ToResultApi(api);
    }

    async insert(table: string, obj: any): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('curd/insert', [
            { key: 'table', value: table },
        ]);
        return await this.ToResultApi(api, MethodType.Post, obj);
    }

    async update(table: string, obj: any, columns?: any): Promise<ResultApi> {
        let columnString = columns ? typeof columns == 'string' ? columns : (<string[]>columns).join(",") : null;
        const api = ApiUrl.ToUrl('curd/update', [
            { key: 'table', value: table },
            { key: 'columns', value: columnString || '' },
        ]);
        delete obj.TableEx;
        return await this.ToResultApi(api, MethodType.Put, obj);
    }

    async count(table: string, filters?: any): Promise<ResultApi> {
        let filterString = filters ? typeof filters == 'string' ? filters : JSON.stringify(filters) : null;
        const api = ApiUrl.ToUrl('curd/count', [
            { key: 'table', value: table },
            { key: 'filters', value: filterString || '' },
        ]);
        return await this.ToResultApi(api);
    }

    async delete(table: string, objIds: any): Promise<ResultApi> {
        if (!objIds) objIds = 0;
        if (typeof objIds == 'number') {
            const api = ApiUrl.ToUrl('curd/delete', [
                { key: 'table', value: table },
                { key: 'objId', value: objIds },
            ]);
            return await this.ToResultApi(api, MethodType.Delete);
        } else {
            let objIdString = objIds ? typeof objIds == 'number' ? objIds : (<number[]>objIds).join(",") : null;
            const api = ApiUrl.ToUrl('curd/delete', [
                { key: 'table', value: table },
                { key: 'objIds', value: objIdString },
            ]);
            return await this.ToResultApi(api, MethodType.Delete);
        }
    }

    async deleteByFilter(table: string, filters?: any): Promise<ResultApi> {
        let filterString = filters ? typeof filters == 'string' ? filters : JSON.stringify(filters) : null;
        const api = ApiUrl.ToUrl('curd/delete', [
            { key: 'table', value: table },
            { key: 'filters', value: filterString || '' },
        ]);
        return await this.ToResultApi(api, MethodType.Delete);
    }

    async selectOne(table: string, objId?: number, columns?: any): Promise<ResultApi> {
        let columnString = columns ? typeof columns == 'string' ? columns : (<string[]>columns).join(",") : null;
        const api = ApiUrl.ToUrl('curd/findOne', [
            { key: 'table', value: table },
            { key: 'objId', value: objId || 0 },
            { key: 'columns', value: columnString || '' },
        ]);
        return await this.ToResultApi(api);
    }

    async selectOneByFilter(table: string, filters?: any, columns?: any): Promise<ResultApi> {
        let filterString = filters ? typeof filters == 'string' ? filters : JSON.stringify(filters) : null;
        let columnString = columns ? typeof columns == 'string' ? columns : (<string[]>columns).join(",") : null;
        const api = ApiUrl.ToUrl('curd/findOneByFilter', [
            { key: 'table', value: table },
            { key: 'columns', value: columnString || '' },
            { key: 'filters', value: filterString || '' },
        ]);
        return await this.ToResultApi(api);
    }

    async exists(table: string, column: string, objId?: number, objExists?: any): Promise<ResultApi> {
        const api = ApiUrl.ToUrl('curd/exists', [
            { key: 'table', value: table },
        ]);
        return await this.ToResultApi(api, MethodType.Post, {
            objId: objId || 0,
            column: column || '',
            objExists: objExists,
        });
    }

    async selectTop(table: string, columns?: any, filters?: any, orders?: any, top?: number): Promise<ResultApi> {
        return this.selectAll(table, columns, filters, orders, 1, top);
    }

    async selectAll(table: string, columns?: any, filters?: any, orders?: any, page?: number, size?: number): Promise<ResultApi> {
        let orderString = orders ? typeof orders == 'string' ? orders : JSON.stringify(orders) : null;
        let filterString = filters ? typeof filters == 'string' ? filters : JSON.stringify(filters) : null;
        let columnString = columns ? typeof columns == 'string' ? columns : (<string[]>columns).join(",") : null;
        const api = ApiUrl.ToUrl('curd/findAll', [
            { key: 'table', value: table },
            { key: 'page', value: page || 1 },
            { key: 'size', value: size || 20 },
            { key: 'orders', value: orderString || '' },
            { key: 'filters', value: filterString || '' },
            { key: 'columns', value: columnString || '' },
        ]);
        return await this.ToResultApi(api);
    }

    protected async ToResultApi(api: string, type: MethodType = MethodType.Get, params: any = null, headers: any = null): Promise<ResultApi> {
        if (!headers) {
            headers = new Headers();
            headers.append('Content-Type', 'application/json');
        }
        switch (type) {
            case MethodType.Get: {
                return await this.http
                    .get(api)
                    .toPromise()
                    .then(c => { return ResultApi.ToObject(c); })
                    .catch(e => {
                        return ResultApi.ToException(e);
                    });
            }
            case MethodType.Put: {
                return await this.http
                    .put(api, params, { headers: headers })
                    .toPromise()
                    .then(c => { return ResultApi.ToObject(c); })
                    .catch(e => {
                        return ResultApi.ToException(e);
                    });
            }
            case MethodType.Post: {
                return await this.http
                    .post(api, params, { headers: headers })
                    .toPromise()
                    .then(c => { return ResultApi.ToObject(c); })
                    .catch(e => {
                        return ResultApi.ToException(e);
                    });
            }
            case MethodType.Delete: {
                return await this.http
                    .delete(api, { headers: headers })
                    .toPromise()
                    .then(c => { return ResultApi.ToObject(c); })
                    .catch(e => {
                        return ResultApi.ToException(e);
                    });
            }
        }
    }
}
