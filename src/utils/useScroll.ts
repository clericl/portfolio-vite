import { RefCallback, useCallback, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { PLATFORM_TITLES } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

const TIMEOUT = 250;

function useScroll() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlePrev = useCallback(() => {
    const pathIndex = PLATFORM_TITLES.findIndex((title) => title === pathname);
    if (pathIndex > 0) {
      navigate(PLATFORM_TITLES[pathIndex - 1]);
    }
  }, [navigate, pathname]);

  const handleNext = useCallback(() => {
    const pathIndex = PLATFORM_TITLES.findIndex((title) => title === pathname);
    if (pathIndex < PLATFORM_TITLES.length - 1) {
      navigate(PLATFORM_TITLES[pathIndex + 1]);
    }
  }, [navigate, pathname]);

  const timerRef = useRef<number | undefined>();

  const { ref } = useSwipeable({
    onSwipedDown: handlePrev,
    onSwipedUp: handleNext,
  }) as { ref: RefCallback<Document> };

  useEffect(() => {
    ref(document);

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 100) {
        if (!timerRef.current) {
          if (e.deltaY > 0) {
            handleNext();
          } else if (e.deltaY < 0) {
            handlePrev();
          }
        }
        clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          timerRef.current = undefined;
        }, TIMEOUT);
      }
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [handleNext, handlePrev, ref, timerRef]);
}

export default useScroll;
