import { useRef } from "react";

export const useChatScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const chatScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };


  return { scrollContainerRef, chatScroll };
};
