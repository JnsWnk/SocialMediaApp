import { registerUser } from "@/api";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8),
  image: z.string(),
});

export type UserType = z.infer<typeof formSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: UserType) {
    setIsLoading(true);

    const formData = new FormData();
    for (const key in values) {
      const value = values[key as keyof UserType];
      formData.append(key, value);
    }
    const response = await registerUser(formData);
    const newUser = await response.data;
    setIsLoading(false);
    if (newUser) {
      navigate("/login");
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
    <div className="flex flex-col min-h-screen px-28">
      <div className="flex justify-center">
        <Card className="w-1/2">
          <CardHeader className="space-y-1 grid gap-4">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up with Google or create an account below
            </CardDescription>
            <div className="flex justify-center items-center">
              <Button variant="outline" className="w-3/5">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="account-form_image-label">
                        {field.value ? (
                          <img
                            src={field.value}
                            alt="profile_icon"
                            className="rounded-full w-32 h-32 object-contain"
                          />
                        ) : (
                          <img
                            src="/profile.svg"
                            alt="profile_icon"
                            className="object-contain w-16 h-16"
                          />
                        )}
                      </FormLabel>
                      <FormControl className="flex-1 text-base-semibold text-gray-200 w-min">
                        <Input
                          type="file"
                          accept="image/*"
                          placeholder="Add profile photo"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                      <FormDescription>Upload a profile photo.</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>Create Account</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
