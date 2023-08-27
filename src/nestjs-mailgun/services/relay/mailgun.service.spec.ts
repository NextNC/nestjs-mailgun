import { Test, TestingModule } from '@nestjs/testing';
import { MAILGUN_CONFIGURATION } from '../../../nestjs-mailgun/tokens/tokens';
import { MailgunService } from './mailgun.service';

describe('MailgunService', () => {
  let service: MailgunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailgunService,
        {
          provide: MAILGUN_CONFIGURATION,
          useValue: {
            username: 'Nuno',
            key: process.env.MAILGUN_KEY,
            // url: 'api.eu.mailgun.net',
          },
        },
      ],
    }).compile();

    service = module.get<MailgunService>(MailgunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('Send email', async () => {
     expect(await
      service.createEmail(process.env.MAILGUN_DOMAIN as string, {
        from: 'package@test.com',
        subject: 'TEST',
        to: 'benfica000@gmail.com',
        text: 'Test was successful',
      }),
    ).toBeDefined();
  });

  it.skip('Validate email', () => {
    return expect(
      service.validateEmail('postmaster@closeroffice.closerdev.com'),
    ).resolves.toBeDefined();
  });
});
