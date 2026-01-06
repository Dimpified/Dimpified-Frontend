import React, { useEffect, useState } from "react";
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
import { Search } from "lucide-react";

// API Configuration using environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://dimpified-bckend-development.azurewebsites.net/api/v1";
const API_URL = `${API_BASE_URL}/all-blogs`;

// Async thunk for fetching all blogs
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

// Initial state
const initialState = {
  blogs: [],
  loading: false,
  error: null,
  success: false,
  count: 0,
};

// Blog slice
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs = action.payload.data || [];
        state.count = action.payload.count || 0;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Store configuration
const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
  },
});

// Export actions
export const { clearError } = blogSlice.actions;

// Format time ago function
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

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
      <div key={n} className="overflow-hidden">
        <div className="w-full h-52 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="p-5 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] px-4">
    <p className="text-red-500 text-lg mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Blog Card Component - Completely transparent, no backgrounds
const BlogCard = ({ blog, onClick }) => {
  return (
    <div
      className="overflow-hidden cursor-pointer group"
      onClick={() => onClick(blog._id)}
    >
      {/* IMAGE */}
      <div className="w-full h-52 rounded-2xl overflow-hidden mb-4">
        <img
          src={blog.coverPicture || "https://picsum.photos/500/400"}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* AUTHOR ROW */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link
            to={`/author/${blog.author?._id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-gray-900 hover:underline text-sm"
          >
            {blog.author?.fullName || "Unknown Author"}
          </Link>
        </div>
        <span className="text-gray-500 text-sm">
          {formatTimeAgo(blog.createdAt || blog.dateTime)}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 group-hover:text-purple-600 transition-colors">
        {blog.title || "Untitled"}
      </h3>

      {/* CATEGORY + DATE */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className="px-2 py-0.5 text-gray-700 font-medium">
          {(blog.category || "uncategorized").charAt(0).toUpperCase() +
            (blog.category || "uncategorized").slice(1)}
        </span>
        <span className="ml-auto">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown date"}
        </span>
      </div>
    </div>
  );
};

// Main AllBlogsPage Component
const AllBlogsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const { blogs, loading, error, count } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // Simple search function
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const allBlogs = blogs;

      if (searchTerm.trim() === "") {
        setFilteredBlogs(allBlogs);
      } else {
        const searchLower = searchTerm.toLowerCase();
        const filtered = allBlogs.filter(
          (blog) =>
            blog.title?.toLowerCase().includes(searchLower) ||
            blog.category?.toLowerCase().includes(searchLower) ||
            blog.author?.fullName?.toLowerCase().includes(searchLower) ||
            (blog.content && blog.content.toLowerCase().includes(searchLower))
        );
        setFilteredBlogs(filtered);
      }
    }
  }, [searchTerm, blogs]);

  const handleBlogClick = (blogId) => {
    const blog = blogs.find((b) => b._id === blogId);
    navigate(`/blog/${blogId}`, {
      state: { blogData: blog },
    });
  };

  const handleRetry = () => {
    dispatch(fetchAllBlogs());
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center bg-purple-100 mb-6  md:py-24 py-6 px-6 md:px-20 mt-16">
        {/* <p className="text-xl md:text-lg font-semibold mb-4 mt-6">All Story</p> */}
        <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-3">
          Discover All Our Stories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Get behind the scenes on our process, exciting news, and the people
          making dreams come true for millions of businesses.
        </p>

        {/* Simple Search Box */}
        <section className="pt-10 pb-10 flex justify-center px-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700 transition-all"
            />
          </div>
        </section>
      </section>

      {/* Blog Grid - Cards render directly on white section background */}
      <section className="px-6 md:px-32 lg:px-60  pb-20">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              {blogs.length === 0
                ? "No blogs available"
                : "No blogs found matching your search."}
            </p>
            {blogs.length === 0 && (
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors mt-4"
              >
                Refresh
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onClick={handleBlogClick} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
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
        <p className="mt-6 text-gray-100">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm, you'll get a response the following day.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Wrapper Component with Redux Provider
const AllBlogsPageWithRedux = () => {
  return (
    <Provider store={store}>
      <AllBlogsPage />
    </Provider>
  );
};

export default AllBlogsPageWithRedux;
