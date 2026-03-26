import { convexAuth } from "@convex-dev/auth/server";
import { Phone } from "@convex-dev/auth/providers/Phone";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Phone({
      sendVerificationRequest: async ({ identifier: phone, token }) => {
        console.log(`Sending OTP ${token} to ${phone}`);
        // In a real app, integrate Twilio, Africa's Talking, or other SMS providers here.
      },
    }),
  ],
});
