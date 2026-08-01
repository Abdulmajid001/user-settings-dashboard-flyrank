import { z } from "zod";

export const userSettingsSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  aiModel: z.enum(["GPT-5.5", "Claude", "Gemini"], {
    required_error: "Please select a preferred AI model",
  }),
  theme: z.enum(["Light", "Dark", "System"], {
    required_error: "Please select a theme",
  }),
  notifications: z.boolean(),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
});

export type UserSettingsValues = z.infer<typeof userSettingsSchema>;
