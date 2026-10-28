// Parent/teacher permissions, remembered on this device only.
export type ConsentKind = "ai-photo" | "voice";

const key = (kind: ConsentKind) => `ziva-literacy:consent:${kind}`;

export function hasConsent(kind: ConsentKind) {
  try {
    return localStorage.getItem(key(kind)) === "yes";
  } catch {
    return false;
  }
}

export function setConsent(kind: ConsentKind, yes: boolean) {
  try {
    if (yes) localStorage.setItem(key(kind), "yes");
    else localStorage.removeItem(key(kind));
  } catch {
    // storage blocked: ask again next time
  }
}
