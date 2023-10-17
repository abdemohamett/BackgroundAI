"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardFooter, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import prompts from '@/helpers/prompts'
// import Image from 'next/image'
import Link from 'next/link'
import {posthog} from 'posthog-js'
import React from 'react'
import { BsCloudDownload, BsImage } from "react-icons/bs";

import {FaSpinner} from 'react-icons/fa'

import {
  Image,
  useToast,
} from "@chakra-ui/react";
import PopupModal from '@/components/PopupModal'
import { useModal } from '@/hooks/use-modal-store'
// import PopupModal from '@/components/ui/PopupModal'

const Home = () => {
  const [selectedImg, setSelectedImg] = React.useState<string>("");
  const [prompt, setPrompt] = React.useState<string>(
    "futuristic tree house, hyper realistic, epic composition, cinematic, landscape vista photography by Carr Clifton & Galen Rowell, Landscape veduta photo by Dustin Lefevre & tdraw, detailed landscape painting by Ivan Shishkin, rendered in Enscape, Miyazaki, Nausicaa Ghibli, 4k detailed post processing, unreal engine"
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const {onOpen} = useModal()

  const toast = useToast();

    // this method generates the images
    const generate = React.useCallback(async () => {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json()
      if (data.error) {
        // toast({
        //   title: "Error",
        //   description: data.error + " " + data.message,
        //   status: "error",
        // });
        setLoading(false);
        return;
      }
  
      setSelectedImg(data.images);
      setLoading(false);
  
      setTimeout(() => {
        // onOpen();
      }, 2000);
    }, [prompt]);


  return (
    <>
   <PopupModal
    selectedImg={selectedImg}
   />
    
    <div className="pt-32 md:max-w-4xl mx-4 md:mx-auto">
    <Card>
      <div className="relative">
      <Image
      className='rounded-t-xl'
              opacity={loading ? 0.5 : 1}
              maxH={360}
              w="100%"
              roundedTop="lg"
              objectFit="cover"
              src={
                selectedImg
                  ? selectedImg
                  : "/placeholder.png"
              }
              alt="CoverImage"
            />

    {selectedImg && (
      <Button className='flex items-center gap-2 absolute bottom-1 right-1 '
      onClick={() => {
        posthog.capture("openedDownloadModal");
        onOpen('viewImage');
      }}

      variant={'outline'}
      >
        Download
        <BsCloudDownload/>
      </Button>
    )}
    </div>
    <CardTitle className='py-5 text-center text-3xl px-4 mx-4'>
       Get Amazing AI Cover Images In Seconds! 🔥
    </CardTitle>
   
   <div className="py-4 px-10 flex items-center gap-3">
    <Input
    className='md:-px-10'
     placeholder="Enter an image prompt here"
     onChange={(e) => setPrompt(e.target.value)}
     value={prompt}
    />
    <Button
    onClick={() => {
      generate();
    }}
    disabled={loading}
    className='text-md gap-2'>
      Generate <BsImage/>
      {loading && <FaSpinner className="animate-spin" />}
   </Button>
   </div>
   <div className="space-y-4 text-center space-x-4 px-4 py-3">
    {prompts.map((prompt, index) => (
     <Button
     className='rounded-full gap-2'
     size={'sm'}
     key={index}
     onClick={() => {
      setPrompt(prompt.prompt);
    }}
     >
      {prompt.label}
     </Button>
    ))}
   </div>

    <div className='p-6 text-center'>
      <h2 className='text-xl font-medium'>
      Takes about 30 seconds. Powered by {" "}
      <Link
      className='hover:underline text-blue-400'
      target="_blank"
      href={'https://tryleap.ai'}
      >Leap API</Link>
      </h2>
    </div>
    </Card>
    </div>
    </>
  )
}

export default Home