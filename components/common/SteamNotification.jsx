"use client";
import React, { useState } from 'react';

const SteamNotification = ({ notification }) => {
  const [iconError, setIconError] = useState(false);

  const handleIconError = () => {
    setIconError(true);
  };

  return (
    <div className={`flex items-center gap-3 bg-gradient-to-r bg-transparent backdrop-blur-sm rounded-lg p-3 shadow-xl border ${notification.borderColor}`}>
      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-700">
        {notification.iconUrl && !iconError ? (
          <img
            className="w-full h-full object-cover"
            src={notification.iconUrl}
            alt={notification.name}
            loading="lazy"
            onError={handleIconError}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${notification.iconBg} flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">{notification.type}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{notification.name}</p>
        <p className={`text-xs ${notification.textColor}`}>{notification.status}</p>
      </div>
    </div>
  );
};

export default SteamNotification;
