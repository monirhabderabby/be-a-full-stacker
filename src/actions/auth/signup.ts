"use server";

import { prisma } from "@/lib/prisma";
import { signupSchema, SignupSchemaValues } from "@/schemas/auth/signup";
import bcrypt from "bcryptjs";

export const signUpAction = async (data: SignupSchemaValues) => {
  try {
    // Validate user input
    const parsedValue = signupSchema.safeParse(data);

    if (!parsedValue.success) {
      return {
        success: false,
        message: "Invalid input. Please check the provided information.",
      };
    }

    const { firstName, lastName, email, password } = parsedValue.data;

    // Check if user already exists
    const exist = await prisma.user.findUnique({
      where: { email },
    });

    if (exist) {
      return {
        success: false,
        message: "An account with this email already exists. Please log in.",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message:
        "Your account has been created successfully. You can now log in.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "Something went wrong during sign up. Please try again later.",
    };
  }
};
