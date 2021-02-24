export interface CardDetails {
  Brand: string;
  LastDigits: string;
  ExpirationMonth: number;
  ExpirationYear: number;
  /** Square/Stripe Card ID */
  CardId: string;
}

export interface InvoicePayment {
  /** Unix timestamp */
  Date: number;
  Amount: number;
  Currency: string;
  Method:
    | 'Stripe'
    | 'CreditCard'
    | 'Cash'
    | 'Check'
    | 'DebitCard'
    | 'Square'
    | 'CreditBalance'
    | 'BankTransfer'
    | 'Insurance'
    | 'GiftCard'
    | 'Other';
  ProcessedBy: string;
  ProcessedByType: 'Client' | 'Provider' | 'Automation';
  TipAmount: number;
  RefundedAmount: number;
  AdditionalInfo: string;
  CardDetails: CardDetails;
}

export interface InvoiceSubItem {
  ServiceCode: number;
  Price: number;
  Units: number;
  Description: string;
  Date: number;
  /** They don't actually ever mention what this is... */
  Modifiers: any[];
}

export interface InvoiceItem {
  AppointmentId: string;
  ProductId: string;
  Description: string;
  TotalTaxAmount: number;
  Units: number;
  Price: number;
  /** Unix Timestamp */
  Date: number;
  Taxes: { Name: string; Percentage: number }[];
  TaxesIncludedInPrice: boolean;
  IsCopay: boolean;
  TotalAmount: number;
  ServiceCode: number;
  SubItems: InvoiceSubItem[];
}

export interface Invoice {
  /** These two fields seem to be the same, just one is a number and one is a string for some reason... */
  Id: string;
  Number: number;
  ClientName: string;
  ClientEmail: string;
  ClientId: number;
  /**
   * Draft – The invoice has been created but not issued.
   * Unpaid – The invoice has been issued and has not been paid.
   * PastDue – The invoice has past the payment date and the customer has not paid.
   * Paid – The invoice has been paid by the customer.
   * Refunded – The invoice has been refunded by the staff.
   * Canceled - The Invoice has been voided.
   */
  Status: 'Draft' | 'Paid' | 'Unpaid' | 'PastDue' | 'Refunded' | 'Canceled';
  /** Unix Timestamp */
  IssuedDate: number;
  /** Unix Timestamp */
  DueDate: number;
  /** Unix Timestamp */
  DateCreated: number;
  CurrencyIso: string;
  DiscountAmount: number;
  DiscountPercent: number;
  DiscountType: 'Percentage' | 'Amount';
  SubTotal: number;
  TotalAmount: number;
  AmountDue: number;
  AmountPaid: number;
  NoteToClient: string;
  AllowTipping: boolean;
  TipAmount: number;
  Automated: boolean;
  CreatedBy: string;
  AdditionalEmailRecipients: string[];
  Payments: InvoicePayment[];
  Items: InvoiceItem[];
  DiagnosisList: string[];
}

export interface ListInvoicesRequest {
  /** Partial Matches on either the client's email or name. */
  client?: string;
  status?: string;
  page?: number;
  startDate?: string;
  endDate?: string;
  practitionerEmail?: string;
}

export interface InvoiceReceived {
  EventType:
    | 'InvoiceIssued'
    | 'InvoicePaid'
    | 'InvoicePaymentPlanChargeFailed'
    | 'InvoiceAutoChargeFailed'
    | 'InvoiceCancelled'
    | 'InvoicePaymentRefunded';
  ActionPerformedByClient: boolean;
  Invoice: Invoice; //refer to the invoice object above
}
