"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SkeletonImageProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
  showText?: boolean;
}

export function SkeletonImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  showText = false,
  fill,
  width,
  height,
  ...props
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-zinc-950 ${containerClassName} ${
        fill ? "w-full h-full" : ""
      }`}
    >
      {/* Skeleton Pulse Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-zinc-900 border border-zinc-800 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-1.5 opacity-60">
            <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
            {showText && (
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase select-none">
                LOADING
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
