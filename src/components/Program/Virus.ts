import HarlemShake from "../../viruses/harlemShake";

export default function runVirus({ clippy, onFinished }) {
  setTimeout(() => clippy.play("LookUp"), 1000);
  setTimeout(() => clippy.speak("Oh no"), 2000);
  setTimeout(() => clippy.play("LookDownLeft"), 4000);
  setTimeout(() => clippy.speak("I'm getting out of here"), 10400);
  setTimeout(() => clippy.play("EmptyTrash"), 10500);
  setTimeout(() => clippy.hide(), 14000);

  if ((window as any).isVirusing) return;
  (window as any).isVirusing = true;

  setTimeout(() => ((window as any).isVirusing = false), 50000);

  HarlemShake();
}
