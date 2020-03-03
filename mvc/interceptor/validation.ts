import { AppConfig } from "../helpers/app.config";
import { ResultApi } from "../domains/data/result.api";
import { MvcApiService } from "../services/api.service";
import { ResultType } from "../domains/enums/result.type";
import { StringEx } from "../decorators/string.decorator";
import { ObjectEx } from "../decorators/object.decorator";
import { MvcEventService } from "../services/event.service";
import { PatternType } from "../domains/enums/pattern.type";
import { DecoratorHelper } from "../helpers/decorator.helper";
import { DataType, StringType } from "../domains/enums/data.type";

export async function validation(target: any, event?: MvcEventService, service?: MvcApiService, columns?: string[]): Promise<boolean> {
    function matchPattern(value: string, pattern: any) {
        return pattern && pattern.test(String(value).toLowerCase());
    }

    let valid: boolean = true;
    let decorators = DecoratorHelper.DecoratorProperties(target);
    if (decorators) {
        for (let i = 0; i < decorators.length; i++) {
            let decorator: ObjectEx = decorators[i];
            decorator.valid = true;
            decorator.message = null;
            event.Validate.emit(decorator);
            let needValid: boolean = true;
            if (columns && columns.length > 0) {
                let column = columns.find(c => c == decorator.property);
                if (!column) needValid = false;
            }
            if (!needValid) continue;

            let value = target[decorator.property],
                vaildProperty: boolean = true;
            if (decorator.required) {
                if (!value) {
                    vaildProperty = false;
                    if (event) {
                        let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.Required);
                        decorator.valid = false;
                        decorator.message = (validator && validator.message) || (decorator.label + ' is required');
                        event.Validate.emit(decorator);
                    }
                }
            }
            if (value) {
                if (vaildProperty) {
                    let validator = decorator.validators && decorator.validators.find(c => c.pattern && typeof c.pattern != 'string');
                    if (validator) {
                        vaildProperty = matchPattern(value, validator.pattern);
                        if (!vaildProperty && event) {
                            decorator.valid = false;
                            decorator.message = (validator && validator.message) || (decorator.label + ' is invalid format');
                            event.Validate.emit(decorator);
                        }
                    }
                }
                if (vaildProperty) {
                    if (decorator.dataType == DataType.String) {
                        let decoratorString: StringEx = decorator;
                        if (vaildProperty) {
                            let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.Max);
                            if (validator) {
                                let length = value ? value.length : 0;
                                vaildProperty = length <= decoratorString.max;
                                if (!vaildProperty && event) {
                                    decorator.valid = false;
                                    decorator.message = (validator && validator.message) || (decorator.label + ' should have at max ' + decoratorString.max + ' characters');
                                    event.Validate.emit(decorator);
                                }
                            }
                        }
                        if (vaildProperty) {
                            let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.Min);
                            if (validator) {
                                let length = value ? value.length : 0;
                                vaildProperty = length >= decoratorString.min;
                                if (!vaildProperty && event) {
                                    decorator.valid = false;
                                    decorator.message = (validator && validator.message) || (decorator.label + ' should have at least ' + decoratorString.min + ' characters');
                                    event.Validate.emit(decorator);
                                }
                            }
                        }
                        if (vaildProperty) {
                            let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.RequiredMatch);
                            if (validator) {
                                let valueMatch = target[decoratorString.requiredMatch];
                                vaildProperty = valueMatch == value;
                                if (!vaildProperty && event) {
                                    decorator.valid = false;
                                    decorator.message = (validator && validator.message) || (decorator.label + ' do not match ' + decoratorString.requiredMatch);
                                    event.Validate.emit(decorator);
                                }
                            }
                        }
                        if (vaildProperty) {
                            let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.CardCvc);
                            if (validator) {
                                let $element = <any>jQuery('#' + decorator.id);
                                if ($element && $element.length > 0) {
                                    vaildProperty = (<any>jQuery).payment.validateCardNumber(value);
                                    if (!vaildProperty && event) {
                                        decorator.valid = false;
                                        decorator.message = (validator && validator.message) || (decorator.label + ' is invalid format');
                                        event.Validate.emit(decorator);
                                    }
                                }
                            }
                        }
                        if (vaildProperty) {
                            if (decoratorString.type == StringType.Phone) {
                                let $element = <any>jQuery('#' + decorator.id);
                                if ($element && $element.length > 0) {
                                    vaildProperty = $element.intlTelInput('isValidNumber');
                                    if (!vaildProperty && event) {
                                        let errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"],
                                            errorCode = $element.intlTelInput('getValidationError'),
                                            errorMessage = errorMap[errorCode];
                                        decorator.valid = false;
                                        decorator.message = decorator.label + ' ' + errorMessage;
                                        event.Validate.emit(decorator);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (valid) valid = vaildProperty;
        }
        if (valid) {
            for (let i = 0; i < decorators.length; i++) {
                let decorator: ObjectEx = decorators[i];
                decorator.valid = true;
                decorator.message = null;
                event.Validate.emit(decorator);
                let needValid: boolean = true;
                if (columns && columns.length > 0) {
                    let column = columns.find(c => c == decorator.property);
                    if (!column) needValid = false;
                }
                if (!needValid) continue;
                let value = target[decorator.property],
                    vaildProperty: boolean = true;
                if (value) {
                    // check exists
                    if (vaildProperty) {
                        let validator = decorator.validators && decorator.validators.find(c => c.pattern && c.pattern == PatternType.Exists);
                        if (validator) {
                            let valueExists = value,
                                valueId = target['Id'],
                                table = validator.table;
                            if (service) {
                                vaildProperty = await service.exists(table, decorator.property, valueId, valueExists).then((result: ResultApi) => {
                                    if (result.Type == ResultType.Success) {
                                        if (result.Object) return false;
                                    }
                                    return true;
                                });
                            }
                            if (!vaildProperty && event) {
                                decorator.valid = false;
                                decorator.message = (validator && validator.message) || (decorator.label + ' does exists');
                                event.Validate.emit(decorator);
                            }
                        }
                    }
                }
                if (valid) valid = vaildProperty;
            }
        }
    }
    return valid;
}