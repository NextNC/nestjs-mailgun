import { Injectable, Inject } from '@nestjs/common';
import { API_KEY, DOMAIN, HOST, PUBLIC_API_KEY } from '../../tokens/tokens';
import * as mailgunConfig from 'mailgun-js';

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachment?;
  'recipient-variables'?: {
    [email: string]: any;
  };
}
@Injectable()
export class MailgunService {
  private readonly mailgun;
  constructor(
    @Inject(API_KEY) private readonly apiKey,
    @Inject(DOMAIN) private readonly domain,
    @Inject(HOST) private readonly host,
    @Inject(PUBLIC_API_KEY) private readonly publicApiKey,
  ) {
    this.mailgun = mailgunConfig({ apiKey, domain, publicApiKey, host });
  }

  public sendEmail(emailOptions: EmailOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mailgun.messages().send(emailOptions, (error, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  public validateEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mailgun.validate(email, (err, body) => {
        if (body && body.is_valid) {
          resolve(true);
        } else {
          resolve(false);
        }
        if (err) {
          console.log('ERRRP', err);

          reject(err);
        }
      });
    });
  }
}
