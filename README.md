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
<a href="https://www.npmjs.com/@nextnm/nestjs-mailgun"><img src="https://github.com/NextNC/nestjs-mailgun/actions/workflows/tests.yml/badge.svg" alt="Test Package" /></a>

![example workflow]()
<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [mailgun.js](https://www.npmjs.com/package/mailgun.js).
It supports sending, verifying emails and list operations, but later more will be added. Just ping me or open pull request and contribute :)

### Installation

```bash
npm install @nextnm/nestjs-mailgun
```

### Usage

#### Importing module

```typescript
import { MailgunModule } from '@nextnm/nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forRoot({
      username: 'string',
      key: 'string',
      public_key: 'string', // OPTIONAL
      timeout: 'number', // OPTIONAL
      url: 'string', // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Importing module Async

```typescript
import { MailgunModule } from '@nextnm/nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: 'string',
          key: 'string',
          public_key: 'string', // OPTIONAL
          timeout: 'number', // OPTIONAL
          url: 'string', // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
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
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  attachment?;
  'h:X-Mailgun-Variables'?: string;
}
```

#### Calling Send Method

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun'

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
      'h:X-Mailgun-Variables': '{"key":"value"}'
    };
// data is mailgunEmailModel
    await this.mailgunService.createEmail(domain,data);


    // OR can use the class

    const email = new MailgunEmailModel('from', 'to', 'subject', 'text', 'html', 'template','attachment', { key: 'value' });

    await this.mailgunService.createEmail(domain,data);
  }
```

#### Calling Verify Method

To check if an email is real or not.

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.validateEmail('next@examle.com');
  }
}
```

#### Create List Method

To create a list of emails
you need parameter data type CreateUpdateList which contain

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.createList(data);
  }
}
```

#### Destroy List Method

To destroy a list of emails

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.destroyList('mailListAddress@n.com');
  }
}
```

#### Get List Method

To Get a list of emails

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.getList('mailListAddress@n.com');
  }
}
```

#### Update List Method

To Update a list of emails
data is an object like:

{
address: string;
name?: string;
description?: string;
access_level?: 'readonly' | 'members' | 'everyone';
reply_preference?: 'list' | 'sender';
}

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.updateList('mailListAddress@n.com', data);
  }
}
```

#### Add member to a List

To add a member to the list
data is an object like:

{
address: string;
name?: string;
vars?: string;
subscribed?: 'yes' | 'no' | boolean;
upsert?: 'yes' | 'no';
}

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.listAddMember('mailListAddress@n.com', data);
  }
}
```

#### Get members of a List

To get a member of the list
Query is an object like:

{
subscribed?: 'yes' | 'no';
limit?: number;
}

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.listGetMembers('mailListAddress@n.com', query);
  }
}
```

#### Update members of a List

To update member of the list

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.listupdateMember(
      'mailListAddress@n.com',
      'memberAddress',
      data,
    );
  }
}
```

#### Destroy member of a List

To destroy member of the list

```typescript
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.listDestroyMember(
      'mailListAddress@n.com',
      'memberAddress',
    );
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
