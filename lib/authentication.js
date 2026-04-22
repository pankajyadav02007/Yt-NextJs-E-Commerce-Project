import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const isAuthenticated = async (role) => {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    if (!access_token || !access_token.value) {
      return {
        isAuth: false,
      };
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const { payload } = await jwtVerify(
      access_token.value,
      new TextEncoder().encode(process.env.SECRET_KEY),
    );

    if (payload.role !== role) {
      return {
        isAuth: false,
      };
    }

    return {
      isAuth: true,
      userId: payload._id,
    };
  } catch (error) {
    return {
      isAuth: false,
      error: error.message || "Authentication failed",
    };
  }
};
