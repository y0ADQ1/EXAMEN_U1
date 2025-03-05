import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
});

export const createPaymentIntent = async (amount: number, currency: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });

        return paymentIntent;
    } catch (error) {
        console.error("Error creando Payment Intent:", error);
        throw new Error("Error al procesar el pago");
    }
};
