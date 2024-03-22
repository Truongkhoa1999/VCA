
import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  id: z.string(),
  email: z.string(),
  telephone: z.string(),
  fullName: z.string(),
  images: z.object({
    profile: z.string().url(),
    background: z.string().url(),
  }),
});
export type UserDataProps = z.infer<typeof userSchema>;
export type UserInfoEditFormData = Omit<UserDataProps, "id" | "images">
