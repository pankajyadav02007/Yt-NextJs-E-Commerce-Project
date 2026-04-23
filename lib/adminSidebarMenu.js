"use client";
import {
  ADMIN_CATEGORY_ADD,
  ADMIN_CATEGORY_SHOW,
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT_ADD,
  ADMIN_PRODUCT_SHOW,
} from "@/routes/AdminPanelRoute";
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
        url: ADMIN_CATEGORY_ADD,
      },
      {
        title: "All Category",
        url: ADMIN_CATEGORY_SHOW,
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
        url: ADMIN_PRODUCT_ADD,
      },
      {
        title: "Add Variants",
        url: "#",
      },
      {
        title: "All Products",
        url: ADMIN_PRODUCT_SHOW,
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
