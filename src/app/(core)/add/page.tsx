"use client";

import {FieldValues, useForm} from "react-hook-form";
import {Progress} from "@/components/ui/progress";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {redirect} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {uploadFile} from "@/server/bucket/bucket.action";
import {addPost} from "@/server/appwrite.server.config";
import Image from "next/image";

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
      const res = await uploadFile(data.image[0])
      const image = res["$id"]
      const store = {
        name: data.name,
        location: data.location,
        image: image,
      }
      await addPost(store)
      toast({
        title: 'Success',
        description: 'Store added successfully',
      })
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'Failed to add store',
      })
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
          <Progress value={(progress + 1) * 100 / ProgressPage.length}/>

          {
            ProgressPage.map((page) => (
                <TabsContent
                    className={cn(`flex flex-col gap-4 w-[600px] py-2`)}
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
              className={cn(`flex gap-3 `)}
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