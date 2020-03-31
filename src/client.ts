import { AxiosInstance } from 'axios';

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
    Text: string;
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

export class ClientApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Find a list of clients
   * @param params The parameters
   */
  async listClients(params: ListClientsRequest): Promise<Client[]>;

  /**
   * Find a list of clients
   * @param params The parameters
   * @param includeProfile Whether or not to include the full profile
   */
  async listClients(
    params: ListClientsRequest,
    includeProfile: true
  ): Promise<ClientWithProfile[]>;

  async listClients(
    params: ListClientsRequest,
    includeProfile = false
  ): Promise<Client[] | ClientWithProfile[]> {
    const urlParams = [];
    if (params.search) {
      urlParams.push(`search=${params.search}`);
    }
    if (params.page) {
      urlParams.push(`page=${params.page}`);
    }
    if (params.dateCreatedStart) {
      urlParams.push(`dateCreatedStart=${params.dateCreatedStart}`);
    }
    if (params.dateCreatedEnd) {
      urlParams.push(`dateCreatedEnd=${params.dateCreatedEnd}`);
    }
    if (params.custom) {
      Object.keys(params.custom).forEach((fieldId) => {
        urlParams.push(`custom[${fieldId}]=${params.custom[fieldId]}`);
      });
    }
    if (includeProfile) {
      urlParams.push(`includeProfile=true`);
    }
    const res = await this.api.get<ClientWithProfile[] | ClientReceived[]>(
      `clients?${urlParams.join('&')}`
    );

    // Rename inconsistent ClientNumber to be ClientId like the rest of the endpoints
    if (!includeProfile) {
      return (res.data as ClientReceived[]).map(({ ClientNumber, ...val }) => ({
        ...val,
        ClientId: ClientNumber,
      }));
    }
    return res.data as ClientWithProfile[];
  }

  /**
   * Find a client by its email address
   * @param email Email address to find
   */
  async getClientByEmail(email: string): Promise<ClientWithProfile> {
    const res = await this.listClients({ search: email }, true);
    return res[0];
  }

  /**
   * Save a client
   * @param client The client object to save
   */
  async save(client: Partial<ClientWithProfile>): Promise<ClientWithProfile> {
    const res = await this.api.post<ClientWithProfile>('clients', client);
    return res.data;
  }

  /**
   * Add a Tag to a Client
   * @param clientId The id of the client to tag
   * @param tag The tag to set
   */
  async addTag(clientId: number, tag: string): Promise<ClientTag> {
    const res = await this.api.post<ClientTag>('clientTags', {
      ClientId: clientId,
      Tag: tag,
    });
    return res.data;
  }

  /**
   * Remove a Tag from a Client
   * @param clientId The id of the client to remove the tag from
   * @param tag The tag to remove
   */
  async removeTag(clientId: number, tag: string): Promise<void> {
    await this.api.delete(`clientTags?clientId=${clientId}&tag=${tag}`);
  }
}
