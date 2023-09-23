import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@./redux/hooks";
import { logout, updateUserBio, userInfo } from "@./redux/slices/userSlice";
import { toast } from "react-toastify";
import { updateBio, updatePassword } from "@/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Icons } from "./icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password has to be at least 8 characters long.",
  }),
  newPassword: z.string().min(8, {
    message: "Password has to be at least 8 characters long.",
  }),
});

const EditProfile = (props: any) => {
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await updatePassword(user._id, {
        currentPw: values.currentPassword,
        newPw: values.newPassword,
      });
      const newUser = response.data;
      if (!newUser) {
        toast("Error when changing password");
        return;
      }
      dispatch(logout());
      toast("Successfully updated password. Please log in again.");
      navigate("/login");
    } catch (error) {
      toast("Error when changing password");
    }
    setIsLoading(false);
  }

  const handleBioChange = (event: any) => {
    setBio(event.target.value);
  };

  const saveProfile = async () => {
    if (!user) return;
    try {
      const response = await updateBio(user._id, bio);
      const newBio = await response.data;
      if (!newBio) {
        toast("Couldnt update profile");
        return;
      }
      dispatch(updateUserBio({ bio: newBio }));
      toast("Successfully updated profile");
    } catch (error) {
      toast("Couldnt update profile.");
    }
  };

  useEffect(() => {
    if (user) {
      setBio(user.bio);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  You can edit your profile here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/*<div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={handleNameChange} />
                  </div> */}
                <div className="space-y-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    placeholder="Describe yourself..."
                    id="bio"
                    value={bio}
                    onChange={handleBioChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    saveProfile();
                  }}
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-2">
                    <CardContent className="space-y-2">
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">
                        {isLoading ? (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <>Save</>
                        )}
                      </Button>
                    </CardFooter>
                  </div>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
