export interface ClientReceived {
  ClientNumber: number;
  Name: string;
  Email: string;
  Phone: string;
}

export interface Client {
  ClientId: number;
  Name: string;
  Email: string;
  Phone: string;
}

export interface ClientWithProfile extends Client {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  DateOfBirth: number; // Unix timestamp
  MaritalStatus: string;
  Gender: string;
  Tags: string[];
  Archived: boolean;
  HomePhone: string;
  WorkPhone: string;
  MobilePhone: string;
  Address: string;
  UnitNumber: string;
  StreetAddress: string;
  City: string;
  StateShort: string;
  Country: string;
  PostalCode: string;
  AdditionalInformation: string;
  PrimaryInsuranceCompany: string;
  PrimaryInsurancePolicyNumber: string;
  PrimaryInsuranceGroupNumber: string;
  PrimaryInsuranceHolderName: string;
  PrimaryInsuranceRelationship: string;
  PrimaryInsuranceHolderDateOfBirth: number; // Unix timestamp,
  SecondaryInsuranceCompany: string;
  SecondaryInsurancePolicyNumber: string;
  SecondaryInsuranceGroupNumber: string;
  SecondaryInsuranceHolderName: string;
  SecondaryInsuranceRelationship: string;
  SecondaryInsuranceHolderDateOfBirth: number; // Unix timestamp,
  DateCreated: number; // Unix timestamp,
  LastActivityDate: number; // Unix timestamp,
  CustomFields: {
    FieldId: string;
    Text?: string;
    Value: string;
  }[];
  // Undocumented in the docs, but it is returned
  PractitionerId: string;
  Guid: string;
}

export interface ClientTag {
  ClientId: number;
  Tag: string;
}

export interface ListClientsRequest {
  search?: string;
  page?: number;
  dateCreatedStart?: string;
  dateCreatedEnd?: string;
  custom?: {
    [fieldId: string]: string;
  };
}
