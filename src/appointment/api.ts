import { AxiosInstance } from 'axios';
import {
  Appointment,
  ListAppointmentsRequest,
  GetSettingsResponse,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from './interfaces';

const ENDPOINT = 'appointments';

export class AppointmentApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Use this method to query appointments in your organization. The results
   * will be ordered by Date in descending order
   * @param params The list appointment request parameters
   */
  async list(params: ListAppointmentsRequest): Promise<Appointment[]> {
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
  async get(appointmentId: string): Promise<Appointment> {
    const res = await this.api.get<Appointment>(`${ENDPOINT}/${appointmentId}`);
    return res.data;
  }

  /**
   * Create a new appointment
   * - `SendClientEmailNotification` can only be true if the `Status` is set
   *    to `Confirmed`.
   * @param newAppointment The new appointment object
   */
  async create(newAppointment: CreateAppointmentRequest): Promise<Appointment> {
    const res = await this.api.post<Appointment>(`${ENDPOINT}`, newAppointment);
    return res.data;
  }

  /**
   * Update an existing appointment
   * - An appointment cannot be changed from `Confirmed` to `WaitingConfirmation`
   * - The API does not support changing the client or the practitioner
   *   associated with the appointment.
   * - Fields like `ServiceId`, `LocationId`, `ReminderType` are only necessary
   *   if you are changing them.
   * @param updatedAppointment The updated appointment object
   */
  async update(
    updatedAppointment: UpdateAppointmentRequest
  ): Promise<Appointment> {
    const res = await this.api.put<Appointment>(
      `${ENDPOINT}`,
      updatedAppointment
    );
    return res.data;
  }

  /**
   * Cancel an existing appointment
   * @param id The id of the appointment to cancel
   * @param reason The reason for cancelling
   */
  async cancel(id: string, reason?: string): Promise<void> {
    await this.api.post(`${ENDPOINT}/cancellation`, {
      AppointmentId: id,
      Reason: reason ?? '',
    });
  }

  /**
   * Use this method to get a list of Services, Locations and Practitioners for
   * your account.
   */
  async getSettings(): Promise<GetSettingsResponse> {
    const res = await this.api.get<GetSettingsResponse>(`${ENDPOINT}/settings`);
    return res.data;
  }
}
