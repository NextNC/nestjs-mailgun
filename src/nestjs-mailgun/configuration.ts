import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface ConfigurationMailgun {
  DOMAIN: string;
  API_KEY: string;
  PUBLIC_API_KEY?: string;
  HOST?: string;
}

export interface ConfigurationMailgunAsync
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => ConfigurationMailgun | Promise<ConfigurationMailgun>;
  inject?: any[];
}
