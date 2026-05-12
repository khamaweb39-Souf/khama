"use client";

import React from 'react';

export function CloudinaryImage({ 
  publicId, 
  width = 400, 
  height = 400,
  crop = 'fill',
  alt = "Product image",
  className = ""
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // بناء URL مُحسَّن باستخدام تحويلات Cloudinary
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/`
    + `c_${crop},w_${width},h_${height},`
    + `q_auto,f_auto/`
    + publicId;
  
  // Placeholderblur (نسخة صغيرة جداً ومشوشة للتحميل التدريجي)
  const blurUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`
    + `c_${crop},w_20,h_20,q_10,e_blur:1000/`
    + publicId;
  
  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{
        backgroundImage: `url(${blurUrl})`,
        backgroundSize: 'cover'
      }}
    >
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-opacity duration-500"
        onLoad={(e) => e.target.style.opacity = 1}
        style={{ opacity: 0 }}
      />
    </div>
  );
}
