export interface CardDetails {
    Brand: string,
    LastDigits: string,
    ExpirationMonth: number,
    ExpirationYear: number,
    CardId: string // Square/Stripe Card ID
}

export interface InvoicePayment {
    Date: number, //Unix Timestamp
    Amount: number,
    Currency: string,
    Method: 'Stripe' | 'CreditCard' | 'Cash' | 'Check' | 'DebitCard' | 'Square' | 'CreditBalance' | 'BankTransfer' | 'Insurance' | 'GiftCard' | 'Other'
    ProcessedBy: string,
    ProcessedByType: 'Client' | 'Provider' | 'Automation',
    TipAmount: number,
    RefundedAmount: number,
    AdditionalInfo: string,
    CardDetails: CardDetails
}

export interface InvoiceSubItem {
    ServiceCode: number,
    Price: number,
    Units: number,
    Description: string,
    Date: number,
    Modifiers: any[] // They don't actually ever mention what this is...
}

export interface InvoiceItem {
    AppointmentId: string,
    ProductId: string,
    Description: string,
    TotalTaxAmount: number,
    Units: number,
    Price: number,
    Date: number, // Unix Timestamp
    Taxes: { Name: string, Percentage: number }[],
    TaxesIncludedInPrice: boolean,
    IsCopay: boolean,
    TotalAmount: number,
    ServiceCode: number,
    SubItems: InvoiceSubItem[]
}

export interface Invoice {
    // These two fields seem to be the same, just one is a number and one is a string for some reason...
    Id: string,
    Number: number,
    ClientName: string,
    ClientEmail: string,
    ClientId: 9999,
    /*
    Draft – The invoice has been created but not issued.
    Unpaid – The invoice has been issued and has not been paid.
    PastDue – The invoice has past the payment date and the customer has not paid.
    Paid – The invoice has been paid by the customer.
    Refunded – The invoice has been refunded by the staff.
    Canceled - The Invoice has been voided.
     */
    Status: 'Draft' | 'Paid' | 'Unpaid' | 'PastDue' | 'Refunded' | 'Canceled',
    IssuedDate: number, //Unix timestamp,
    DueDate: number, //Unix timestamp,
    DateCreated: number, //Unix timestamp,
    CurrencyIso: string,
    DiscountAmount: number,
    DiscountPercent: number,
    DiscountType: 'Percentage' | 'Amount', // Percentage, Amount
    SubTotal: number,
    TotalAmount: number,
    AmountDue: number,
    AmountPaid: number,
    NoteToClient: string,
    AllowTipping: boolean,
    TipAmount: number,
    Automated: boolean,
    CreatedBy: string,
    AdditionalEmailRecipients: string[],
    Payments: InvoicePayment[]
    Items: InvoiceItem[],
    DiagnosisList: string[]
}

export interface ListInvoicesRequest {
    client?: string, // Partial Matches on either the client's email or name.
    status?: string;
    page?: number;
    startDate?: string;
    endDate?: string;
    practitionerEmail?: string
}

export interface InvoiceReceived {
    EventType: 'InvoiceIssued' | 'InvoicePaid',
    ActionPerformedByClient: boolean,
    Invoice: Invoice //refer to the invoice object above
}
