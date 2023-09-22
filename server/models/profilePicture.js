import mongoose from "mongoose";

const profilePictureSchema = mongoose.Schema({
  image: {
    type: String,
    default: "",
    require: true,
  },
});

const ProfilePicture = mongoose.model("ProfilePicture", profilePictureSchema);

export default ProfilePicture;
