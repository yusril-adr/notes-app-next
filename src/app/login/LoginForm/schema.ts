import { z } from "zod";

const LoginSchema = z
  .object({
    identifier: z.string().min(1, { message: "Email/Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })
  .required();

export default LoginSchema;
