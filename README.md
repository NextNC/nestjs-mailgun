<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Mailgun</h3>
<a href="https://www.npmjs.com/package/@nextnm/nestjs-mailgun"><img src="https://img.shields.io/npm/v/@nextnm/nestjs-mailgun.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/@nextnm/nestjs-mailgun"><img src="https://img.shields.io/npm/l/@nextnm/nestjs-mailgun.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/@nextnm/nestjs-mailgun"><img src="https://img.shields.io/npm/dm/@nextnm/nestjs-mailgun.svg" alt="NPM Downloads" /></a>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [mailgun-js](https://www.npmjs.com/package/mailgun-js).
It only comtemplates the send email and verify email functionalities, but later it will be added more. Just ping me or open pull request and contribute :)

### Installation

```bash
npm install @nextnm/nestjs-mailgun
```

### Usage

#### Importing module

```typescript
import { MailgunModule } from '@nextm/nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forRoot({
      DOMAIN: '<Your Domain>',
      AKI_KEY: '<Your AKI_KEY>',
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Interfaces

```typescript
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachment?;
}
```

#### Calling Send Method

```typescript
import { MailgunService } from '@nextm/nestjs-mailgun';
import { EmailOptions } from '@nextm/nestjs-mailgun'

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    const options: EmailOptions = {
      from: '',
      to: '',
      subject: '',
      text: '',
      html: '',
      attachment:''
    };

    await this.mailgunService.sendEmail(options);
  }
```

#### Calling Verify Method

To check if an email is real or not.

```typescript
import { MailgunService } from '@nextm/nestjs-mailgun';
import { EmailOptions } from '@nextm/nestjs-mailgun'

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.verifyEmail('next@examle.com);
  }
}
```

<!-- ## Change Log

See [Changelog](CHANGELOG.md) for more information. -->

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Notes

This project is not endorsed by or affiliated with [Mailgun](http://www.mailgun.com).

## Author

**Nuno Carvalhão [Site](https://nunocarvalhao.com)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
