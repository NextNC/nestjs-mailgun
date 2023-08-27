import { ModuleMetadata } from '@nestjs/common/interfaces';
import { MailgunClientOptions } from 'mailgun.js';

export interface OptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => MailgunClientOptions | Promise<MailgunClientOptions>;
  inject?: any[];
}
