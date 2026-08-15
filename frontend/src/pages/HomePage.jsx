import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import FeedCard from "../components/FeedCard";
import PostingBox from "../components/PostingBox";
import CreatePostModal from "../components/Post/CreatePostModal";
import BannerCard from "../components/banner/BannerCard";
import PostFilters from "../components/filters/PostFilters";
import usePostFilters from "../hooks/usePostFilters";
import usePosts from "../hooks/usePosts";
import useBannerFeed from "../hooks/userBannerFeed";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/auth/authSlice.js";
import api from "../utils/axios";
import "react-indiana-drag-scroll/dist/style.css";
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
    if (isPosting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPosting]);
  return (
    <>
      <NavBar />
      <div className=" flex gap-5 min-h-screen py-3 px-2 md:px-40 dark:bg-[#1E1E1E] transition-colors duration-300 ">
        {/* LEFT */}
        <div className="hidden md:block sticky top-20">
          <ProfileCard />
        </div>
        {/* CENTER */}
        <div className="flex-1 min-w-0">
          {/* CREATE POST */} <PostingBox onClick={() => setIsPosting(true)} />
          {/* FILTERS */}
          <div className="mt-3">
            {!loadingFilters && (
              <PostFilters
                filterOptions={filterOptions}
                filters={selectedFilters}
                onUpdateFilter={updateFilter}
                onReset={resetFilters}
              />
            )}
          </div>
          {/* POSTS */}
          <div className="mt-3 space-y-5">
            {loadingPosts ? (
              <div className="py-10 text-center text-gray-500">
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No posts found.
              </div>
            ) : (
              posts.map((post, index) => (
                <React.Fragment key={post._id}>
                  <FeedCard post={post} />
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
{
  /* <div className="relative"> <div className="h-8 w-40 flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden"> <div className="w-[45%] h-full flex items-center justify-center border-r border-zinc-200 dark:border-zinc-700"> <span className="text-md text-zinc-400 dark:text-zinc-500"> Sport </span> </div> <button type="button" onClick={() => setIsSportOpen(!isSportOpen)} className="w-[55%] h-full flex items-center justify-center gap-1.5 text-md font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition" > <span> {SPORTS.find((sport) => sport.value === activeSport)?.label || "None"} </span> <ChevronDown size={18} className={`transition-transform ${ isSportOpen ? "rotate-180" : "" }`} /> </button> </div> {isSportOpen && ( <div className="absolute top-10 right-0 z-50 w-40 p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg"> {SPORTS.map((sport) => ( <button key={sport.value} type="button" onClick={() => { setActiveSport(sport.value); setIsSportOpen(false); }} className={`w-full px-3 py-2 text-left text-sm rounded-lg transition ${ activeSport === sport.value ? "bg-green-600 text-white" : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800" }`} > {sport.label} </button> ))} </div> )} </div> */
}
{
  /* <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm"> <DragScroll className="px-4 py-3"> <div className="flex gap-3 w-max"> {SPORTS.map((sport) => ( <button key={sport.value} onClick={() => setActiveSport(sport.value)} className={`shrink-0 px-4 py-2 rounded-full transition ${ activeSport === sport.value ? "bg-green-600 text-white" : "bg-zinc-100 hover:bg-zinc-200" }`} > {sport.label} </button> ))} </div> </DragScroll> </div> */
}
