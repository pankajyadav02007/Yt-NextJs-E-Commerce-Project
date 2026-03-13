"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropDown from "./UserDropDown";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card">
      <div>Search components</div>
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        <ThemeSwitch />
        <UserDropDown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden cursor-pointer"
        >
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
