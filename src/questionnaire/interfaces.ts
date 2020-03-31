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
