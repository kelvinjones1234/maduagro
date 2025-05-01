import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialSlider() {
  const sliderRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [canSlideNext, setCanSlideNext] = useState(true);

  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat sequi sunt culpa laborum aliquam ducimus quasi. Magni, possimus nulla?",
      author: "John Audu",
      role: "Farmer",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat sequi sunt culpa laborum aliquam ducimus quasi. Magni, possimus nulla?",
      author: "Praise Godwin",
      role: "Seller",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat sequi sunt culpa laborum aliquam ducimus quasi. Magni, possimus nulla?",
      author: "Mike Adenuga",
      role: "Wholesaller",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat sequi sunt culpa laborum aliquam ducimus quasi. Magni, possimus nulla?",
      author: "Sarah Ogu",
      role: "Buyer",
    },
  ];

  // Calculate visible cards and card width
  useEffect(() => {
    const updateSlider = () => {
      if (!sliderRef.current) return;

      const containerWidth = sliderRef.current.offsetWidth;
      const minCardWidth = 320; // Minimum card width in pixels
      const newVisibleCards = Math.floor(containerWidth / minCardWidth) || 1;
      const newCardWidth = containerWidth / newVisibleCards;

      setVisibleCards(newVisibleCards);
      setCardWidth(newCardWidth);

      // Check if we can slide next after resize
      const maxIndex =
        testimonials.length - Math.floor(containerWidth / newCardWidth);
      setCanSlideNext(currentIndex < maxIndex);
    };

    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [currentIndex, testimonials.length]);

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    if (!canSlideNext) return;

    setCurrentIndex((prev) => {
      const containerWidth = sliderRef.current.offsetWidth;
      const maxIndex =
        testimonials.length - Math.floor(containerWidth / cardWidth);
      const newIndex = Math.min(prev + 1, maxIndex);

      // Update canSlideNext based on new index
      setCanSlideNext(newIndex < maxIndex);
      return newIndex;
    });
  };

  // Update canSlideNext when currentIndex changes
  useEffect(() => {
    if (!sliderRef.current) return;

    const containerWidth = sliderRef.current.offsetWidth;
    const maxIndex =
      testimonials.length - Math.floor(containerWidth / cardWidth);
    setCanSlideNext(currentIndex < maxIndex);
  }, [currentIndex, cardWidth, testimonials.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 top-[6rem]">
      <div className="relative overflow-hidden" ref={sliderRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`,
            width: `${testimonials.length * cardWidth}px`,
          }}
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 py-[2rem]"
              style={{ width: `${cardWidth}px` }}
            >
              <div className="h-[24rem] rounded-[38px] shadow-sm flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-4xl text-gray-200 font-serif">
                  “
                </div>
                <p className="text-gray-600 text-base text-center mb-6 z-10">
                  {item.text}
                </p>
                <div className="text-center">
                  <p className="font-semibold text-gray-800">{item.author}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
                <div className="absolute bottom-6 right-6 text-4xl text-gray-200 font-serif">
                  ”
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > visibleCards && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            onClick={next}
            disabled={!canSlideNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {testimonials.length > visibleCards && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({
            length: Math.ceil(testimonials.length - visibleCards + 1),
          }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                const containerWidth = sliderRef.current.offsetWidth;
                const maxIndex =
                  testimonials.length - Math.floor(containerWidth / cardWidth);
                setCanSlideNext(index < maxIndex);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
