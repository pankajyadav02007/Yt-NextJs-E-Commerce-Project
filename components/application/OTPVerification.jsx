import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (value) => {
    onSubmit(value);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          <div className="text-center">
            <h1 className="font-bold text-2xl mb-2">
              Please complete your verification
            </h1>
            <p className="text-md">
              We have sent an One-Time Password (OTP) to your registered email
              address. The OTP is valid for 10 minutes only
            </p>
          </div>
          <div className="mb-5 mt-5 flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    One-Time Password (OTP)
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-10" index={0} />
                        <InputOTPSlot className="text-xl size-10" index={1} />
                        <InputOTPSlot className="text-xl size-10" index={2} />
                        <InputOTPSlot className="text-xl size-10" index={3} />
                        <InputOTPSlot className="text-xl size-10" index={4} />
                        <InputOTPSlot className="text-xl size-10" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-5">
            <ButtonLoading
              type="submit"
              text="Verify"
              className="w-full cursor-pointer"
              loading={loading}
            />
            <div className="text-center mt-5">
              <button
                type="button"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Send OTP
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
