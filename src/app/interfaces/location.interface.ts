export interface Location {
    ID: number,
    label: string,
    DescriptiveInformation: string,
    Address: {
        Postalcode: string,
        City: string;
        Street: string;
    };
}
