export async function sendAnalyticsEvent(eventName: string) {
  try {
    const response = await fetch("https://analytics-engine-nine.vercel.app/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        timestamp: new Date().toISOString(),
        user_id: getUserId(),
        metadata: { source: "CodePill", device: getDeviceType() },
      }),
    });

    if (!response.ok) {
      console.error("Failed to send analytics event:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending analytics event:", error);
  }
}

function getUserId() {
  if (typeof window !== "undefined") {
    let userId = localStorage.getItem("analyticsUserId");
    if (!userId) {
      userId = `guest_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("analyticsUserId", userId);
    }
    return userId;
  }
  return "unknown_user";
}

function getDeviceType() {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad/.test(userAgent) ? "mobile" : "desktop";
  }
  return "unknown";
}
