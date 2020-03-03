import { ResultType } from '../enums/result.type';

export class ResultApi {
    public Object: any;
    public Type: ResultType;
    public ObjectExtra?: any;
    public Description: string;

    public constructor(type?: ResultType, object?: any, description?: string) {
        this.Object = object || null;
        this.Description = description || '';
        this.Type = type || ResultType.Success;
    }

    public static ToObject(item: any): ResultApi {
        if (item) {
            return {
                Type: item.Type || item.type,
                Object: item.Object || item.object,
                Description: item.Description || item.description,
                ObjectExtra: item.ObjectExtra || item.objectExtra,
            };
        }
        return new ResultApi();
    }
    
    public static ToEntity(item?: any, extra?: any): ResultApi {
        if (item != null) {
            const entity: ResultApi = {
                Object: item,
                Description: '',
                ObjectExtra: extra,
                Type: ResultType.Success,
            };
            return entity;
        } else {
            const entity: ResultApi = {
                Object: null,
                Description: '',
                Type: ResultType.Success,
            };
            return entity;
        }
    }
    
    public static ToFail(error: string, obj?: any): ResultApi {
        const result: ResultApi = {
            Object: obj,
            Description: error,
            Type: ResultType.Fail,
        };
        return result;
    }
    
    public static ToException(error: any): ResultApi {
        let description: string;
        if (error && error.status == 0)
            description = 'Network failure, please try again.';

        const result: ResultApi = {
            Object: error,
            Type: ResultType.Exception,
            Description: description || error,
        };
        return result;
    }
    
    public static ToExceptionMissToken(): ResultApi {
        const result: ResultApi = {
            Object: null,
            Type: ResultType.Exception,
            Description: 'Bạn không có quyền truy cập thông tin này',
        };
        return result;
    }
}
