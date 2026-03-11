"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/assets/logo_fevi1.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ButtonLoading from "@/components/application/ButtonLoading";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import {
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/WebsiteRoute";

import OTPVerification from "@/components/application/OTPVerification";
import { otpEmail } from "@/email/otpEmail";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdatePassword from "@/components/application/UpdatePassword";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const ResetPasswordPage = () => {
  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [otpVerificaticonLoading, setOtpVerificaticonLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [isOtpVerified, setIsOtpverified] = useState(false);

  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailVarification = async (value) => {
    try {
      setEmailVerificationLoading(true);
      const { data: sendOtpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        {
          email: value.email,
          // otp: data.otp,
        },
      );
      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }

      setOtpEmail(value.email);
      showToast("success", sendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  // otp verification
  const handleOtpVerification = async (data) => {
    try {
      setOtpVerificaticonLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        {
          email: otpEmail,
          otp: data.otp,
        },
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }

      showToast("success", otpResponse.message);
      setIsOtpverified(true);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificaticonLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[60px]"
          />
        </div>

        {!otpEmail ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p>Enter your email for password reset.</p>
            </div>
            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailVarification)}>
                  <div className="mb-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <input
                              type="email"
                              placeholder="example@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-5">
                    <ButtonLoading
                      type="submit"
                      text="Send OTP"
                      className="w-full cursor-pointer"
                      loading={emailVerificationLoading}
                    />
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={WEBSITE_LOGIN}
                        className="text-primary underline"
                      >
                        Back to Login
                      </Link>
                    </div>
                    <div className="mt-3"></div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <OTPVerification
                email={otpEmail}
                onSubmit={handleOtpVerification}
                loading={otpVerificaticonLoading}
              />
            ) : (
              <UpdatePassword email={otpEmail} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
