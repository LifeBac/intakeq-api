import axios, { AxiosInstance } from 'axios';
import { ClientApi } from './client';

class IntakeQApi {
  protected api: AxiosInstance;

  public Client: ClientApi;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://intakeq.com/api/v1',
      timeout: 5000,
      headers: { 'X-Auth-Key': apiKey },
    });

    this.Client = new ClientApi(this.api);
  }
}

export { IntakeQApi };

export default IntakeQApi;
