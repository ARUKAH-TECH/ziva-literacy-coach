"use client";

// Camera and microphone helpers, so the app also works on a computer with a
// webcam or an external microphone (USB, headset or Bluetooth).

/** A computer (no touch screen phone/tablet). */
export function isComputer() {
  if (typeof navigator === "undefined") return false;
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) return false;
  return !(/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
}

export type DeviceProblem = "none" | "blocked" | "busy" | "unsupported";

export function problemOf(error: unknown): DeviceProblem {
  const name = error instanceof DOMException || error instanceof Error ? error.name : "";
  if (name === "NotFoundError" || name === "OverconstrainedError" || name === "DevicesNotFoundError") return "none";
  if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") return "blocked";
  if (name === "NotReadableError" || name === "TrackStartError" || name === "AbortError") return "busy";
  return "unsupported";
}

/** Cameras or microphones the browser can see (names appear once allowed). */
export async function listDevices(kind: "videoinput" | "audioinput"): Promise<MediaDeviceInfo[]> {
  try {
    return (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === kind);
  } catch {
    return [];
  }
}

/** Opens the microphone for a moment to check it is there and allowed. */
export async function checkMicrophone(): Promise<"ok" | DeviceProblem> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return "ok"; // let the speech service decide
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true });
    s.getTracks().forEach((t) => t.stop());
    return "ok";
  } catch (error) {
    return problemOf(error);
  }
}

export function cameraMessage(problem: DeviceProblem) {
  const computer = isComputer();
  if (problem === "none")
    return computer
      ? "No camera found. Plug in a webcam (or turn on the computer's camera), then try again."
      : "No camera found on this device.";
  if (problem === "blocked")
    return computer
      ? "The camera is blocked. Click the 🔒 (or ⓘ) at the left of the web address → Camera → Allow, then try again."
      : "The camera is blocked. In Chrome tap ⋮ → Settings → Site settings → Camera and allow this app.";
  if (problem === "busy") return "The camera is being used by another app (Zoom, WhatsApp…). Close it, then try again.";
  return "This browser can't use the camera. Open the app in Google Chrome or Microsoft Edge.";
}

export function micMessage(problem: DeviceProblem) {
  const computer = isComputer();
  if (problem === "none")
    return computer
      ? "No microphone found. Plug in a microphone or headset, then try again."
      : "No microphone found on this device.";
  if (problem === "blocked")
    return computer
      ? "The microphone is blocked. Click the 🔒 (or ⓘ) at the left of the web address → Microphone → Allow, then try again."
      : "The microphone is blocked. In Chrome tap ⋮ → Settings → Site settings → Microphone, and allow learn.zivarukah.com.";
  if (problem === "busy") return "The microphone is being used by another app (Zoom, WhatsApp…). Close it, then try again.";
  return "This browser can't use the microphone. Open the app in Google Chrome or Microsoft Edge.";
}
