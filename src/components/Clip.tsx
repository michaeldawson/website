import { useEffect } from "react";

export default function Clip() {
  const { clippy } = window as any;

  useEffect(() => {
    (window as any).clippy = clippy;
  }, [clippy]);
  useEffect(() => {
    if (clippy && typeof window !== "undefined") {
      clippy._el[0].addEventListener("click", clippy.animate);
    }
  }, [clippy]);

  return null;
}
