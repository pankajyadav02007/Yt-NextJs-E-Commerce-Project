import { NextResponse } from "next/server";
import { object } from "zod";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export default function catchError(error, customMessage) {
  //handle duplicate key error
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate field: ${keys}. These feild value must be unique`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal server error",
    };
  }
  return NextResponse.json({
    success: false,
    statusCode: error.code,
    ...errorObj,
  });
}
