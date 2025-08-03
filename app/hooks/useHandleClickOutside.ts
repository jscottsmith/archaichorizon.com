import { useEffect, useRef } from "react";

interface UseHandleClickOutsideProps {
  enabled: boolean;
  onOutsideClick: () => void;
}

export function useHandleClickOutside({
  enabled,
  onOutsideClick,
}: UseHandleClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        enabled &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled, onOutsideClick]);

  return ref;
}
