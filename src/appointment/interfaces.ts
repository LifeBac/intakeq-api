export type AppointmentStatus =
  | 'Confirmed'
  | 'WaitingConfirmation'
  | 'Declined'
  | 'Canceled'
  | 'Missed';

export type TelehealthProvider = 'IntakeQ' | 'Zoom';

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
  /** When the appointment is scheduled for in ISO format */
  StartDateIso: string;
  /** When the appointment is scheduled to end in ISO format */
  EndDateIso: string;
  /** When the appointment is scheduled for in local format */
  StartDateLocal: string;
  /** When the appointment is scheduled to end in local format */
  EndDateLocal: string;
  /** When the appointment is scheduled for in local formatted format */
  StartDateLocalFormatted: string;
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
  /** The ID of the practitioner */
  PractitionerId: string;
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
  /**
   * If this is a telehealth appointment (either IntakeQ or Zoom), this
   * property will contain information such as Start URL and the Invitation
   * Code.
   */
  TelehealthInfo: {
    /** The ID of the Telehealth Info */
    Id: string;
    /** The URL to start the telehealth call */
    StartUrl: string;
    /** An invitation text to show the customer */
    Invitation: string;
    /** The provider of the Telehealth chat */
    Provider: TelehealthProvider;
    /** The invitation code */
    InvitationCode: string;
  };
}

export interface ListAppointmentsRequest {
  /**
   * A string used to search the client by name or email. Partial matches will
   * be respected, so a search for “Paul” will return appointments for clients
   * with Paul in their names. Likewise, a search for “paul.smith@gmail.com”
   * will return appointments for that specific client.
   */
  client?: string;
  /**
   * Return only appointments that are scheduled for after the specified date.
   * Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  startDate?: string;
  /**
   * Return only appointments that are scheduled for before the specified date.
   * Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  endDate?: string;
  /**
   * Possible values are "Confirmed", "Canceled", "WaitingConfirmation",
   * "Declined" and "Missed".
   */
  status?: AppointmentStatus;
  /**
   * Use this to get appointments for a specific practitioner. The email must
   * match the email used in the practitioner IntakeQ account. If empty,
   * appointments for all practitioners in the organization will be returned.
   */
  practitionerEmail?: string;
  /**
   * This method returns a maximum of 100 records. Use the page parameter to
   * implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   */
  page?: number;
}

export interface GetSettingsResponse {
  Locations: {
    /** The Id of the location */
    Id: string;
    /** Name of the location */
    Name: string;
    /** The address for the location */
    Address: string;
  }[];
  Services: {
    /** Id of the service */
    Id: string;
    /** Name of the service */
    Name: string;
    /** Duration of the service */
    Duration: number;
    /** The price for the service */
    Price: number;
  }[];
  Practitioners: {
    /** The Id of the practitioner */
    Id: string;
    /** The practitioner's full name */
    CompleteName: string;
    /** The practitioner's first name */
    FirstName: string;
    /** The practitioner's last name */
    LastName: string;
    /** The practitioner's email */
    Email: string;
  }[];
}

export type AppointmentReminderType = 'Sms' | 'Email' | 'Voice' | 'OptOut';

export type CreateAppointmentRequest = {
  /** When the appointment starts in Unix timestamp */
  UtcDateTime: number;
  SendClientEmailNotification: boolean;
  ReminderType: AppointmentReminderType;
} & Pick<
  Appointment,
  'PractitionerId' | 'ClientId' | 'ServiceId' | 'LocationId' | 'Status'
>;

export type UpdateAppointmentRequest = {
  /** The appointment Id */
  Id: string;
} & Partial<Omit<CreateAppointmentRequest, 'PractitionerId' | 'ClientId'>>;

export interface AppointmentReceived {
  EventType:
    | 'AppointmentCreated'
    | 'AppointmentConfirmed'
    | 'AppointmentRescheduled'
    | 'AppointmentCanceled'
    | 'AppointmentDeclined'
    | 'AppointmentMissed';
  ActionPerformedByClient: boolean;
  Appointment: Appointment; //refer to the appointment object above
}
