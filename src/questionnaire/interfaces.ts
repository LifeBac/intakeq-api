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
  /** The name of the practitioner associated with the intake (for accounts with multiple practitioners) */
  PractitionerName: string;
}

export interface IntakeForm extends IntakeFormSummary {
  Questions: QuestionList;
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
  client?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  all?: boolean;
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
