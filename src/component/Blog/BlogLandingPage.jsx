import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

// API Configuration - ALL 3 ENDPOINTS
const API_BASE_URL = import.meta.env.VITE_API_URL;
const FEATURED_API_URL = `${API_BASE_URL}/category/educational`;
const RECENT_API_URL = `${API_BASE_URL}/all-blogs`;
const POPULAR_API_URL = `${API_BASE_URL}/popular-blogs`;

// Async thunks for all 3 endpoints
export const fetchFeaturedPost = createAsyncThunk(
  "blog/fetchFeaturedPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FEATURED_API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured post"
      );
    }
  }
);

export const fetchRecentPosts = createAsyncThunk(
  "blog/fetchRecentPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(RECENT_API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent posts"
      );
    }
  }
);

export const fetchPopularPosts = createAsyncThunk(
  "blog/fetchPopularPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POPULAR_API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch popular posts"
      );
    }
  }
);

// Initial state
const initialState = {
  featuredPost: null,
  recentPosts: [],
  popularPosts: [],
  loadingFeatured: false,
  loadingRecent: false,
  loadingPopular: false,
  error: null,
  success: false,
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";

  const createdTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

// Blog slice with all 3 endpoints
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Featured Post
      .addCase(fetchFeaturedPost.pending, (state) => {
        state.loadingFeatured = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPost.fulfilled, (state, action) => {
        state.loadingFeatured = false;
        state.featuredPost = action.payload.data?.[0] || null;
      })
      .addCase(fetchFeaturedPost.rejected, (state, action) => {
        state.loadingFeatured = false;
        state.error = action.payload || "Failed to load featured post";
      })
      // Recent Posts
      .addCase(fetchRecentPosts.pending, (state) => {
        state.loadingRecent = true;
        state.error = null;
      })
      .addCase(fetchRecentPosts.fulfilled, (state, action) => {
        state.loadingRecent = false;
        const allPosts = action.payload.data || [];
        const publishedPosts = allPosts.filter(
          (post) => post.status === "published"
        );
        const sortedPosts = publishedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        state.recentPosts = sortedPosts.slice(0, 3);
      })
      .addCase(fetchRecentPosts.rejected, (state, action) => {
        state.loadingRecent = false;
        state.error = action.payload || "Failed to load recent posts";
      })
      // Popular Posts
      .addCase(fetchPopularPosts.pending, (state) => {
        state.loadingPopular = true;
        state.error = null;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.loadingPopular = false;
        const allPosts = action.payload.data || [];
        state.popularPosts = allPosts.slice(0, 6);
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.loadingPopular = false;
        state.error = action.payload || "Failed to load popular posts";
      });
  },
});

// Store configuration
const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
});

// Export actions
export const { clearError } = blogSlice.actions;

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "No date";
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (error) {
    return "Invalid date";
  }
};

// Get short description from content
const getShortDescription = (content, title) => {
  if (content) {
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > 120 ? `${text.substring(0, 120)}...` : text;
  }
  return title || "No description available";
};

// Section Header Component
const SectionHeader = ({ title, onViewAll }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <button
      onClick={onViewAll}
      className="px-4 py-2 text-sm bg-violet-600 font-semibold rounded-lg text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none hover:bg-violet-800"
    >
      View All
    </button>
  </div>
);

// Post Card Component

const PostCard = ({ post, onClick }) => {
  return (
    <article
      onClick={() => onClick(post._id)}
      className="cursor-pointer group flex flex-col"
    >
      {/* IMAGE */}
      <div className="w-full h-52 rounded-2xl overflow-hidden mb-4">
        <img
          src={post.coverPicture || "https://picsum.photos/500/400"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* AUTHOR ROW - FIXED ALIGNMENT */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link
            to={`/author/${post.author?._id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-gray-900 hover:underline text-sm"
          >
            {post.author?.fullName || "Unknown Author"}
          </Link>
        </div>
        <span className="text-gray-400 text-sm">
          {formatTimeAgo(post.createdAt || post.dateTime)}
        </span>
      </div>

      {/* TITLE - CONSISTENT HEIGHT */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 group-hover:text-purple-600 transition-colors ">
        {post.title}
      </h3>

      {/* CATEGORY + DATE */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className="px-2 py-0.5 text-black font-medium">
          {(post.category || "uncategorized").charAt(0).toUpperCase() +
            (post.category || "uncategorized").slice(1)}
        </span>
        <span className="ml-auto">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* DESCRIPTION */}
      {/* <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {post.content}
      </p> */}
    </article>
  );
};

// Loading Skeletons
const FeaturedPostSkeleton = () => (
  <div className="relative rounded-2xl overflow-hidden shadow-sm mb-10 md:mb-12">
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[420px] bg-gray-200 animate-pulse"></div>
    <div className="relative bg-white p-6 sm:p-8 -mt-6 md:mt-0 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl md:w-[90%] lg:w-[80%] md:shadow-lg">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
    </div>
  </div>
);

const PostCardSkeleton = () => (
  <div className="flex flex-col">
    <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
  </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="text-center py-8">
    <p className="text-red-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
    >
      Retry
    </button>
  </div>
);

// Main BlogLandingPage Component
const BlogLandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    featuredPost,
    recentPosts,
    popularPosts,
    loadingFeatured,
    loadingRecent,
    loadingPopular,
    error,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchFeaturedPost());
    dispatch(fetchRecentPosts());
    dispatch(fetchPopularPosts());
  }, [dispatch]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleViewAllFeatured = () => {
    navigate("/all-blogs", { state: { filter: "featured" } });
  };

  const handleViewAllRecent = () => {
    navigate("/all-blogs", { state: { filter: "recent" } });
  };

  const handleViewAllPopular = () => {
    navigate("/single-blog", { state: { filter: "popular" } });
  };

  const handleRetry = () => {
    dispatch(fetchFeaturedPost());
    dispatch(fetchRecentPosts());
    dispatch(fetchPopularPosts());
  };

  return (
    <div className="font-sans text-gray-800">
      <Navbar />

      {/* HERO TITLE SECTION */}
      <section className="text-purple-600 md:py-32 py-16 bg-purple-100 px-6 md:px-20 flex flex-col items-center justify-center text-center mt-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold">Dimpified Blog</h2>
        </div>
      </section>

      {/* FEATURED POST SECTION */}
      <section className="py-10 px-6 md:px-32 lg:px-60">
        <SectionHeader
          title="Recent Story"
          onViewAll={handleViewAllFeatured}
        />

        {loadingFeatured ? (
          <FeaturedPostSkeleton />
        ) : error && !featuredPost ? (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        ) : featuredPost ? (
          <div
            className="relative rounded-2xl overflow-hidden  mb-12 cursor-pointer"
            onClick={() => handleBlogClick(featuredPost._id)}
          >
            {/* FEATURED IMAGE */}
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[460px]">
              <img
                src={
                  featuredPost.coverPicture || "https://picsum.photos/1200/600"
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://picsum.photos/1200/600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent md:hidden" />
            </div>

            {/* FLOATING CONTENT CARD */}
            <div
              className="
    relative bg-white p-8 sm:p-10 -mt-16
    md:absolute md:bottom-[-30px] md:right-0
    md:w-[80%] lg:w-[70%] lg:max-w-[calc(100%-2rem)]
    md:rounded-2xl md:shadow-xl
  "
            >
              {/* META */}
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-2">
                <span className="font-semibold text-black uppercase px-3 py-1  rounded-full">
                  {featuredPost.category || "Uncategorized"}
                </span>

                <span>
                  {formatDate(featuredPost.dateTime || featuredPost.createdAt)}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight hover:text-purple-600 transition-colors">
                {featuredPost.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-700 mb-5 text-base sm:text-lg line-clamp-3">
                {getShortDescription(featuredPost.content, featuredPost.title)}
              </p>

              {/* CTA BUTTON (matches image) */}
              <button className="px-5 py-2 border border-purple-500 text-purple-600 rounded-md text-sm hover:bg-purple-600 hover:text-white transition">
                Read More
              </button>
              {/* AUTHOR (hidden to match UI without altering structure) */}
              <div className="hidden">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold text-sm">
                    {featuredPost.author?.fullName?.charAt(0) || "U"}
                  </span>
                </div>
                <p className="text-purple-600 font-medium">
                  {featuredPost.author?.fullName || "Unknown Author"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured post available</p>
          </div>
        )}

        {/* RECENT POSTS SECTION */}
        <div className="mt-10">
          {loadingRecent ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <PostCardSkeleton key={n} />
              ))}
            </div>
          ) : error && recentPosts.length === 0 ? (
            <ErrorDisplay error={error} onRetry={handleRetry} />
          ) : recentPosts.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onClick={handleBlogClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent posts available</p>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR POSTS SECTION */}
      <section className="py-16 px-6 md:px-32 lg:px-60">
        <SectionHeader title="Popular Stories" onViewAll={handleViewAllPopular} />

        {loadingPopular ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <PostCardSkeleton key={n} />
            ))}
          </div>
        ) : error && popularPosts.length === 0 ? (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        ) : popularPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {popularPosts.map((post) => (
              <PostCard key={post._id} post={post} onClick={handleBlogClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No popular posts available</p>
          </div>
        )}
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Get our stories delivered from <br /> us to your inbox weekly.
        </h3>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto px-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:text-purple-700 hover:bg-white border border-white"
          >
            Get started
          </button>
        </form>
        <p className="mt-6 text-sm">
          Get a response tomorrow if you submit by 9pm today. If we receive it
          after 9pm, you'll get a response the following day.
        </p>
      </section>

      <Footer />
    </div>
  );
};

// Wrapper Component with Redux Provider
const BlogLandingPageWithRedux = () => {
  return (
    <Provider store={store}>
      <BlogLandingPage />
    </Provider>
  );
};

export default BlogLandingPageWithRedux;
