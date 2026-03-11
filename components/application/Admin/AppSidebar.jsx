import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";
import logoBlack from "@/public/assets/logoBlack.png";
import logoWhite from "@/public/assets/logoWhite.png";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import { adminAppSideberMenu } from "@/lib/adminSidebarMenu";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b h-14 p-0">
          <div className="flex justify-between items-center px-4">
            <Image
              src={logoBlack.src}
              height={50}
              width={logoBlack.width}
              className="block dark:hidden h-[50px] w-auto"
              alt=" logo dark"
            />
            <Image
              src={logoWhite.src}
              height={50}
              width={logoWhite.width}
              className="hidden dark:block h-[50px] w-auto"
              alt=" logo white"
            />
            <Button type="button" size="icon" className="">
              <X />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminAppSideberMenu.map((menu, index) => (
              <Collapsible key={index} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link href={menu?.url}>
                        <menu.icon />
                        {menu.title}
                        {menu.submenu && menu.submenu.length > 0 && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      ;
    </>
  );
};

export default AppSidebar;
