import z from "zod";

export const signupMiddleware = z
  .object({
    fullname: z.string().min(3, "Fullname min length will be 3").max(255),
    email: z.string().email(),
    password: z.string().min(8, "Minimum password length will be 8"),
    confirmPassword: z.string(),
    role: z.string(),
    avatar: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attaches error to this field
  });

export const loginMiddleware = z.object({
  email: z.string().email(),
  password: z.string(),
});
