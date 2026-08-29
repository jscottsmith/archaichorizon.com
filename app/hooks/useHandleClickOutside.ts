import { useEffect, useRef } from "react";

interface UseHandleClickOutsideProps {
  enabled: boolean;
  onOutsideClick: () => void;
  excludeSelector?: string;
}

export function useHandleClickOutside({
  enabled,
  onOutsideClick,
  excludeSelector,
}: UseHandleClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        excludeSelector &&
        target instanceof Element &&
        target.closest(excludeSelector)
      ) {
        return;
      }

      if (enabled && ref.current && !ref.current.contains(target)) {
        onOutsideClick();
      }
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled, onOutsideClick, excludeSelector]);

  return ref;
}
