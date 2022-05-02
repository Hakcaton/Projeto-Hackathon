import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class Emails {
	async sendEmail(email: string, token: string) {
		try {
			//obter o campo após o @
			const transporter = nodemailer.createTransport({
				//por enquanto ta gmail
				service: "gmail",
				auth: {
					user: "healthcheckapi431@gmail.com",
					pass: "Aoinfinitoealem",
				},
			});

			await transporter.sendMail({
				from: `"API Docs" <${"healthcheckapi431@gmail.com"}>`,
				to: email,
				subject: "Redefinição de Senha",

				text: `Redefinir sua Senha`,
				html: `<a href="http://localhost:4200/autenticacao?token=${token}">Clique aqui</a>`,
			});
		} catch (error) {}
	}
}
