import { z, ZodType } from "zod";

const LoginSchema: ZodType = z
  .object({
    identifier: z.string().min(1, { message: "Email/Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })
  .required();

export default LoginSchema;
