// route.ts Next15
"use server";

import {NextResponse, NextRequest} from "next/server";
import {addPost} from "@/server/appwrite.server.config";
import {uploadFile} from "@/server/bucket/bucket.action";

export async function POST(
    req: NextRequest
) {
  try {
    const data = await req.json();

    const buffer = Buffer.from(data.image[0].data);
    const newImage = new File([buffer], data.image[0].name, {type: data.image[0].type});

    const formDataPayload = new FormData();
    formDataPayload.append('file', newImage);

    const imageUploadResult = await uploadFile(formDataPayload); // uploadFile is uploadFileToS3

    if (!imageUploadResult || !imageUploadResult.success || !imageUploadResult.url) {
      return NextResponse.json({
        error: `Failed to upload image to S3: ${imageUploadResult?.error || 'Unknown error'}`
      }, { status: 500 });
    }

    data.image = imageUploadResult.url; // Store S3 URL

    await addPost(data); // Assuming addPost can handle an image URL
    return NextResponse.json({message: 'Data processed and image uploaded successfully!', imageUrl: data.image});
  } catch (error: any) { // Added :any for error
    console.error('Error in API route:', error);
    return NextResponse.json({
          error: error.message || "An unexpected error occurred.",
        }, {
          status: 500
        }
    )
  }
}