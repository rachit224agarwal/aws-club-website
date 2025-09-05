import { useState, useEffect, useRef } from "react";

export default function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const increment = target / (duration / 16); // 60fps approx
          const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 } // triggers when 50% of component is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <h3 ref={ref} className="text-4xl font-bold text-[#FF9900]">{count}+</h3>;
}
