export interface Device {
    ID: number;
    Label: string;
    DescriptiveInformation: string;
    SerialNumber: string;
    Manufacturer: string;
    Model: string;
    RentStart: Date | string;
    ExpectedReturn: Date | string;
    LocationID: number;
    PersonID: number;
}