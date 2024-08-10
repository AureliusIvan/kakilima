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
    const image = await uploadFile(newImage);
    data.image = image["$id"];
    await addPost(data);
    return NextResponse.json({message: 'Hello from Next.js!'});
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
          error: error,
        }, {
          status: 500
        }
    )
  }
}