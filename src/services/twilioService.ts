import twilio from "twilio";

import 'dotenv/config';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twlioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSms = (to: string, body: string) => {
    return client.messages.create({
        body: body,
        from: twlioPhoneNumber,
        to: to
    });
}