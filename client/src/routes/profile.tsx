import { useAppSelector } from "@./redux/hooks";
import { userInfo } from "@./redux/slices/userSlice";
import { fetchUserPosts, getUser } from "@/api";
import { Posts } from "@/components";
import { UserType } from "@/types";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const user = useAppSelector(userInfo);
  const [userData, setUserData] = useState<UserType>(null);
  const [userPosts, setUserPosts] = useState([]);

  const getUserData = async () => {
    if (!id) {
      if (user !== null) {
        return <Navigate to={`/profile/${user._id}`} />;
      }
      return <Navigate to={"/login"} />;
    }
    try {
      getUserPosts(id);
      const response = await getUser(id);
      const data = await response.data;
      if (!data) {
        toast("Error when loading profile");
        return;
      }
      setUserData(data);
    } catch (error) {
      toast("Couldnt load profile page");
    }
  };

  const getUserPosts = async (id: string) => {
    try {
      const response = await fetchUserPosts(id);
      const data = await response.data;
      if (!data) {
        toast("Error when loading posts");
        return;
      }
      setUserPosts(data);
    } catch (error) {
      toast("Couldn't load posts.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex justify-center">
      {userData ? (
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex flex-col items-center mb-5">
            <img
              src={userData.image}
              alt="Profile Icon"
              className="rounded-full w-16 h-16 object-cover"
            />
            <h1 className="mt-2 text-xl font-bold">{userData.name}</h1>
          </div>
          <div className="w-full">
            <Posts posts={userPosts} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
