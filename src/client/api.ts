import { AxiosInstance } from 'axios';
import {
  ListClientsRequest,
  Client,
  ClientWithProfile,
  ClientReceived,
  ClientTag,
} from './interfaces';

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
