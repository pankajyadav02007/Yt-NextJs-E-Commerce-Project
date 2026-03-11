import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or missing input field");
    }

    const { name, email, password } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CHANGE STARTS HERE
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // ❌ already verified user
      if (existingUser.isEmailVerified) {
        return response(false, 409, "User already registered");
      }

      // ✅ registered but not verified → resend email
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({ userId: existingUser._id.toString() })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification request from Developer Team",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`,
        ),
      );

      return response(
        true,
        200,
        "Registration success, please verify your email address",
      );
    }
    // 🔥 CHANGE ENDS HERE

    // New registration
    const NewRegistration = new UserModel({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });

    await NewRegistration.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: NewRegistration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Email Verification request from Developer Team",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${token}`,
      ),
    );

    return response(
      true,
      200,
      "Registration success, please verify your email address",
    );
  } catch (error) {
    return response(false, 500, "Internal Server Error", error.message);
  }
}
