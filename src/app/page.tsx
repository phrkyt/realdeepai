"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Head from "next/head";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [scrollingText, setScrollingText] = useState("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const searchText = query;
    setIsSearching(true);
    setScrollingText(searchText);
    setQuery("");

    try {
      // Simulate API call (replace with your actual API call)
      const response = await fetch('/api/gemini', { // Assuming you have an API route at /api/gemini
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data.response); // Assuming the API returns a 'response' field
    } catch (error) {
      console.error("API Error:", error);
      setApiResponse("Error fetching data from API.");
    }
  };

  useEffect(() => {
    if (isSearching && textContainerRef.current) {
      const textContainer = textContainerRef.current;
      const textWidth = textContainer.offsetWidth;
      const containerWidth = textContainer.parentElement?.offsetWidth || 0;
      const duration = (textWidth / 50) * 5;

      textContainer.style.animation = `scrollText ${duration}s linear infinite`;
    }
    return () => {
      if (textContainerRef.current) {
        textContainerRef.current.style.animation = '';
      }
    };
  }, [isSearching]);

  return (
    <>
      <Head>
        <title>AI Property Search</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
        {/* Top Content Area */}
        <div className={`w-full ${isSearching ? 'fixed top-0 left-0 p-4 bg-gray-800 text-white flex items-center space-x-4 z-10' : 'mt-8 relative max-w-2xl'
          } transition-all duration-500`} style={{ width: '100%', maxWidth: '100%' }}>
          {!isSearching ? (
            <>
              <h1 className="text-2xl font-bold font-serif text-white mb-4 text-center w-full">
                Deep Search for your Next Acquisition with AI
              </h1>
              <img
                src="/realdeep-high1.png"
                alt="Real Deep High"
                className={`mx-auto mb-4 h-64 w-auto transition-all duration-500`} // Increased image size
              />
            </>
          ) : (
            <div className="flex items-center w-full">
              <img
                src="/realdeep-high1.png"
                alt="Real Deep High"
                className="w-16 h-auto transition-all duration-500"
              />
              <div className="scrolling-text-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: 'calc(100% - 4rem)' }}>
                <div ref={textContainerRef} className="scrolling-text" style={{ display: 'inline-block' }}>
                  Searching Deep for: {scrollingText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl p-2 w-full max-w-2xl transition-all duration-500`}
        >
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for properties..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 px-6 text-gray-700 rounded-l-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors duration-200"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
        </form>
        {isSearching &&
          <div className="h-48"></div>}

        {/* API Response Bubble */}
        {apiResponse && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-black rounded-lg shadow-lg p-4 z-20 max-w-md text-center">
            {apiResponse}
          </div>
        )}
      </div>
    </>
  );
}