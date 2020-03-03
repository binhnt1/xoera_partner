import { VehicleEntity } from './vehicle.entity';
import { WebsiteEntity } from './website.entity';
import { Dictionary } from '../../../../mvc/domains/data/dictionary';
import { BaseExEntity } from '../../../../mvc/domains/entities/base.entity';
import { TableDecorator } from '../../../../mvc/decorators/table.decorator';
import { NumberDecorator } from '../../../../mvc/decorators/number.decorator';
import { StringDecorator } from '../../../../mvc/decorators/string.decorator';
import { BooleanDecorator } from '../../../../mvc/decorators/boolean.decorator';
import { DropDownDecorator } from '../../../../mvc/decorators/dropdown.decorator';
import { StringType, DropDownType } from '../../../../mvc/domains/enums/data.type';
import { DateTimeDecorator, DateTimeFormat } from '../../../../mvc/decorators/datetime.decorator';

@TableDecorator({ name: 'BookingParameters' })
export class BookingParametersEntity extends BaseExEntity {
    @DropDownDecorator({ 
        label: 'Website',
        reference: WebsiteEntity, 
        propertyDisplay: ['SiteName'],
        emptyItem: new Dictionary('0', 'Select Website'), 
    })
    WebsiteId: string;

    @StringDecorator({ max: 255, type: StringType.Text })
    Pickup: string;

    @StringDecorator({ max: 255, type: StringType.Text })
    Dropoff: string;

    @DateTimeDecorator({ min: new Date(), format: DateTimeFormat.DMYHM, label: 'Booking DateTime' })
    BookingdateTime: Date;

    @BooleanDecorator()
    IsAsap: boolean;

    @StringDecorator({ max: 25, type: StringType.Text, showInGrid: false })
    PickupAddressCat: string;

    @StringDecorator({ max: 25, type: StringType.Text, showInGrid: false })
    DropoffAddressCat: string;

    @StringDecorator({ max: 8, type: StringType.Text, showInGrid: false })
    PickupPostcode: string;

    @StringDecorator({ max: 8, type: StringType.Text, showInGrid: false })
    DropoffPostcode: string;

    @NumberDecorator({ step: 0.1, max: 100000, decimals: 2, showInGrid: false })
    PickupLat: number;

    @NumberDecorator({ step: 0.1, max: 100000, decimals: 2, showInGrid: false })
    DropoffLat: number;

    @NumberDecorator({ step: 0.1, max: 100000, decimals: 2, showInGrid: false })
    PickupLng: number;

    @NumberDecorator({ step: 0.1, max: 100000, decimals: 2, showInGrid: false })
    DropoffLng: number;

    @BooleanDecorator()
    IsExpired: boolean;

    @DropDownDecorator({ reference: VehicleEntity, label: 'Vehicle', type: DropDownType.DropdownDevexpress, propertyDisplay: ['RegNumber', 'Model', 'Colour'], propertyValue: 'VehicleID' })
    VehicleId: number;
}
