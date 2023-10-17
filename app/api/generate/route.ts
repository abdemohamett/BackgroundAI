import { NextResponse } from "next/server";
import { Leap } from "@leap-ai/sdk";
import { nsfwCheck } from "@/helpers/nsfw";


export async function POST(req: Request, res: Response){
 try {
  const body = await req.json()
  const {prompt} = body

  const api_key = process.env.API_KEY as string;

  if(!api_key){
    return NextResponse.json(
        { error: "Invalid request. Check API Key",},
        { status: 400 }
      );
  }

    // instantiate sdk
    const leap = new Leap(api_key);

    let images = <string[]>[];
  
    const { isNsfw } = nsfwCheck(prompt);
  
    if(!isNsfw){
       NextResponse.json(
        {error: 'error: "NSFW prompt detected. Please try again with a different prompt'},
        {status: 400}
        )
    }

    const random = Math.floor(Math.random() * 100);
    const { data: image, error: imageError } = await leap.generate.generateImage({
      prompt: prompt,
      numberOfImages: 1,
      steps: 30,
      upscaleBy: "x1",
      height: 384,
      width: 832,
      modelId:
        random > 0 && random <= 30
          ? "8b1b897c-d66d-45a6-b8d7-8e32421d02cf" // SD 1.5
          : random > 30 && random < 65
          ? "eab32df0-de26-4b83-a908-a83f3015e971	" // realistic vision
          : "ee88d150-4259-4b77-9d0f-090abe29f650	", // SD 2.1
    });

    if (imageError){
        return NextResponse.json(imageError, {status: 500}) 
    }

    if (image) {
        image.images.forEach((image) => {
          images.push(image.uri);
        });
      }

      return NextResponse.json({ images: images }, {status: 200})
 } catch (error) {
   console.log(error)
 }
}