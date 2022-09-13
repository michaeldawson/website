import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";

export default function MyCountup() {
  const [started, setStarted] = useState(false);
  const countUpRef = React.useRef(null);
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null);

  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 1000000,
    separator: ",",
    duration: 2,
  });

  useEffect(() => {
    if (!countUpRef.current) return;
    const parent = countUpRef.current?.closest(".frame");

    setParent(parent as HTMLDivElement);
  }, [countUpRef]);

  useEffect(() => {
    if (!parent) return;
    parent.addEventListener("scroll", scrollHandler);

    return () => parent.removeEventListener("scroll", scrollHandler);
  }, [parent]);

  const scrollHandler = () => {
    if (!countUpRef.current || !parent) return;

    if (
      parent.scrollTop + parent.offsetHeight >=
      countUpRef.current.offsetTop
    ) {
      setStarted(true);
    }
  };

  useEffect(() => {
    if (started) {
      start();
    }
  }, [started]);

  return (
    <div style={{ margin: 20 }}>
      <div style={{ fontSize: 70, padding: 40 }} ref={countUpRef} />
    </div>
  );
}
