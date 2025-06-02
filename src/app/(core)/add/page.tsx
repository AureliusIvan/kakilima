"use client";

import {FieldValues, useForm} from "react-hook-form";
import {Progress} from "@/components/ui/progress";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {redirect, useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {uploadFile} from "@/server/bucket/bucket.action";
import {addPost} from "@/server/appwrite.server.config";
import Image from "next/image";
import {account} from "@/utils/appwrite/appwrite.config";

interface FormField {
  name: string;
  description: string;
  location: string;
}

const ProgressPage = [
  {
    id: 1,
    name: "Where is the KakiLima store located?",
    description: "help others find the store.",
    form: {
      fields: [],
    }
  },
  {
    id: 2,
    name: "Details",
    description: "Add your store details here.",
    form: {
      fields: [
        {
          name: "name",
          label: "Store Name",
          type: "text",
          required: true,
        },
        {
          name: "location",
          label: "Store Location",
          type: "text",
          required: true,
        },
        {
          name: "image",
          label: "Store Image",
          type: "file",
          required: false,
        }
      ],
    }
  },
]

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();
  const {toast} = useToast()
  const router = useRouter()

  const [progress, setProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

  function handleNext() {
    if (progress === ProgressPage.length - 1) {
      return;
    }
    setProgress(progress + 1);
  }

  function handlePrevious() {
    if (progress === 0) {
      return;
    }
    setProgress(progress - 1);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const imageFile = data.image[0] as File;
      if (!imageFile) {
        toast({
          title: 'Error',
          description: 'Please select an image for the store.',
          variant: 'destructive'
        });
        return;
      }

      const formDataPayload = new FormData();
      formDataPayload.append('file', imageFile);

      // uploadFile is now uploadFileToS3 and expects FormData
      const res = await uploadFile(formDataPayload);

      if (!res || !res.success || !res.url) {
        toast({
          title: 'Error',
          description: `Failed to upload image: ${res?.error || 'Unknown error'}`,
          variant: 'destructive'
        });
        return;
      }

      const imageUrl = res.url; // Use the S3 URL
      const store = {
        name: data.name,
        location: data.location,
        image: imageUrl, // Store the S3 URL
      };

      await addPost(store);
      toast({
        title: 'Success',
        description: 'Store added successfully',
      });
      // Optionally, redirect or reset the form
      // router.push('/');
    } catch (e: any) { // Added type any for error object
      console.error(e);
      toast({
        title: 'Error',
        description: e.message || 'Failed to add store', // Use e.message if available
        variant: 'destructive',
      });
    }
  }

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col items-center justify-center`}
      >
        <Tabs
            value={ProgressPage[progress].name}
        >
          <Progress
              value={(progress + 1) * 100 / ProgressPage.length}
              className={cn(`text-primary`)}
          />

          {
            ProgressPage.map((page) => (
                <TabsContent
                    className={cn(`flex flex-col gap-4 lg:w-[600px] py-2`)}
                    key={page.id}
                    value={page.name}
                >
                  <h2
                      className={cn(`text-2xl font-bold`)}
                  >
                    {page.name}
                  </h2>

                  <p>
                    {page.description}
                  </p>
                  {
                    page.form.fields.map((field: {
                      name: string;
                      label: string;
                      type: string;
                      required: boolean;
                    }) => (
                        <label
                            className={`flex flex-col`}
                            key={field.name}>
                          {field.label}
                          <Input
                              type={field.type}
                              placeholder={field.label}
                              {...register(field.name, {required: field.required})}
                          />
                        </label>
                    ))
                  }
                </TabsContent>)
            )
          }

          <div
              className={cn(`flex gap-3 justify-between`)}
          >

            <Button
                className={cn(`${progress === 0 ? 'hidden' : 'block'}`)}
                type={"button"}
                onClick={handlePrevious}
            >
              Previous
            </Button>

            <Button
                className={cn(`${progress === ProgressPage.length - 1 ? 'hidden' : 'block'}`)}
                type={"button"}
                onClick={handleNext}
            >
              Next
            </Button>

            <Button
                className={cn(`${progress === ProgressPage.length - 1 ? 'block' : 'hidden'}`)}
                type={"submit"}
            >
              Submit
            </Button>
          </div>
        </Tabs>
      </form>
  )
}