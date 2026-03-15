"use client";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { Plus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadMedia = ({ isMultiple }) => {
  const handleOnError = (error) => {
    showToast("error", error.this.stateText);
  };
  const handleOnQueueEnd = async (results) => {
    console.log(results);
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOnQueueEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        sources: ["local", "url", "unsplash", "google_drive"],
      }}
    >
      {({ open }) => (
        <Button onClick={() => open()}>
          <Plus />
          Upload Media
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadMedia;
