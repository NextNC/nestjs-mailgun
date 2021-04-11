import { EmailOptions } from '../services/relay/mailgun.service';

export class MailgunEmailModel implements EmailOptions {
  public 'h:X-Mailgun-Variables'?: string;

  constructor(
    public from: string,
    public to: string | string[],
    public subject: string,
    public text?: string,
    public html?: string,
    public template?: string,
    public attachment?: any,
    public templateVariables?: { [key: string]: any },
  ) {
    this['h:X-Mailgun-Variables'] = templateVariables
      ? JSON.stringify(templateVariables)
      : this['h:X-Mailgun-Variables'];
  }
}
