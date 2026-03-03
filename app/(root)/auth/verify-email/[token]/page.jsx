"use client";
import { Card, CardContent } from "@/components/ui/card";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import verifiedImg from "@/public/assets/verifiedImg.png";
import verificationFailedImg from "@/public/assets/verificationFailedImg.png";
import { Button } from "@/components/ui/button";

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token },
      );
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };
    verify();
  }, [token]);
  return (
    <>
      <Card className="w-[400px]">
        <CardContent>
          {isVerified ? (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={verifiedImg.src}
                  height={verifiedImg.height}
                  width={verifiedImg.width}
                  alt="verifiedImg"
                  className="h-96 w-auto"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold my-5 text-green-500">
                  Email Verification Successful!
                </h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={verificationFailedImg.src}
                  height={verificationFailedImg.height}
                  width={verificationFailedImg.width}
                  alt="verificationFailedImg"
                  className="h-96 w-auto"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold my-5 text-red-500">
                  Email Verification Failed!
                </h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EmailVerification;
