import { Request, Response } from "express";
import Stripe from "stripe";
import { db } from "../../config/database";
import { events } from "../../models/events";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
});

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, currency, eventId } = req.body;

        if (!amount || !currency || !eventId) {
            res.status(400).json({ error: "Faltan datos requeridos." });
            return;
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { eventId },
            automatic_payment_methods: { enabled: true },
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creando Payment Intent:", error);
        res.status(500).json({ error: "Error al procesar el pago" });
    }
};
