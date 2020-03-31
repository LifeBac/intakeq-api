type AppointmentStatus =
  | 'Confirmed'
  | 'WaitingConfirmation'
  | 'Declined'
  | 'Canceled'
  | 'Missed';

export interface Appointment {
  /** The ID of the appointment */
  Id: string;
  /** The name of the client */
  ClientName: string;
  /** The email of the client */
  ClientEmail: string;
  /** The client's phone number */
  ClientPhone: string;
  /** The client's ID assigned by IntakeQ */
  ClientId: number;
  /**
   * Status of the appointment
   * * Confirmed – The appointment has been confirmed (either manually or automatically).
   * * WaitingConfirmation – The appointment has not been confirmed by the staff.
   * * Declined – The appointment has been declined by the staff.
   * * Canceled – The appointment has been canceled.
   * * Missed – The appointment has been marked as missed by the staff.
   */
  Status: AppointmentStatus;
  /** When the appointment is scheduled for in Unix timestamp */
  StartDate: number;
  /** When the appointment ends in Unix timestamp */
  EndDate: number;
  /** An integer representing the appointment duration in minutes */
  Duration: number;
  /** The name of the service */
  ServiceName: string;
  /** The ID of the service */
  ServiceId: string;
  /** The name of the location */
  LocationName: string;
  /** The ID of the location */
  LocationId: number;
  /** The appointment price */
  Price: number;
  /** The email of the practitioner associated with this appointment */
  PractitionerEmail: string;
  /** The name of the practitioner associated with this appointment */
  PractitionerName: string;
  /** When the appointment was created in Unix timestamp */
  DateCreated: number;
  /** If this appointment is associated with an intake form, this field will provide the IntakeId that can be used to retrieve the form using the Intake Forms' API */
  IntakeId: string;
  /** Will be true when the appointment was created by the client using the booking widget, or false when the appointment was created by the staff */
  BookedByClient: boolean;
  /** The name of the person who created the appointment. It can be the name of a client or of a staff member */
  CreatedBy: string;
  /** If this appointment is part of a package, this filed will contain the ID of the package */
  AppointmentPackageId: string;
  /** If this appointment is part of a package, this filed will contain the name of the package */
  AppointmentPackageName: string;
}

export interface ListAppointmentsRequest {
  client?: string;
  startDate?: string;
  endDate?: string;
  status?: AppointmentStatus;
  pracitionierEmail?: string;
  page?: number;
}
