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
  ClientId: string;
  ClientIdNumber: number;
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
  /** An integer used to search the client by ID */
  clientId?: string;
  /**
   * Return only invoices that are scheduled for after the specified date. Use
   * the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  startDate?: string;
  /**
   * Return only invoices that are scheduled for before the specified date.
   * Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  endDate?: string;
  /**
   * Possible values are "Draft", "Scheduled", "Unpaid", "Paid", "PastDue",
   * "Refunded", "Forgiven" and "Canceled".
   */
  status?: string;
  /**
   * Use this to get invoices for a specific practitioner. The email must match
   * the email used in the practitioner IntakeQ account. If empty, invoices for
   * all practitioners in the organization will be returned.
   */
  practitionerEmail?: string;
  /**
   * This method returns a maximum of 100 records. Use the page parameter to
   * implement paging from your end. Use 1 for page 1, 2 for page 2, etc.
   */
  page?: string;
  /**
   * Return only invoices that have been changed after the specified date. Use
   * the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  lastUpdateStartDate?: string;
  /**
   * Return only invoices that have been changed before the specified date.
   * Use the following date format: yyyy-MM-dd (ex.: 2016-08-21)
   */
  lastUpdateEndDate?: string;
}

export interface InvoiceReceived {
  /**
   * Describes which action triggered this event. Possible values:
   *  - InvoiceIssued - triggered once when the invoice is initially created.
   *  - InvoicePaid - triggered when the invoice has been paid by the customer.
   *  - InvoicePaymentPlanChargeFailed - triggered when a recurring payment
   *    plan charge has failed.
   *  - InvoiceAutoChargeFailed - triggered when an appointment auto-charge has
   *    failed.
   *  - InvoiceCancelled - triggered when an invoice has been canceled.
   *  - InvoicePaymentRefunded - triggered when an invoice payment has been
   *    refunded.
   */
  EventType:
    | 'InvoiceIssued'
    | 'InvoicePaid'
    | 'InvoicePaymentPlanChargeFailed'
    | 'InvoiceAutoChargeFailed'
    | 'InvoiceCancelled'
    | 'InvoicePaymentRefunded';
  /**
   * Boolean value indicating whether the action was performed by a client or by a staff member.
   */
  ActionPerformedByClient: boolean;
  Invoice: Invoice;
}
