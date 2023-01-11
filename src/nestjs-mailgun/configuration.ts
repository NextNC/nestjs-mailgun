import { ModuleMetadata } from '@nestjs/common/interfaces';
import Options from 'mailgun.js/interfaces/Options';

export interface OptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Options | Promise<Options>;
  inject?: any[];
}
