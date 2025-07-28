"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitStatus({ type: null, message: "" });
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to submit email');
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you for subscribing!"
      });
      setEmail("");
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit email"
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Gradient */}
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        priority
        className="object-cover fixed"
        quality={100}
      />

      {/* Background Video with Opacity */}
      <div className="fixed inset-0 z-[1] bg-black/20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
          onError={(e) => console.error("Video error:", e)}
        >
          <source
            src="/replay_bg_video.mp4"
            type="video/mp4"
            onError={(e) => console.error("Source error:", e)}
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Coming Soon Text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <p className="vertical-text text-[#00FF7F] tracking-[0.2em] text-sm">COMING SOON</p>
      </div>

      {/* Login Button */}
      <div className="absolute top-8 right-8 z-30 italic">
        <button className="login-button" onClick={() => setShowLoginModal(true)}>
          LOGIN
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-[#192A25]/90 p-12 rounded-lg w-full max-w-md backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-[#00ED64] hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                  <label className="block text-[#00ED64] text-xs tracking-[0.2em] italic">
                  USER ID
                </label>
                <input
                  type="text"
                  className="w-full bg-[#BEBFBF] border border-white/10 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base text-[#192A25] placeholder-[#192A25]/50 outline-none focus:border-[#00ED64] transition-colors"
                  placeholder="Enter Username"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#00ED64] text-xs tracking-[0.2em] italic">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full bg-[#BEBFBF] border border-white/10 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base text-[#192A25] placeholder-[#192A25]/50 outline-none focus:border-[#00ED64] transition-colors"
                  placeholder="Enter Password"
                />
              </div>

              <button className="login-button w-full mt-8">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-col min-h-[100dvh] md:min-h-screen px-4 py-8 md:py-12">
        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col items-center justify-start pt-6 md:justify-center md:pt-0">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8 md:mb-16">
            <Image
              src="/Replay_Icon.svg"
              alt="Replay Logo"
              width={130}
              height={130}
              className="w-[130px] h-[130px] md:w-[200px] md:h-[200px] mb-4 md:mb-6"
            />
            <Image
              src="/Replay_Wordmark.svg"
              alt="Replay"
              width={200}
              height={30}
              className="w-[200px] md:w-[400px] mb-2 md:mb-4"
            />
          </div>

          {/* Progress Bar Section */}
          <div className="text-center mb-12 md:mb-16 w-full max-w-3xl">
            <p className="text-xs tracking-[0.2em] mb-2">CURRENT SITE STATUS:</p>
            <div className="progress-bar mx-auto mb-1"></div>
            <p className="text-right text-xs text-[#00FF7F]">35% COMPLETE</p>
          </div>

          {/* Description */}
          <div className="text-center max-w-2xl mb-8 md:mb-12">
            <p className="mb-6 md:mb-8 tracking-wide text-sm md:text-base">
              REPLAY IS A COMMUNITY DRIVEN MARKETPLACE WHERE YOU CAN BUY,
              SELL, AND TRADE WITH OTHER ENTHUSIASTS.
            </p>
            <p className="text-xs md:text-sm tracking-wide">
              STAY UP TO DATE ON THE LATEST NEWS
              <br />AND FEATURES FOR REPLAY.
            </p>
          </div>

          {/* Email Form */}
          <div className="flex flex-col items-center w-full max-w-md mb-8">
            <form onSubmit={handleEmailSubmit} className="flex gap-4 w-full">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#BEBFBF] border border-white/10 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base text-[#192A25] placeholder-[#192A25]/50 outline-none focus:border-[#00ED64] transition-colors"
                required
              />
              <button type="submit" className="login-button">
                SUBMIT
              </button>
            </form>
            {submitStatus.type && (
              <p className={`mt-2 text-sm ${
                submitStatus.type === "success" ? "text-[#00ED64]" : "text-red-500"
              }`}>
                {submitStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 text-center pb-4">
          <p className="text-xs text-[#00FF7F] tracking-[0.2em] italic">
            POWERED BY GAME X CHANGE
          </p>
        </div>
      </main>
    </div>
  );
}
