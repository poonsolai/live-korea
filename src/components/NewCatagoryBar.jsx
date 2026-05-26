import { useState, useRef, useEffect } from "react";

// catagory component for filtering - horizontal scroll with buttons
function NewCategoryBar({ val, setCategory, active }) {
  // state variables
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();

    const el = scrollRef.current;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;

    const amount = 200;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="category-wrapper mx-2">
      {showLeft && (
        <button className="scroll-btn left-btn" onClick={() => scroll("left")}>
          ❮
        </button>
      )}

      <div className="category-scroll" ref={scrollRef}>
        {val.map((item, index) => (
          <button
            // className="category-btn"
            className={`tab-btn ${active === item ? "active-tab" : ""}`}
            key={index}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {showRight && (
        <button
          className="scroll-btn  right-btn "
          onClick={() => scroll("right")}
        >
          ❯
        </button>
      )}
    </div>
  );
}

export default NewCategoryBar