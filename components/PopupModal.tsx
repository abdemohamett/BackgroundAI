'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Image } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { BsCloudDownload, BsDownload } from "react-icons/bs";
import { Download } from "lucide-react";
import {posthog} from "posthog-js";


const PopupModal = ({  selectedImg}:{ selectedImg: string}) => {

    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "viewImage";

    const handleClose = () => {
        onClose();
      }
    
 return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}> 
     <DialogContent className="bg-white text-black  overflow-hidden p-8 ">
        <Image
        className="rounded-2xl"
              maxH={360}
              w="100%"
              roundedTop="lg"
              objectFit="cover"
              src={selectedImg}
              alt="CoverImage"
            />
        <DialogHeader className="pt-4 px-8">
          <DialogTitle className="text-2xl text-center font-bold">
          Add AI generated images to your website?
          </DialogTitle>
        </DialogHeader>
        {/* <DialogFooter> */}
          <div className="flex items-center justify-center">
            <Button  
             onClick={() => {
                posthog.capture("clickedDownload");
                window.open(selectedImg, "_blank");
              }}
            variant={"outline"} className="px-10 gap-2 dark:text-white">
                DownLoad <BsCloudDownload/>
            </Button>
            </div>
        {/* </DialogFooter> */}
    </DialogContent>
    </Dialog>
  )
}

export default PopupModal