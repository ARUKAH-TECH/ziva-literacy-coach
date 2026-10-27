"use client";

import { AppShell } from "@/components/AppShell";
import { InstallCard } from "@/components/InstallCard";
import { useOfflineReady } from "@/components/useOnline";

export default function InstallPage() {
  const offlineReady = useOfflineReady();
  return (
    <AppShell title="Install the app">
      <InstallCard />
      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-lg font-bold">Offline learning</p>
        <p className="mt-1 text-black/70">
          {offlineReady
            ? "✅ This device has saved the lessons. They will open even without internet."
            : "⏳ Saving lessons for offline use… keep this page open for a moment while you have internet."}
        </p>
        <p className="mt-3 text-sm text-black/60">
          Read-aloud uses your phone’s own voice. On some phones it needs the internet the first time.
        </p>
      </div>
    </AppShell>
  );
}
