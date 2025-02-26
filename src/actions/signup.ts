"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { SignUpFormTypes, SignUpSchema } from "@/types/schema";

const signup = async (data: SignUpFormTypes) => {
  const validatedFields = SignUpSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "الايمال مستخدم بالفعل" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export default signup;
