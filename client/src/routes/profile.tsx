import { useAppSelector } from "@./redux/hooks";
import { userInfo } from "@./redux/slices/userSlice";

const Profile = () => {
  const user = useAppSelector(userInfo);
  return (
    <div>
      <h1> Profile </h1>
      {user?.name}
    </div>
  );
};

export default Profile;
