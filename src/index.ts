import axios, { AxiosInstance } from 'axios';
import { AppointmentApi } from './appointment/api';
import { ClientApi } from './client/api';
import { InvoiceApi } from './invoice/api';
import { NotesApi } from './notes/api';
import { QuestionnaireApi } from './questionnaire/api';

export class IntakeQApi {
  protected api: AxiosInstance;

  public Appointment: AppointmentApi;

  public Client: ClientApi;

  public Invoice: InvoiceApi;

  public Notes: NotesApi;

  public Questionnaire: QuestionnaireApi;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://intakeq.com/api/v1',
      timeout: 5000,
      headers: { 'X-Auth-Key': apiKey },
    });

    this.Appointment = new AppointmentApi(this.api);
    this.Client = new ClientApi(this.api);
    this.Invoice = new InvoiceApi(this.api);
    this.Notes = new NotesApi(this.api);
    this.Questionnaire = new QuestionnaireApi(this.api);
  }
}

export * from './appointment/interfaces';
export * from './client/interfaces';
export * from './notes/interfaces';
export * from './questionnaire/interfaces';
