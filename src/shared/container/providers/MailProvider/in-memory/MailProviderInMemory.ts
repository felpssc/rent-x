import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

class MailProviderInMemory implements IMailProvider {
  messages: unknown[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
