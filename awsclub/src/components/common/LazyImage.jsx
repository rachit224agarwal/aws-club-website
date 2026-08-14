import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  imgClassName = "",
  style, 
  priority = false, 
  onLoad,
  onError,
  ...props 
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '250px',
    threshold: 0.01,
    skip: priority,
  });

  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} ${imgClassName}`.trim()}
        style={style}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      
      {error && (
        <div className="absolute inset-0 bg-white/10 flex items-center justify-center text-white/30 text-xs text-center p-2">
          Failed to load
        </div>
      )}

      {inView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-500 ${imgClassName} ${loaded ? (imgClassName.includes('opacity-') ? '' : 'opacity-100') : 'opacity-0'}`.trim()}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
}
