import { AxiosInstance } from 'axios';
import { Appointment, ListAppointmentsRequest } from './interfaces';

const ENDPOINT = 'appointments';

export class AppointmentApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Use this method to query appointments in your organization. The results
   * will be ordered by Date in descending order
   * @param params.client A string used to search the client by name or email. Partial matches will be respected, so a search for “Paul” will return appointments for clients with Paul in their names. Likewise, a search for “paul.smith@gmail.com” will return appointments for that specific client.
   * @param params.startDate Return only appointments that are scheduled for after the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.endDate Return only appointments that are scheduled for before the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.status Possible values are "Confirmed", "Canceled", "WaitingConfirmation", "Declined" and "Missed".
   * @param params.practitionerEmail Use this to get appointments for a specific practitioner. The email must match the email used in the practitioner IntakeQ account. If empty, appointments for all practitioners in the organization will be returned.
   * @param params.page This method returns a maximum of 100 records. Use the page parameter to implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   */
  async listAppointments(
    params: ListAppointmentsRequest
  ): Promise<Appointment[]> {
    const urlParams = Object.keys(params).map((key) => `${key}=${params[key]}`);
    const res = await this.api.get<Appointment[]>(
      `${ENDPOINT}?${urlParams.join('&')}`
    );
    return res.data;
  }

  /**
   * Use this method to get a single appointment using its ID.
   * @param appointmentId The id of the appointment to get
   */
  async getAppointment(appointmentId: string): Promise<Appointment> {
    const res = await this.api.get<Appointment>(`${ENDPOINT}/${appointmentId}`);
    return res.data;
  }
}
