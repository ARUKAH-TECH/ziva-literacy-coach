"use client";

import { useEffect, useState } from "react";

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

/** True once the service worker has saved the app for offline use. */
export function useOfflineReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "offline-status") setReady(Boolean(e.data.ready));
    };
    navigator.serviceWorker.addEventListener("message", onMessage);
    const ask = () => navigator.serviceWorker.controller?.postMessage("offline-status");
    navigator.serviceWorker.ready.then(ask).catch(() => {});
    navigator.serviceWorker.addEventListener("controllerchange", ask);
    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", ask);
    };
  }, []);
  return ready;
}
