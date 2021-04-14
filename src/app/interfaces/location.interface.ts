export interface Location {
    ID: number
    Label: string;
    DescriptiveInformation: string;
    Address: {
        Postalcode: string,
        City: string,
        Street: string
    };
}
