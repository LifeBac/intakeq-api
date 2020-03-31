import axios, { AxiosInstance } from 'axios';
import { ClientApi } from './client/api';
import { AppointmentApi } from './appointment/api';

export class IntakeQApi {
  protected api: AxiosInstance;

  public Client: ClientApi;

  public Appointment: AppointmentApi;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://intakeq.com/api/v1',
      timeout: 5000,
      headers: { 'X-Auth-Key': apiKey },
    });

    this.Client = new ClientApi(this.api);
    this.Appointment = new AppointmentApi(this.api);
  }
}

export * from './client/interfaces';

export default IntakeQApi;
