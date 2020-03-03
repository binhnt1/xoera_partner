import { Address } from "../data/address";
import { PickType } from "../enums/pickup.type";
import { ReturnType } from "../enums/return.type";
import { RouterType } from "../enums/router.type";
import { DriverType } from "../enums/driver.type";
import { PaymentType } from "../enums/payment.type";
import { VehicleType } from "../enums/vehicle.type";
import { UtilityHelper } from "../../../../mvc/helpers/utility.helper";
import { TableDecorator } from "../../../../mvc/decorators/table.decorator";
import { StringDecorator } from "../../../../mvc/decorators/string.decorator";
import { NumberDecorator } from "../../../../mvc/decorators/number.decorator";
import { BooleanDecorator } from "../../../../mvc/decorators/boolean.decorator";
import { DropDownDecorator } from "../../../../mvc/decorators/dropdown.decorator";
import { DropDownType, StringType, DateTimeType } from "../../../../mvc/domains/enums/data.type";
import { DateTimeDecorator, DateTimeFormat } from "../../../../mvc/decorators/datetime.decorator";

@TableDecorator({ name: 'BookingDto' })
export class BookingDto {
  Id: number;
  Key: string;
  PickUp: Address;
  PickDown: Address;
  ViaAddress: Address[];

  @DropDownDecorator({ required: true, enumType: PickType, type: DropDownType.List, multiple: false })
  public PickType: number;

  @DropDownDecorator({ required: true, data: [{ key: 1, value: 'Single' }, { key: 2, value: 'Wait & Return' }], type: DropDownType.List, multiple: false })
  public ReturnType: number;

  @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
  DateTime: Date;

  @DateTimeDecorator({ min: new Date(), type: DateTimeType.DateTime, format: DateTimeFormat.DMYHM })
  ReturnDateTime: Date;

  @DropDownDecorator({ required: true, enumType: VehicleType, icon: 'fa fa-car-alt' })
  public Vehicle: number;

  @DropDownDecorator({ required: true })
  public Fleet: number;

  @DropDownDecorator({ required: true })
  public Booker: number;

  @StringDecorator({ type: StringType.Code })
  public BookerRef: string;

  @DropDownDecorator({ required: true, enumType: PaymentType })
  public Payment: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public PaymentCard: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public PaymentCash: number;

  @BooleanDecorator({ default: false })
  public PaymentMade: boolean;

  @DropDownDecorator({ required: true })
  public Account: number;

  @StringDecorator({ type: StringType.Code })
  public AccountCustomerRef: string;

  @StringDecorator({ type: StringType.Text })
  public AccountAuthorisedBy: string;

  @BooleanDecorator({ default: false })
  public AccountSignatureRequired: boolean;

  @DropDownDecorator({ required: true, enumType: DriverType, type: DropDownType.List, multiple: false })
  public DriverType: number;

  @DropDownDecorator({ required: true, data: [{ key: 1, value: 'Static' }, { key: 2, value: 'Traffic Aware' }], type: DropDownType.List, multiple: false })
  public RouterType: number;

  @DropDownDecorator({ required: true })
  public Driver: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverTopup: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverEarning: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverPrice: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverParking: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverBookingFee: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverBookerCommFixed: number;

  @NumberDecorator({ step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Card', default: 0 })
  public DriverBookerCommPercent: number;

  @DropDownDecorator({ required: true, items: ['1', '2', '3', '4', '5', '6', '7', '8'], icon: 'fa fa-user-friends' })
  public Passenger: number;

  @DropDownDecorator({ required: false, items: ['1', '2', '3', '4', '5', '6'], icon: 'fa fa-luggage-cart' })
  public Luggage: number;

  @DropDownDecorator({ required: false, items: ['1', '2', '3', '4', '5', '6'], icon: 'fa fa-shopping-bag' })
  public HandBag: number;

  @StringDecorator({ type: StringType.MultiText, placeholder: 'Notes to Driver', rows: 5 })
  public DriverNote: string;

  @StringDecorator({ type: StringType.MultiText, rows: 3 })
  public OfficeNote: string;

  @StringDecorator({ type: StringType.Phone })
  public PassengerPhone: string;

  @StringDecorator({ type: StringType.Account })
  public PassengerName: string;

  @StringDecorator({ type: StringType.Phone })
  public CallerPhone: string;

  @StringDecorator({ type: StringType.Account })
  public CallerName: string;

  @StringDecorator({ type: StringType.Account, placeholder: 'Surname' })
  public CallerSurName: string;

  @StringDecorator({ type: StringType.Email, placeholder: 'Email' })
  public CallerEmail: string;

  @BooleanDecorator({ description: 'Blacklisted' })
  public CallerBlacklisted: boolean;

  @StringDecorator({ type: StringType.MultiText, rows: 3, placeholder: 'Comments' })
  public CallerComments: string;

  @StringDecorator({ type: StringType.MultiText, rows: 3, placeholder: 'Notes' })
  public CallerNotes: string;

  @NumberDecorator({ step: 1, max: 5 })
  public CallerRating: number;

  @NumberDecorator({ required: true, step: 0.1, min: 0, max: 10000, decimals: 2, placeholder: 'Price', default: 0 })
  public Price: number;

  @StringDecorator({ type: StringType.Text })
  public PickUpZone: string;

  @NumberDecorator({ step: 1, max: 10000 })
  public PickUpZoneId: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public PickUpZoneParking: number;

  @StringDecorator({ type: StringType.Text })
  public DropOffZone: string;

  @NumberDecorator({ step: 1, max: 10000 })
  public DropOffZoneId: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public DropOffZoneParking: number;

  @NumberDecorator({ required: true, step: 1, min: 0, max: 10, default: 0 })
  public NoOfVehicles: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public PickUpLeadTime: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public DropOffLeadTime: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public RouterDistance: number;

  @StringDecorator({ type: StringType.Text })
  public NearestDriver: string;

  @NumberDecorator({ step: 1, max: 10000 })
  public TravelTime: number;

  @NumberDecorator({ step: 1, max: 10000 })
  public TravelTimeFromDriver: number;

  @NumberDecorator({ step: 0.01, max: 10000 })
  public DistanceFromDriver: number;

  @StringDecorator({ type: StringType.Text })
  public FlightNumber: string;

  @StringDecorator({ type: StringType.Text })
  public ArrivingFrom: string;

  @NumberDecorator({ step: 1, max: 1000 })
  public WaitingCharge: number;

  @BooleanDecorator({ default: false, description: 'Meet & Greet' })
  public MeetAndGreet: boolean;

  @NumberDecorator({ step: 1, max: 2 })
  public SmallChildSeat: number;

  @NumberDecorator({ step: 1, max: 2 })
  public LargeChildSeat: number;

  @NumberDecorator({ step: 1, max: 2 })
  public SmallPet: number;

  @NumberDecorator({ step: 1, max: 2 })
  public LargePet: number;

  @BooleanDecorator({ default: true, description: 'Booking Confirmation SMS' })
  public BookingConfirmationSms: boolean;

  @StringDecorator({ type: StringType.Text })
  Ip: string;

  constructor() {    
    this.PickType = PickType.Now;
    this.RouterType = RouterType.Static;
    this.ReturnType = ReturnType.Signle;
    this.DriverType = DriverType.Allocate;
    this.Key = UtilityHelper.randomText(8);
    this.ViaAddress = [];
  }
}
