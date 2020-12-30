import { AxiosInstance } from 'axios';
import { Invoice, ListInvoicesRequest } from './interfaces';

const ENDPOINT = 'invoices';

export class InvoiceApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Use this endpoint to query for matching invoices.
   * @param params - The request object for querying invoices
   */
  async listInvoices(params: ListInvoicesRequest): Promise<Invoice[]> {
    const urlParams = [];

    Object.keys(params).forEach((key) => {
      if (!params[key]) return;
      urlParams.push(`${key}=${params[key]}`);
    });

    const res = await this.api.get<Invoice[]>(
      `${ENDPOINT}?${urlParams.join('&')}`
    );

    return res.data;
  }

  /**
   * Loads a single invoice from it's ID.
   * @param invoiceId The ID of the invoice to load
   */
  async getInvoice(invoiceId): Promise<Invoice> {
    const res = await this.api.get<Invoice>(`${ENDPOINT}/${invoiceId}`);
    return res.data;
  }
}
