import { AxiosInstance } from 'axios';
import {
  ListIntakeFormsRequest,
  IntakeFormSummary,
  IntakeForm,
  Questionnaire,
  Practitioner,
  SendQuestionnaireRequest,
} from './interfaces';

const ENDPOINT = 'intakes';
const QUESTIONNAIRE_ENDPOINT = 'questionnaires';
const PRACTITIONER_ENDPOINT = 'practitioners';

export class QuestionnaireApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Use this method to query client intake form summaries. The result set does not contain all the contents of the intake forms, but only their basic information (id, status, client info).
   * @param params.client A string used to search the client by name or email. Partial matches will be respected, so a search for "Paul" will return all intakes for clients with Paul in their names. Likewise, a search for "paul.smith@gmail.com" will return all intakes for that specific client.
   * @param params.startDate Return only intakes that were created after the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.endDate Return only intakes that were created before the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.page This method returns a maximum of 100 records. Use the page parameter to implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   * @param params.all By default, only submitted forms are returned. Set this parameter to true if you want this method to return all intakes, regardless of their status.
   */
  async listIntakeForms(
    params: ListIntakeFormsRequest
  ): Promise<IntakeFormSummary[]> {
    const urlParams = Object.keys(params).map((key) => `${key}=${params[key]}`);
    const res = await this.api.get<IntakeFormSummary[]>(
      `${ENDPOINT}/summary?${urlParams.join('&')}`
    );
    return res.data;
  }

  /**
   * Use this method to download a client’s complete intake package as a PDF file.
   * @param intakeId The id of the intake to download
   */
  downloadIntakeFormPDF(intakeId: string) {
    return this.api.get(`${ENDPOINT}/${intakeId}/pdf`);
  }

  /**
   * Use this method to get a full intake form in JSON format.
   * The full intake form is very similar to intake summary object, except it adds an array of questions.
   * @param intakeId The id of the intake to get
   */
  async getIntakeForm(intakeId: string): Promise<IntakeForm> {
    const res = await this.api.get<IntakeForm>(`${ENDPOINT}/${intakeId}`);
    return res.data;
  }

  /**
   * Use this method to get a list of questionnaire templates. This list is useful for learning the ID of each questionnaire so it can be used in the Send Questionnaire method (see next section).
   */
  async listQuestionnaireTemplates(): Promise<Questionnaire[]> {
    const res = await this.api.get<Questionnaire[]>(QUESTIONNAIRE_ENDPOINT);
    return res.data;
  }

  /**
   * Use this method to get a list of practitioners in the account. This list is useful for learning the ID of each practitioner so it can be used in other methods.
   */
  async listPractitioners(): Promise<Practitioner[]> {
    const res = await this.api.get<Practitioner[]>(PRACTITIONER_ENDPOINT);
    return res.data;
  }

  /**
   * This endpoint allows you to send an intake package using the API.
   * @param params.QuestionnaireId The ID of the intake package. You can get this from the List Questionnaires method, or by opening the questionnaire template in IntakeQ and getting it from the browser address
   * @param params.ClientName Mandatory only if ClientId is not provided. When used, provide first and last name.
   * @param params.ClientEmail Mandatory only if ClientId is not provided.
   * @param params.PractitionerId The ID of the practitioner associated with this intake. If not provided, IntakeQ will try to use the practitioner who is already associated with this client. If that fails, IntakeQ will use the main account practitioner. If the main account is not a practitioner, the method will fail
   * @param params.ClientId The ID of the client. This is a positive integer and can be retrieved using the /clients endpoint. When this field is provided, IntakeQ will ignore the ClientName and ClientEmail fields and look for an exact match on the ClientId to find an existing client. If the client is not found, the method will fail.
   */
  async sendQuestionnaire(
    params: SendQuestionnaireRequest
  ): Promise<IntakeForm> {
    const res = await this.api.post<IntakeForm>(`${ENDPOINT}/send`, params);
    return res.data;
  }
}
