import { z } from "zod";
const domain = (process.env.COLLEGE_EMAIL_DOMAIN || "").trim().toLowerCase().replace(/^@/, "");
export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254)
    .refine((e) => !domain || e.endsWith("@" + domain), { message: `Use your college email (@${domain}).` }),
  password: z.string().min(10, "Use at least 10 characters.").max(72, "Use 72 characters or fewer."),
  confirmPassword: z.string(),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to take part." }) }),
}).refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match." });
export type RegisterInput = z.infer<typeof registerSchema>;
