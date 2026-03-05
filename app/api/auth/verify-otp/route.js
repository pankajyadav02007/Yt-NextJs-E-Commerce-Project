import { connectDB } from "@/lib/databaseConnection";
import catchError, { response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validationSchema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error,
      );
    }
    const { email, otp } = validatedData.data;
    const getOtpData = await OTPModel.findOne({ email, otp });
    if (!getOtpData) {
      return response(false, 404, "Invalid or expired otp");
    }
    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return response(false, 404, "user not found");
    }

    constLoggedInUserData = {
      _id: getUser._id,
      _role: getUser._role,
      _name: getUser._name,
      _avatar: getUser._avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" });

    const cookieStore = await cookies({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // remove otp after validation

    await getOtpData.deleteOne();
    return response(true, 200, "Login Successful", loggedInUserData);
  } catch (error) {
    return catchError(error);
  }
}
