import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  async getClient(): Promise<Transporter> {
    if (this.client) {
      return this.client;
    }

    return new Promise((resolve) => {
      nodemailer.createTestAccount().then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
        resolve(transporter);
      });
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    await this.getClient();

    const templateFileContent = fs.readFileSync(path).toString();

    const template = handlebars.compile(templateFileContent);

    const html = template(variables);

    const message = await this.client.sendMail({
      from: "Rentx <noreply@rentx.com>",
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
