import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import FeedCard from "../components/FeedCard";
import PostingBox from "../components/PostingBox";
import CreatePostModal from "../components/Post/CreatePostModal";
import BannerCard from "../components/banner/BannerCard";
import DesktopPostFilters from "../components/filters/DesktopPostFilters.jsx";
import usePostFilters from "../hooks/usePostFilters";
import usePosts from "../hooks/usePosts";
import useBannerFeed from "../hooks/userBannerFeed";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/auth/authSlice.js";
import api from "../utils/axios";
import "react-indiana-drag-scroll/dist/style.css";
import PostSkeleton from "../components/PostSkeleton.jsx";
import { setPosts } from "../features/post/postSlice.js";
import { updatePostLike } from "../features/post/postSlice.js";
import { toast } from "react-toastify";
import HomeHeader from "../components/HomeHeader.jsx";
import SearchBar from "../components/Search/SearchBar.jsx";
import MobilePostFilters from "../components/filters/MobilePostFilters.jsx";
import ProfileMenu from "../components/ProfileMenu.jsx";
const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [isPosting, setIsPosting] = useState(false);
  const {
    filterOptions,
    selectedFilters,
    updateFilter,
    resetFilters,
    loadingFilters,
  } = usePostFilters();
  const { posts, loadingPosts } = usePosts(selectedFilters);
  const banners = useBannerFeed(selectedFilters.sport);
  const bannerInterval = 3;
  const [profileMenu, setProfileMenu] = useState(false);

  const handleLike = async (postId) => {
    try {
      const { data } = await api.post(`/post/${postId}/like`);

      const result = data.data;

      dispatch(
        updatePostLike({
          postId,
          liked: result.liked,
          likes: result.likes,
        }),
      );
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update like.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await api.get("/user/me");
        dispatch(setUserData(result.data.data));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [dispatch]);
  useEffect(() => {
    if (isPosting || profileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPosting, profileMenu]);
  return (
    <>
      <NavBar setIsPosting={setIsPosting} />
      <div className="pt-2 pb-1 md:hidden w-full px-3 grid grid-cols-[1fr_auto] gap-2 dark:bg-[#1E1E1E] ">
        <div className="min-w-0 flex items-center gap-2">
          <img
            src={
              user?.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || "User")}&background=1f2937&color=fff`
            }
            alt={user?.userName || "Profile"}
            className=" w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => setProfileMenu((prev) => !prev)}
          />
          <SearchBar />
        </div>

        <MobilePostFilters
          filterOptions={filterOptions}
          filters={selectedFilters}
          onUpdateFilter={updateFilter}
          onReset={resetFilters}
        />
      </div>
      {profileMenu && <ProfileMenu setProfileMenu={setProfileMenu} />}
      <div className=" flex gap-5 min-h-screen py-3 px-2 md:px-40 dark:bg-[#1E1E1E] transition-colors duration-300 ">
        {/* LEFT */}

        <div className="hidden md:block sticky top-20">
          <ProfileCard />
        </div>
        {/* CENTER */}
        <div className="flex-1 min-w-0">
          {/* CREATE POST */}
          <PostingBox onClick={() => setIsPosting(true)} />
          {/* FILTERS */}
          <div className="md:mt-3">
            {!loadingFilters && (
              <DesktopPostFilters
                filterOptions={filterOptions}
                filters={selectedFilters}
                onUpdateFilter={updateFilter}
                onReset={resetFilters}
              />
            )}
          </div>
          {/* POSTS */}
          <div className="md:mt-3 space-y-5">
            {loadingPosts ? (
              <div className="space-y-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No posts found.
              </div>
            ) : (
              posts.map((post, index) => (
                <React.Fragment key={post._id}>
                  <FeedCard post={post} onLike={handleLike} />
                  {/* * Banner after every * 3 posts. */}
                  {(index + 1) % bannerInterval === 0 && banners.length > 0 && (
                    <BannerCard
                      banner={
                        banners[
                          Math.floor((index + 1) / bannerInterval - 1) %
                            banners.length
                        ]
                      }
                    />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="hidden md:block bg-red-400 w-70">Right</div>
      </div>
      <CreatePostModal
        open={isPosting}
        onClose={() => setIsPosting(false)}
        user={user}
      />
    </>
  );
};
export default HomePage;
