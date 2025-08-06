"use client";
import { slideData, slideData2, slides, gameSlides, gameSlideData, gameSlideData2 } from "@/data/elements";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useState, useMemo } from "react";

// Utility function to get game title, similar to Hydra's getGameTitle
function getGameTitle(game) {
  // Prioritize title over label for display
  const title = game.title || game.label || "Unknown Game";
  
  // Truncate long titles to prevent layout issues
  const maxLength = 20; // Adjust based on your design needs
  if (title.length > maxLength) {
    return title.substring(0, maxLength - 3) + "...";
  }
  
  return title;
}

// Game Icon Component - Steam header images only
function GameIcon({ game, className = "" }) {
  const [iconError, setIconError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate Steam header image URL via our proxy to avoid CORS
  const iconUrl = useMemo(() => {
    if (game.shop === 'steam' && game.objectId) {
      return `/api/steam-image?appId=${game.objectId}`;
    }
    return null;
  }, [game.shop, game.objectId]);

  console.log(`Game: ${game.title}, Steam Proxy URL: ${iconUrl}`);

  const handleIconError = (e) => {
    console.error(`Steam header image failed to load for ${game.title}:`, {
      url: iconUrl,
      error: e?.target?.error || 'Unknown error',
      src: e?.target?.src || 'Unknown src',
      status: e?.target?.status || 'No status'
    });
    setIconError(true);
    setIsLoading(false);
  };

  const handleIconLoad = (e) => {
    console.log(`Steam header image loaded successfully for ${game.title}:`, {
      url: iconUrl,
      naturalWidth: e?.target?.naturalWidth || 0,
      naturalHeight: e?.target?.naturalHeight || 0,
      src: e?.target?.src || 'Unknown src'
    });
    setIconError(false);
    setIsLoading(false);
  };

  const handleImageStart = () => {
    setIsLoading(true);
    setIconError(false);
  };

  // Render Steam header image or show error state
  if (iconUrl && !iconError) {
    return (
      <img
        className={`${className} rounded object-cover transition-opacity duration-200`}
        src={iconUrl}
        width={48}
        height={48}
        style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
        alt={game.title || 'Steam Game'}
        onError={handleIconError}
        onLoad={handleIconLoad}
        onLoadStart={handleImageStart}
        loading="lazy"
      />
    );
  }

  // Error state - show game title as text
  return (
    <div 
      className={`${className} bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold`}
      style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
    >
      {game.title ? game.title.substring(0, 3).toUpperCase() : '???'}
    </div>
  );
}

export default function Elements() {
  return (
    <div
      id="builder_elements"
      className="builder-elements section panel  scrollSpysection"
    >
      <div className="section-outer panel pb-6 lg:pb-8 xl:pb-10">
        <div className="container xl:max-w-xl">
          <div
            className="section-inner panel vstack items-center gap-3 xl:gap-4 text-center max-w-100"
            data-anime="onview: -100; targets: >*; translateY: [-40, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(200);"
          >
            <h4 className="h4 m-0">Over 60k+ Library Games</h4>
            <div className="panel w-100">
              <Swiper
                className="swiper mask-x"
                slidesPerView={2.5}
                spaceBetween={16}
                centeredSlides={true}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                  reverseDirection: true,
                }}
                speed={7000}
                allowTouchMove={false}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
              >
                {gameSlides.map((game, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="cstack gap-1 md:gap-2 p-1 md:p-2 border rounded-pill">
                      <GameIcon
                        game={game}
                        className="icon icon-1 md:icon-2 lg:icon-3"
                      />
                      <span className="fs-7 md:fs-6 lg:fs-5 fw-medium text-center max-w-[120px] truncate" title={game.title || game.label}>
                        {getGameTitle(game)}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                style={{ transform: "rotate(180deg) !importent" }}
                className="swiper mask-x my-2 md:my-3"
                slidesPerView={2.5}
                slidesPerGroup={1}
                spaceBetween={16}
                modules={[Autoplay]}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                }}
                speed={7000}
                allowTouchMove={false}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
              >
                {gameSlideData.map((game, index) => (
                  <SwiperSlide key={index}>
                    <div className="cstack gap-1 md:gap-2 p-1 md:p-2 border rounded-pill">
                      <GameIcon
                        game={game}
                        className="icon icon-1 md:icon-2 lg:icon-3"
                      />
                      <span className="fs-7 md:fs-6 lg:fs-5 fw-medium text-center max-w-[120px] truncate" title={game.title || game.label}>
                        {getGameTitle(game)}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                className="swiper mask-x"
                slidesPerView={2.5}
                spaceBetween={16}
                centeredSlides={true}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                  reverseDirection: true,
                }}
                speed={7000}
                allowTouchMove={false}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
              >
                {gameSlideData2.map((game, index) => (
                  <SwiperSlide key={index}>
                    <div className="cstack gap-1 md:gap-2 p-1 md:p-2 border rounded-pill">
                      <GameIcon
                        game={game}
                        className="icon icon-1 md:icon-2 lg:icon-3"
                      />
                      <span className="fs-7 md:fs-6 lg:fs-5 fw-medium text-center max-w-[120px] truncate" title={game.title || game.label}>
                        {getGameTitle(game)}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <a
              href="#"
              className="btn btn-sm lg:btn-md btn-primary px-3 md:mt-2 lg:mt-4"
            >
              <span>View all games</span>
              <i className="icon icon-narrow unicon-arrow-right fw-bold rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
