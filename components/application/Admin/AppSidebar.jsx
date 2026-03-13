"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";
import logoBlack from "@/public/assets/logoBlack.png";
import logoWhite from "@/public/assets/logoWhite.png";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import { adminAppSideberMenu } from "@/lib/adminSidebarMenu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <Sidebar className="z-50">
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
            <Button
              onClick={toggleSidebar}
              type="button"
              size="icon"
              className="md:hidden cursor-pointer"
            >
              <X />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-3">
          <SidebarMenu>
            {adminAppSideberMenu.map((menu, index) => (
              <Collapsible key={index} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className="font-semibold px-2 py-5"
                    >
                      <Link href={menu?.url}>
                        <menu.icon />
                        {menu.title}
                        {menu.submenu && menu.submenu.length > 0 && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {menu.submenu && menu.submenu.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menu.submenu.map((submenuItem, subMenuIndex) => (
                          <SidebarMenuSubItem key={subMenuIndex}>
                            <SidebarMenuSubButton asChild className="px-2 py-5">
                              <Link href={submenuItem.url}>
                                {submenuItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
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
