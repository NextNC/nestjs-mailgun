import { Test, TestingModule } from '@nestjs/testing';
import { MailgunService } from './mailgun.service';

describe('MailgunService', () => {
  let service: MailgunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailgunService],
    }).compile();

    service = module.get<MailgunService>(MailgunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
