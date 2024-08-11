import {getPost} from "@/server/appwrite.server.config";
import Image from "next/image";
import {cn} from "@/lib/utils";

export default async function Page({params}: { params: { id: string } }) {
  const data = await getPost(params.id);
  console.log(data);
  return (
      <>
        <section>
          <Image
              src={`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_ID}/files/${data.image}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`}
              width={200}
              height={200}
              alt={data.name}/>
          <h1
              className={cn(`text-2xl font-bold`)}
          >{data.name}</h1>
          <p>{data.location}</p>
        </section>
      </>
  )
}