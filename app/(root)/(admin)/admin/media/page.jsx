"use client";
import BreadCrumb from "@/components/application/Admin/BreadCrumb";
import UploadMedia from "@/components/application/Admin/UploadMedia";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import React from "react";

const MediaPage = () => {
  const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: "", label: "Media" },
  ];
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <div>
        <UploadMedia isMultiple={true} />
      </div>
    </div>
  );
};

export default MediaPage;
