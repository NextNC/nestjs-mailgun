import { Injectable, Inject } from '@nestjs/common';
import { MAILGUN_CONFIGURATION } from '../../tokens/tokens';
import Mailgun, {
  CreateUpdateList,
  CreateUpdateMailListMembers,
  DeletedMember,
  DestroyedList,
  DomainTemplateUpdateVersionData,
  DomainTemplatesQuery,
  MailListMember,
  MailListMembersQuery,
  MailListMembersResult,
  MailgunClientOptions,
  MailgunMessageData,
  MailingList,
  MultipleMembersData,
  MutateDomainTemplateVersionResult,
  NewMultipleMembersResponse,
  ListDomainTemplateVersionsResult,
  DomainTemplateVersionData,
  CreateDomainTemplateVersionResult,
  DomainTemplateData,
  DomainTemplateUpdateData,
  UpdateOrDeleteDomainTemplateResult,
  NotificationResult,
  TemplateQuery
} from 'mailgun.js';
import FormData from 'form-data';
import { IDomainTemplate, IMailgunClient } from 'mailgun.js/Interfaces';

export type EmailOptions = MailgunMessageData;

@Injectable()
export class MailgunService {
  private readonly mailgun: IMailgunClient;
  constructor(
    @Inject(MAILGUN_CONFIGURATION)
    private readonly configuration: MailgunClientOptions,
  ) {
    this.mailgun = new Mailgun(FormData).client(configuration);
  }

  public createEmail = async (
    domain: string,
    data: EmailOptions,
  ): Promise<any> => this.mailgun.messages.create(domain, data);

  public validateEmail = async (
    email: string,
  ): Promise<{
    address: string;
    is_disposable_address: boolean;
    is_role_address: boolean;
    reason: string[];
    result: string;
    risk: string;
  }> => this.mailgun.validate.get(email);

  public createList = async (data: CreateUpdateList): Promise<MailingList> =>
    this.mailgun.lists.create(data);

  public destroyList = async (
    mailListAddress: string,
  ): Promise<DestroyedList> => this.mailgun.lists.destroy(mailListAddress);

  public getList = async (mailListAddress: string): Promise<MailingList> =>
    this.mailgun.lists.get(mailListAddress);

  public updateList = async (
    mailListAddress: string,
    data: CreateUpdateList,
  ): Promise<MailingList> => this.mailgun.lists.update(mailListAddress, data);

  public listAddMember = async (
    mailListAddress: string,
    data: CreateUpdateMailListMembers,
  ): Promise<MailListMember> =>
    this.mailgun.lists.members.createMember(mailListAddress, data);

  public listGetMembers = async (
    mailListAddress: string,
    query?: MailListMembersQuery,
  ): Promise<MailListMembersResult> =>
    this.mailgun.lists.members.listMembers(mailListAddress, query);

  public listCreateMembers = async (
    mailListAddress: string,
    data: MultipleMembersData,
  ): Promise<NewMultipleMembersResponse> =>
    this.mailgun.lists.members.createMembers(mailListAddress, data);

  public listupdateMember = async (
    address: string,
    memberAddress: string,
    data: CreateUpdateMailListMembers,
  ): Promise<MailListMember> =>
    this.mailgun.lists.members.updateMember(address, memberAddress, data);

  public listDestroyMember = async (
    address: string,
    memberAddress: string,
  ): Promise<DeletedMember> =>
    this.mailgun.lists.members.destroyMember(address, memberAddress);

  public getDomainTemplate = async (
    domain: string,
    templateName: string,
    query?: TemplateQuery
  ): Promise<IDomainTemplate> =>
    this.mailgun.domains.domainTemplates.get(domain, templateName, query);

  public createDomainTemplate = async (
    domain: string,
    data: DomainTemplateData
  ): Promise<IDomainTemplate> =>
    this.mailgun.domains.domainTemplates.create(domain, data);

  public updateDomainTemplate = async (
    domain: string,
    templateName: string,
    data: DomainTemplateUpdateData
  ): Promise<UpdateOrDeleteDomainTemplateResult> =>
    this.mailgun.domains.domainTemplates.update(domain, templateName, data);

  public destroyDomainTemplate = async (
    domain: string,
    templateName: string
  ): Promise<UpdateOrDeleteDomainTemplateResult> =>
    this.mailgun.domains.domainTemplates.destroy(domain, templateName);

  public destroyAllDomainTemplates = async (
    domain: string
  ): Promise<NotificationResult> =>
    this.mailgun.domains.domainTemplates.destroyAll(domain);
  
  public createDomainTemplateVersion = async (
    domain: string,
    templateName: string,
    data: DomainTemplateVersionData
  ): Promise<CreateDomainTemplateVersionResult> =>
    this.mailgun.domains.domainTemplates.createVersion(domain, templateName, data);

  public getDomainTemplatesVersion = async (
    domain: string,
    templateName: string,
    versionTag: string
  ): Promise<IDomainTemplate> =>
    this.mailgun.domains.domainTemplates.getVersion(domain, templateName, versionTag);

  public updateDomainTemplateVersion = async (
    domain: string,
    templateName: string,
    versionTag: string,
    data: DomainTemplateUpdateVersionData
  ): Promise<MutateDomainTemplateVersionResult> =>
    this.mailgun.domains.domainTemplates.updateVersion(domain, templateName, versionTag, data);

  public destroyDomainTemplateVersion = async (
    domain: string,
    templateName: string,
    versionTag: string,
  ): Promise<MutateDomainTemplateVersionResult> =>
    this.mailgun.domains.domainTemplates.destroyVersion(domain, templateName, versionTag);

  public listDomainTemplateVersions = async (
    domain: string,
    templateName: string,
    query?: DomainTemplatesQuery
  ): Promise<ListDomainTemplateVersionsResult> =>
    this.mailgun.domains.domainTemplates.listVersions(domain, templateName, query);
}
