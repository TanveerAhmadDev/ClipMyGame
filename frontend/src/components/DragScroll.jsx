import { useRef } from "react";

const DragScroll = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;

    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDown.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();

      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto overflow-y-hidden scrollbar-hide select-none
${isDown.current ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      {children}
    </div>
  );
};

export default DragScroll;
