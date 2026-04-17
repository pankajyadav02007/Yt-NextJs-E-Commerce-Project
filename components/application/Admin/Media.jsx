"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showToast } from "@/lib/showToast";
import { ADMIN_MEDIA_EDIT, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import { EllipsisVertical, Link2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { de } from "zod/v4/locales";

const Media = ({
  media,
  handleDelete,
  deleteType,
  selectedMedia,
  setSelectedMedia,
}) => {
  const handleCheck = () => {
    let newSelectedMedia = [];
    if (selectedMedia.includes(media._id)) {
      newSelectedMedia = selectedMedia.filter((m) => m !== media._id);
    } else {
      newSelectedMedia = [...selectedMedia, media._id];
    }
    setSelectedMedia(newSelectedMedia);
  };
  const handleCopyLink = async (url) => {
    await navigator.clipboard.writeText(url);
    showToast("success", "Link Copied.");
  };
  return (
    <div className="border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden">
      <div className="absolute top-2 left-2 z-20">
        <Checkbox
          checked={selectedMedia.includes(media._id)}
          onCheckedChange={handleCheck}
          className="border-primary cursor-pointer"
        />
      </div>

      <div className="absolute top-2 right-2 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer">
              <EllipsisVertical color="#fff" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {deleteType === "SD" && (
              <>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                    <Pencil />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleCopyLink(media.secure_url)}
                >
                  <Link2 />
                  Copy Link
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDelete([media._id], deleteType)}
            >
              <Trash2 color="red" />
              {deleteType === "SD" ? "Move Into Trans" : "Delete Permanently"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full h-full absolute z-10 transition-all duration-150 each-in group-hover:bg-black/30"></div>

      <div>
        <Image
          src={media?.secure_url}
          alt={media?.alt || "Image"}
          height={300}
          width={300}
          className="object-cover w-full sm:h-[200px] h-[150px]"
        />
      </div>
    </div>
  );
};

export default Media;
