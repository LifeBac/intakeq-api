import { QuestionList } from '../questionnaire/interfaces';

export type TreatmentNoteStatus = 'locked' | 'unlocked';

export interface TreatmentNoteSummary {
  /** The ID of the treatment note. You can use this to get the full note */
  Id: string;
  /** The name of the client associated with the note */
  ClientName: string;
  /** The email of the client associated with the note. */
  ClientEmail: string;
  /** The auto-generated number ID assigned to the client */
  ClientId: number;
  /**
   * Status of the treatment note
   * Possible values:
   * * locked – the note is in draft state.
   * * unlocked – the note has been locked.
   */
  Status: TreatmentNoteStatus;
  /** The date of the note in Unix timestamp */
  Date: number;
  /** The title of the note. Usually the name of the note form template */
  NoteName: string;
  /** The email of the practitioner associated with the note */
  PractitionerEmail: string;
  /** The name of the practitioner associated with the note */
  PractitionerName: string;
  /** The auto-generated practitioner ID (string). */
  PractitionerId: number;
  /** Only if note is associated with appointment */
  AppointmentId?: string;
}

export interface TreatmentNote extends TreatmentNoteSummary {
  Questions: QuestionList;
}

export interface ListTreatmentNotesRequest {
  client?: string;
  clientId?: number;
  status?: TreatmentNoteStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
}
