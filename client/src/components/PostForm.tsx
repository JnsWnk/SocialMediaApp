import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@./redux/hooks";
import { createPost } from "@./redux/slices/postsSlice";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 3 characters.",
    })
    .max(999, {
      message: "Title has to be shorter than 1000 characters.",
    }),
  message: z
    .string()
    .min(1, {
      message: "Message must be at least 3 characters.",
    })
    .max(999, {
      message: "Message has to be shorter than 1000 characters.",
    }),
  author: z.string(),
  tags: z.string().array(),
  selectedFile: z.string(),
  likeCount: z.number(),
  createdAt: z.date(),
});

export type PostType = z.infer<typeof formSchema>;

export default function PostForm() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      author: "",
      likeCount: 0,
      selectedFile: "",
      tags: [],
      createdAt: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(createPost(values));
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center h-full justify-center">
      <Card className="w-1/2 flex flex-col p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Message..."
                      {...field}
                      id="message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedFile"
              render={({ field }) => (
                <FormItem>
                  {field.value && <img src={field.value} />}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload image"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Post</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
