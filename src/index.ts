import axios, { AxiosInstance } from 'axios';

class IntakeQApi {
  protected api: AxiosInstance;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://intakeq.com/api/v1',
      timeout: 5000,
      headers: { 'X-Auth-Key': apiKey },
    });
  }
}

export { IntakeQApi };

export default IntakeQApi;
