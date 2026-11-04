"use client";

import { useEffect, useRef, useState } from "react";
import { primaryButton, secondaryButton } from "@/components/ui";
import { cameraMessage, listDevices, problemOf } from "@/lib/devices";

/**
 * Take a photo with the computer's webcam (phones use their own camera app
 * instead). If several cameras are plugged in, the learner can choose one.
 * The photo stays on this computer.
 */
export function WebcamCapture({ onCapture, onClose }: { onCapture: (file: File) => void; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      setReady(false);
      setError(null);
      stream.current?.getTracks().forEach((t) => t.stop());
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: deviceId ? { deviceId: { exact: deviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } } : { width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelled) return s.getTracks().forEach((t) => t.stop());
        stream.current = s;
        if (video.current) {
          video.current.srcObject = s;
          await video.current.play().catch(() => {});
        }
        setCameras(await listDevices("videoinput"));
        setReady(true);
      } catch (e) {
        if (!cancelled) setError(cameraMessage(problemOf(e)));
      }
    }
    void start();
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((t) => t.stop());
    };
  }, [deviceId]);

  function snap() {
    const v = video.current;
    if (!v || !v.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext("2d")?.drawImage(v, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        stream.current?.getTracks().forEach((t) => t.stop());
        onCapture(new File([blob], "handwriting.jpg", { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.9,
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3" onClick={onClose}>
      <div role="dialog" aria-label="Take a photo" onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold">📸 Take a photo</p>
          <button type="button" onClick={onClose} aria-label="Close" className="h-10 w-10 rounded-full bg-black/5 text-xl">
            ✕
          </button>
        </div>
        {error ? (
          <p role="alert" className="mt-4 rounded-2xl bg-amber-100 p-4 font-semibold text-amber-950">
            {error}
          </p>
        ) : (
          <>
            <p className="mt-1 text-sm text-black/60">Hold the paper flat in front of the camera, in good light, so the writing fills the picture.</p>
            <video ref={video} playsInline muted className="mt-3 aspect-video w-full rounded-2xl bg-black object-contain" />
          </>
        )}
        {cameras.length > 1 && (
          <label className="mt-3 block text-sm font-semibold">
            Camera
            <select value={deviceId} onChange={(e) => setDeviceId(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-black/15 px-3 py-2 font-normal">
              <option value="">Default camera</option>
              {cameras.map((c, i) => (
                <option key={c.deviceId || i} value={c.deviceId}>
                  {c.label || `Camera ${i + 1}`}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={snap} disabled={!ready} className={`${primaryButton} disabled:opacity-40`}>
            📸 Take photo
          </button>
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
