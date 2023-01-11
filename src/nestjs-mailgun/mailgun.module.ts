import { Module, Provider } from '@nestjs/common';
import Options from 'mailgun.js/interfaces/Options';
import { OptionsAsync } from './configuration';
import { MailgunService } from './services/relay/mailgun.service';
import { MAILGUN_CONFIGURATION } from './tokens/tokens';

@Module({})
export class MailgunModule {
  public static forRoot(config: Options) {
    return {
      module: MailgunModule,
      //   controllers: [
      //     ...controllers,
      //   ],
      providers: [
        { provide: MAILGUN_CONFIGURATION, useValue: config },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
  public static forAsyncRoot(config: OptionsAsync) {
    return {
      module: MailgunModule,
      //   controllers: [
      //     ...controllers,
      //   ],
      imports: config.imports || [],
      providers: [this.createAsyncProviders(config), MailgunService],
      exports: [MailgunService],
    };
  }
  private static createAsyncProviders(
    options: OptionsAsync,
  ): Provider {
    return {
      provide: MAILGUN_CONFIGURATION,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
