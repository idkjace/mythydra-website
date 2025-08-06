"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedList } from "@/components/magicui/animated-list";
import { getRandomNotifications } from "@/data/steamGames";
import SteamNotification from "@/components/common/SteamNotification";

export default function Hero() {
  const [notifications, setNotifications] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Array of videos for slideshow
  const videos = [
    "/assets/videos/update-game-new.mp4",
    "/assets/videos/dlc-unlocker-new.mp4",
    "/assets/videos/catalogue-search.mp4"
  ];

  useEffect(() => {
    // Get random notifications and refresh every 10 seconds
    const updateNotifications = () => {
      setNotifications(getRandomNotifications(4));
    };

    updateNotifications();
  }, []);

  useEffect(() => {
    // Auto-rotate videos every 8 seconds
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % videos.length
      );
    }, 8000);

    return () => clearInterval(videoInterval);
  }, [videos.length]);
  return (
    <div
      id="overview"
      className="overview section panel overflow-hidden uc-dark lg:m-2 lg:rounded-3 scrollSpysection"
    >
      <div className="position-cover bg-white dark:bg-gray-900" />
      <div
        className="position-cover opacity-70 bg-contain"
        style={{ backgroundPosition: "50% 85%" }}
        data-src="/assets/images/template/pricing-06-bg-masked.png"
        data-uc-img=""
      />
      <div className="position-cover bg-gradient-to-t from-gray-800 via-transparent to-gray-900" />
      <div
        className="position-absolute d-inline-block w-500px h-500px rounded-circle bg-gradient-45 from-primary to-white start-50 blur-10 translate-middle blend-color-dodge"
        style={{ top: "0%" }}
      />
      <div
        className="position-absolute d-inline-block w-250px h-250px rounded-circle bg-gradient-45 from-primary to-white start-0 blur-10 translate-middle blend-color-dodge"
        style={{ top: "0%" }}
      />
      <div
        className="position-absolute d-inline-block w-250px h-250px rounded-circle bg-gradient-45 from-primary to-white start-100 blur-10 translate-middle blend-color-dodge"
        style={{ top: "0%" }}
      />
      <div className="section-outer panel pt-9 xl:pt-10">
        <div className="container xl:max-w-xl">
          <div className="section-inner panel pt-0 lg:pt-4 xl:pt-0">
            <div className="row child-cols-12 justify-center items-center g-6 xl:g-8">
              <div>
                <div
                  className="panel vstack justify-center items-center gap-3 max-w-600px lg:max-w-750px mx-auto px-2 lg:px-0 text-center"
                  data-anime="targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
                >
                  <div className="cstack gap-1 py-1 px-2 border rounded-pill">
                    <span className="d-inline-block w-4px h-4px rounded-circle bg-primary-400" />
                    <span className="fs-8 fw-bold text-uppercase text-white">
                      1.0 Available Now
                    </span>
                  </div>
                  <h1 className="h1 sm:display-6 md:display-5 lg:display-4 xl:display-3 m-0 text-white">
                    Mythydra Tools
                    <span className="d-inline-flex px-1 bg-secondary text-primary -rotate-1 lg:-rotate-2 rounded-1 lg:rounded-1-5">
                      buy now
                    </span>
                    <br />
                    now or never!
                  </h1>
                  <p className="fs-5 xl:fs-4 text-black dark:text-white d-none md:d-block">
                    A Tool that does everything for you, All in one.
                  </p>
                  <Link
                    href={`/page-pricing`}
                    className="btn btn-md lg:btn-lg btn-primary min-w-150px mt-2"
                  >
                    <span>Buy Mythydra</span>
                    <i className="icon icon-narrow unicon-arrow-right fw-bold ltr:ms-narrow rtl:rotate-180 rtl:me-narrow" />
                  </Link>
                  <p className="fs-7 text-black dark:text-white">
                    1 day free trial.
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="panel"
                  data-anime="targets: >*:not(.dashboard-image); scale: [0.5, 1]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
                >
                  <div
                    className="dashboard-image max-w-lg mx-auto max-h-250px lg:max-h-550px overflow-hidden"
                    data-anime="translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
                  >
                    <video
                      key={currentVideoIndex}
                      className="shadow-md lg:shadow-lg w-full h-full object-cover transition-opacity duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      style={{ pointerEvents: 'none', borderRadius: '10px' }}
                    >
                      <source src={videos[currentVideoIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {videos.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentVideoIndex 
                              ? 'bg-white shadow-lg' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="position-absolute top-50 end-0 translate-middle-y mt-2 lg:me-5">
                    <AnimatedList className="max-w-sm">
                      {notifications.map((notification) => (
                        <SteamNotification key={notification.id} notification={notification} />
                      ))}
                    </AnimatedList>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
