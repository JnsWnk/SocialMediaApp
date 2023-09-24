import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useState } from "react";
import { createPost } from "@/api";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@./redux/hooks";
import { userInfo, tokenInfo } from "@./redux/slices/userSlice";
import { toast } from "react-toastify";

const formSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: "Message cant be empty.",
    })
    .max(999, {
      message: "Message has to be shorter than 1000 characters.",
    }),
  selectedFile: z.string(),
});

type PostType = z.infer<typeof formSchema>;

export default function PostForm() {
  const navigate = useNavigate();
  const user = useAppSelector(userInfo);
  const token = useAppSelector(tokenInfo);

  if (user === null || token === null) {
    navigate("/login");
    return;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      selectedFile: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token || !user) {
      toast("Please log in to create a post.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("userName", user.name);
      formData.append("userId", user._id);
      for (const key in values) {
        const value = values[key as keyof PostType];
        formData.append(key, value);
      }
      const response = await createPost(formData);
      if (response.data) {
        toast("Sucessfully created post.");
        navigate("/");
      }
    } catch (error) {
      toast("Post could not be created.");
    }
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
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
