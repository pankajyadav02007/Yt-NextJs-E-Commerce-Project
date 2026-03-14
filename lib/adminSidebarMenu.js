"use client";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import {
  Brain,
  ChartColumnStacked,
  CircleUserRound,
  Gauge,
  RectangleCircle,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "lucide-react";

export const adminAppSideberMenu = [
  {
    title: "Dashboard",
    url: ADMIN_DASHBOARD,
    icon: Gauge,
  },
  {
    title: "Category",
    url: "#",
    icon: ChartColumnStacked,
    submenu: [
      {
        title: "Add Category",
        url: "#",
      },
      {
        title: "All Category",
        url: "#",
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: ShoppingCart,
    submenu: [
      {
        title: "Add Products",
        url: "#",
      },
      {
        title: "Add Variants",
        url: "#",
      },
      {
        title: "All Products",
        url: "#",
      },
      {
        title: "Products Variants",
        url: "#",
      },
    ],
  },
  {
    title: "Coupons",
    url: "#",
    icon: RectangleCircle,
    submenu: [
      {
        title: "All Coupons",
        url: "#",
      },
      {
        title: "All Coupons",
        url: "#",
      },
    ],
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    url: "#",
    icon: CircleUserRound,
  },
  {
    title: "Reating & Review",
    url: "#",
    icon: Star,
  },
  {
    title: "Media",
    url: ADMIN_MEDIA_SHOW,
    icon: Brain,
  },
];
