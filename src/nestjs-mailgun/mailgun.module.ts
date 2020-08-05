import { Module } from '@nestjs/common';
import { ConfigurationMailgun } from './configuration';
import { MailgunService } from './services/relay/mailgun.service';
import { API_KEY, DOMAIN, PUBLIC_API_KEY } from './tokens/tokens';

@Module({})
export class MailgunModule {
  public static forRoot(config: ConfigurationMailgun) {
    return {
      module: MailgunModule,
      //   controllers: [
      //     ...controllers,
      //   ],
      providers: [
        { provide: API_KEY, useValue: config.API_KEY },
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
