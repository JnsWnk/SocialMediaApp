import { useAppDispatch, useAppSelector } from "@./redux/hooks";
import { updateFriends, userInfo } from "@./redux/slices/userSlice";
import { fetchUserPosts, followUser, getUser } from "@/api";
import { Posts } from "@/components";
import EditProfile from "@/components/editProfile";
import { UserType } from "@/types";
import { Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<UserType>(null);
  const [userPosts, setUserPosts] = useState([]);
  const self = user?._id === userData?._id;
  const [loading, setLoading] = useState<boolean>(false);

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

  const follow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!user) {
        toast("Please log in first.");
        return <Navigate to={"/login"} />;
      }
      if (!userData) return;
      const response = await followUser({
        selfId: user._id,
        followId: userData._id,
      });
      const data = await response.data;
      if (!data) {
        toast("Error when following user");
        return;
      }
      dispatch(updateFriends({ friends: data.friends }));
    } catch (error) {
      toast("Error when following user.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, [user, id]);

  return (
    <div className="flex justify-center">
      {userData ? (
        <div className="w-full max-w-screen-lg mx-auto p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={userData.image.image}
                alt="Profile Icon"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-gray-600"> {userData.bio} </p>
                <div className="mt-2 flex items-center">
                  <div className="mr-4 flex items-center">
                    <Mail className="text-gray-600" />
                    <p className="ml-2">{userData.email}</p>
                  </div>
                  <div className="mr-4 flex items-center">
                    <User className="text-gray-600" />
                    <p className="ml-2">{userData.friends.length} friends</p>
                  </div>
                  <div className="mr-4 flex items-center">
                    <p className="text-gray-600">{userPosts.length} posts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {user &&
                (!self ? (
                  <div className="mr-4 flex items-center">
                    <button
                      onClick={() => {
                        follow();
                      }}
                      className="bg-[#FFC107] hover:bg-[#ffd24c] text-white py-2 px-4 rounded-full focus:outline-none transition duration-300 font-semibold"
                    >
                      {user.friends.includes(userData._id) ? (
                        <p>Following</p>
                      ) : (
                        <p>Follow</p>
                      )}
                    </button>
                  </div>
                ) : (
                  <EditProfile />
                ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">{userData.name}'s Posts</h2>
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
