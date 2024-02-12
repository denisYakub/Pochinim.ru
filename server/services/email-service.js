const nodemailer = require('nodemailer');
const ApiError = require('../exeptions/api-error');

class EmailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: '587',
            secureL: false,
            auth: {
                user: 'pocinimru@gmail.com',
                pass: 'qxgw dacl anye xazv'
            }
        })
    }

    async sendActivationEmail(to, code){
        try {
            await this.transporter.sendMail({
                from: 'pocinimru@gmail.com',
                to,
                subject: 'Активация аккаунта на Починим.ру',
                text: '',
                html: 
                `
                <div>
                    <h1>
                        Для активации введите данный код:
                    </h1>
                    <a>
                        ${code}
                    </a>
                </div>
                `
            })
            return true;
        } catch (error) {
            throw ApiError.NoRecipientsDef("sendActivationEmail", error)
        }
    }
}

module.exports = new EmailService();