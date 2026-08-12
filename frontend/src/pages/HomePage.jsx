import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import FeedCard from "../components/FeedCard";
import api from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/auth/authSlice.js";
import PostingBox from "../components/PostingBox.jsx";
import CreatePostModal from "../components/Post/CreatePostModal.jsx";
import "react-indiana-drag-scroll/dist/style.css";
import DragScroll from "../components/DragScroll.jsx";
import BannerCard from "../components/banner/BannerCard.jsx";
import useBannerFeed from "../hooks/userBannerFeed.js";
import { SPORTS } from "../constants/postOptions.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);

  const [isPosting, setIsPosting] = useState(false);

  const [activeSport, setActiveSport] = useState("all");
  const banners = useBannerFeed(activeSport);

  const bannerInterval = 3;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await api.get("/user/me");
        console.log(result.data);
        dispatch(setUserData(result.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const params = {};

        // Only send sport when it isn't "all"
        if (activeSport && activeSport !== "all") {
          params.sport = activeSport;
        }

        const { data } = await api.get("/post/posts", {
          params,
        });

        setPosts(data.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [dispatch, activeSport]);

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

      <div className="flex gap-5 h-screen py-5 px-2 md:px-40 dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="hidden md:block sticky top-20">
          <ProfileCard />
        </div>

        <div className="flex-1 min-w-0">
          <PostingBox onClick={() => setIsPosting(true)} />

          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm">
            <DragScroll className="px-4 py-3">
              <div className="flex gap-3 w-max">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.value}
                    onClick={() => setActiveSport(sport.value)}
                    className={`shrink-0 px-4 py-2 rounded-full transition ${
                      activeSport === sport.value
                        ? "bg-green-600 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200"
                    }`}
                  >
                    {sport.label}
                  </button>
                ))}
              </div>
            </DragScroll>
          </div>

          <div className="mt-3 space-y-5">
            {posts.map((post, index) => (
              <React.Fragment key={post._id}>
                <FeedCard post={post} />

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
            ))}
          </div>
        </div>
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
