export interface BaseQuestion {
  Id: string;
  Text: string;
  QuestionType: 'OpenQuestion' | 'MultipleChoice' | 'Matrix' | 'Attachment';
  OfficeUse: boolean;
  OfficeNote: string;
}

export interface QuestionOpenQuestion extends BaseQuestion {
  QuestionType: 'OpenQuestion';
  Answer: string;
}

export interface QuestionMultipleChoice extends BaseQuestion {
  QuestionType: 'MultipleChoice';
  Answer: string;
}

export interface QuestionMatrix extends BaseQuestion {
  Rows: {
    Text: string;
    Answers: string[];
  }[];
  ColumnNames: string[];
}

export interface QuestionAttachment extends BaseQuestion {
  Attachments: {
    Id: string;
    Url: string;
    ContentType: string;
    FileName: string;
  }[];
}

export type QuestionList = (
  | QuestionOpenQuestion
  | QuestionMultipleChoice
  | QuestionMatrix
  | QuestionAttachment
)[];

export interface IntakeFormSummary {
  /** The ID of the client intake form. You can use this to get the full intake. */
  Id: string;
  /** The name of the client who submitted the intake form. */
  ClientName: string;
  /** The email of the client who submitted the intake form. */
  ClientEmail: string;
  /** The ID of the client who submitted the intake form. */
  ClientId: number;
  /**
   * The status of the Intake Form
   * Possible values:
   * * Sent – Client has not started filling out the form.
   * * Partial – Client has started filling out the form.
   * * Completed – Form has been submitted.
   * * Offline – Client chose to fill out by hand.
   */
  Status: 'Completed' | 'Sent' | 'Partial' | 'Offline';
  /** When the form was created in Unix timestamp. */
  DateCreated: number;
  /** When the client submitted the form in Unix timestamp. Null if form has not been submitted. */
  DateSubmitted: number;
  /** The name of the form template. */
  QuestionnaireName: string;
  /** The ID of the questionnaire template used to create this intake. */
  QuestionnaireId: string;
  /**  The email of the practitioner associated with the intake (for accounts with multiple practitioners) */
  Practitioner: string;
  /** 
   * The ID of the practitioner associated with the intake (for accounts with
   * multiple practitioners)
   */
  PractitionerId: string;
  /** The external client ID of the client associated with the intake */
  ExternalClientId?: string;
  /** If the form is associated with an appointment then this is the id */
  AppointmentId?: string;
}

export interface IntakeForm extends IntakeFormSummary {
  Questions: QuestionList;
  /** Consent Forms associated with this IntakeForm */
  ConsentForms: {
    /** The Id of the Consent Form */
    Id: string;
    /** The name of the Consent Form */
    Name: string;
    /** The document type */
    DocumentType: 'Html';
    /** Whether or not the consent form has been signed */
    Signed: boolean;
    /** The date the consent form was submitted in Unix timestamp */
    DateSubmitted: number;
  }[];
}

export interface Questionnaire {
  Id: string;
  Name: string;
  Archived: boolean;
  Anonymous: boolean;
}

export interface Practitioner {
  Id: string;
  CompleteName: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface ListIntakeFormsRequest {
  /**
   * A string used to search the client by name or email. Partial matches will
   * be respected, so a search for "Paul" will return all intakes for clients
   * with Paul in their names. Likewise, a search for "paul.smith@gmail.com"
   * will return all intakes for that specific client.
   */
  client?: string;
  /**
   * Return only intakes that were created after the specified date. Use the
   * following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  startDate?: string;
  /**
   * Return only intakes that were created before the specified date. Use the
   * following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  endDate?: string;
  /**
   * This method returns a maximum of 100 records. Use the page parameter to
   * implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   */
  page?: number;
  /**
   * By default, only submitted forms are returned. Set this parameter to true
   * if you want this method to return all intakes, regardless of their status.
   */
  all?: boolean;
  /**
   * Return only intakes from a specific client using the client ID number.
   */
  clientId?: string;
  /**
   * Return only intakes from a specific client using an external client ID
   * string that you have specified when saving a client using the Clients API.
   */
  externalClientId?: string;
}

export interface SendQuestionnaireRequestBase {
  QuestionnaireId: string;
  PractitionerId: string;
}

export interface SendQuestionnaireRequestClientId
  extends SendQuestionnaireRequestBase {
  ClientId: number;
}

export interface SendQuestionnaireRequestNoClientId
  extends SendQuestionnaireRequestBase {
  ClientName: string;
  ClientEmail: string;
}

export type SendQuestionnaireRequest =
  | SendQuestionnaireRequestClientId
  | SendQuestionnaireRequestNoClientId;
