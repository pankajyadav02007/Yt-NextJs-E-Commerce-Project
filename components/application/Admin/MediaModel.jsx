import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

const MediaModel = ({
  open,
  setOpen,
  selectedMedia,
  setSelectedMedia,
  isMultiple,
}) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none"
      ></DialogContent>
    </Dialog>
  );
};

export default MediaModel;
