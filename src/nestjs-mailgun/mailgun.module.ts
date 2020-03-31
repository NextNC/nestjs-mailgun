import { Module } from '@nestjs/common';
import { ConfigurationMailgun } from './configuration';
import { AKI_KEY, DOMAIN, PUBLIC_API_KEY } from './tokens/tokens';
import { MailgunService } from './services/relay/mailgun.service';

@Module({})
export class MailgunModule {
  public static forRoot(config: ConfigurationMailgun) {
    return {
      module: MailgunModule,
      //   controllers: [
      //     ...controllers,
      //   ],
      providers: [
        { provide: AKI_KEY, useValue: config.AKI_KEY },
        {
          provide: PUBLIC_API_KEY,
          useValue: config.PUBLIC_API_KEY ? config.PUBLIC_API_KEY : '',
        },
        { provide: DOMAIN, useValue: config.DOMAIN },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
}
