import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/auth/authSlice";
import { Camera, MapPin, Pencil, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import FeedCard from "../components/FeedCard";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [coverPhotoUploadBox, setCoverPhotoUploadBox] = useState(false);
  const fileInputRef = useRef(null);

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  const [profileUploaderBox, setProfileUploaderBox] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 5 MB = 5 * 1024 * 1024 bytes
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = ""; // Reset input
      return;
    }

    setCoverPhoto(file);
    setCoverPreview(URL.createObjectURL(file));
  };
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 5 MB = 5 * 1024 * 1024 bytes
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = ""; // Reset input
      return;
    }

    setProfilePhoto(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const uploadCoverPhoto = async () => {
    if (!coverPhoto) return;

    const formData = new FormData();
    formData.append("coverPhoto", coverPhoto);

    try {
      const { data } = await api.patch("/user/me/cover-photo", formData);

      dispatch(setUserData(data.data));
      setCoverPhotoUploadBox(false);
    } catch (err) {
      console.error(err);
    }
  };
  const uploadProfilePhoto = async () => {
    if (!profilePhoto) return;

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    try {
      const { data } = await api.patch("/user/me/profile-photo", formData);

      dispatch(setUserData(data.data));
      setProfileUploaderBox(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await api.get("/user/me");

        dispatch(setUserData(result.data.data));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const result = await api.get("/post/getposts");

        console.log(result.data.data.posts);
        setPosts(result?.data?.data.posts);
      } catch (error) {}
    };

    fetchProfile();
    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (coverPhotoUploadBox || profileUploaderBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [coverPhotoUploadBox, profileUploaderBox]);

  return (
    <>
      {coverPhotoUploadBox && (
        <>
          <div className="bg-[rgba(0,0,0,0.75)] w-full h-screen absolute z-60" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-100 md:w-200 z-61 h-80.75 rounded-xl bg-white flex flex-col overflow-hidden">
            <header className="h-12.5 pr-6 pl-6 pt-3 pb-3 flex justify-between items-center">
              <h1 className="text-[20px] font-semibold">Cover Photo</h1>
              <X onClick={() => setCoverPhotoUploadBox(false)} />
            </header>
            <div className="relative h-49.5 bg-linear-to-r from-green-600 via-green-500 to-emerald-400">
              <img
                src={coverPreview || user?.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center flex-1 items-center">
              <div className="flex justify-center flex-1 items-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Camera size={28} />
                  <span className="mt-2 text-sm font-medium">Change photo</span>
                </div>
              </div>
              <div className="flex justify-center flex-1 items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleCoverPhotoChange}
                />
                <div className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-green-600 transition-colors">
                  <Upload size={28} onClick={uploadCoverPhoto} />
                  <span className="mt-2 text-sm font-medium">Upload photo</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {profileUploaderBox && (
        <>
          <div className="bg-[rgba(0,0,0,0.75)] w-full h-screen absolute z-60" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-100 md:w-200 z-61 h-115.75 rounded-xl bg-white flex flex-col overflow-hidden">
            <header className="h-12.5 pr-6 pl-6 pt-3 pb-3 flex justify-between items-center border-b border-zinc-200">
              <h1 className="text-[20px] font-semibold">Profile Photo</h1>
              <X onClick={() => setProfileUploaderBox(false)} />
            </header>
            <div className="relative h-68 ">
              <img
                src={profilePreview || user?.profilePhoto}
                alt="Cover"
                className=" absolute w-71 h-71 object-cover rounded-full left-1/2 top-5 -translate-x-1/2"
              />
            </div>
            <div className="flex justify-center bottom-2 absolute w-full items-center">
              <div className="flex justify-center flex-1 items-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Camera size={28} />
                  <span className="mt-2 text-sm font-medium">Change photo</span>
                </div>
              </div>
              <div className="flex justify-center flex-1 items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfilePhotoChange}
                />
                <div className="flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-green-600 transition-colors">
                  <Upload size={28} onClick={uploadProfilePhoto} />
                  <span className="mt-2 text-sm font-medium">Upload photo</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <NavBar />
      <div className="md:pl-85 md:pr-85 px-2 h-screen dark:bg-[#1E1E1E] overflow-x-hidden">
        <div className="flex pt-5 gap-5 ">
          <div className=" relative bg-white flex-1 mb-3 pb-5 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm overflow-hidden">
            <div className="relative h-49.5 bg-linear-to-r from-green-600 via-green-500 to-emerald-400 overflow-hidden">
              <img src={user?.coverPhoto || ""} alt="" className="w-full " />
              <Pencil
                className="text-zinc-900 absolute right-3 top-3"
                onClick={() => setCoverPhotoUploadBox(true)}
              />
            </div>
            <div className="absolute top-40 left-5">
              <div className="-mt-10 flex justify-center">
                <img
                  onClick={() => setProfileUploaderBox(true)}
                  src={
                    user?.profilePhoto ||
                    `https://ui-avatars.com/api/?name=${user?.userName}`
                  }
                  alt=""
                  className="w-38 h-38 rounded-full border-4 border-white dark:border-zinc-900 object-cover"
                />
              </div>
            </div>
            <div className="mt-25 pl-7">
              <h2 className="font-bold text-3xl text-gray-900 dark:text-white">
                {user?.fullName}
              </h2>
              <p className="text-green-600 font-medium">Football Player</p>
              <div className="flex items-center  gap-1 text-sm text-gray-500 mt-2">
                <MapPin size={15} />
                {user?.location?.country}, {user?.location?.district}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {posts.map((post) => (
            <FeedCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
