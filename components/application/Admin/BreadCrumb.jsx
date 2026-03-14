"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ breadcrumbData }) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {breadcrumbData.length > 0 &&
          breadcrumbData.map((data, index) =>
            index !== breadcrumbData.length - 1 ? (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ) : (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ),
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
