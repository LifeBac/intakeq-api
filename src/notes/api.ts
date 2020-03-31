import { AxiosInstance } from 'axios';
import {
  ListTreatmentNotesRequest,
  TreatmentNoteSummary,
  TreatmentNote,
} from './interfaces';

const ENDPOINT = 'notes';

export class NotesApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Use this method to query treatment note summaries. The result set does not contain all the contents of the notes, but only their basic information (id, status, client info).
   * @param params.client A string used to search the client by name or email. Partial matches will be respected, so a search for "Paul" will return all notes for clients with Paul in their names. Likewise, a search for "paul.smith@gmail.com" will return all notes for that specific client.
   * @param params.clientId An integer used to search by the client ID. Only exact matches will be returned.
   * @param params.status An integer representing the note lock status. Use 1 to only get locked notes and 2 to get unlocked notes.
   * @param params.startDate Return only notes that were created after the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.endDate Return only notes that were created before the specified date. Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   * @param params.page This method returns a maximum of 100 records. Use the page parameter to implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   */
  async listTreatmentNotes(
    params: ListTreatmentNotesRequest
  ): Promise<TreatmentNoteSummary[]> {
    const urlParams = Object.keys(params).map((key) => `${key}=${params[key]}`);
    const res = await this.api.get<TreatmentNoteSummary[]>(
      `${ENDPOINT}/summary?${urlParams.join('&')}`
    );

    return res.data;
  }

  /**
   * Use this method to download the note as a PDF file.
   * @param noteId The id of the note to download
   */
  async downloadNotePDF(noteId: string) {
    return this.api.get(`${ENDPOINT}/${noteId}/pdf`);
  }

  /**
   * Use this method to get a full note in JSON format.
   * The full note is very similar to note summary object, except it adds an array of questions.
   * @param noteId The id of the note to get
   */
  async getTreatmentNote(noteId: string): Promise<TreatmentNote> {
    const res = await this.api.get<TreatmentNote>(`${ENDPOINT}/${noteId}`);
    return res.data;
  }
}
