import { useClippy } from "@react95/clippy";
import { useEffect } from "react";
import HarlemShake from "../viruses/harlemShake";

function runVirus({ clippy, onFinished }) {
  setTimeout(() => clippy.play("LookUp"), 1000);
  setTimeout(() => clippy.speak("Oh no"), 2000);
  setTimeout(() => clippy.play("LookDownLeft"), 4000);
  setTimeout(() => clippy.speak("I'm getting out of here"), 10400);
  setTimeout(() => clippy.play("EmptyTrash"), 10500);
  setTimeout(() => clippy.hide(), 14400);
  setTimeout(() => clippy.show(), 35000);

  setTimeout(() => {
    clippy.speak(
      "But really. Did you think anything good was going to happen?"
    );
    onFinished();
  }, 50000);

  HarlemShake();
}

export default function VirusProgram({ onFinished }) {
  const { clippy } = useClippy();

  console.log("test");

  useEffect(() => {
    runVirus({ clippy, onFinished });
  }, []);

  return null;
}
