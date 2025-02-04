// export async function sendAnalyticsEvent(eventName: string) {
//   try {
//     console.log("calling here");
//     const response = await fetch("https://analytics-engine-nine.vercel.app/api/collect", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         event: eventName,
//         timestamp: new Date().toISOString(),
//         user_id: getUserId(),
//         metadata: { source: "CodePill", device: getDeviceType() },
//       }),
//     });
//     console.log("calling here response", JSON.stringify(response, null, 2));
//     if (!response.ok) {
//       console.error("Failed to send analytics event:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error sending analytics event:", error);
//   }
// }

// function getUserId() {
//   if (typeof window !== "undefined") {
//     let userId = localStorage.getItem("analyticsUserId");
//     if (!userId) {
//       userId = `guest_${Math.random().toString(36).substring(2, 15)}`;
//       localStorage.setItem("analyticsUserId", userId);
//     }
//     return userId;
//   }
//   return "unknown_user";
// }

// function getDeviceType() {
//   if (typeof window !== "undefined") {
//     const userAgent = navigator.userAgent.toLowerCase();
//     return /mobile|android|iphone|ipad/.test(userAgent) ? "mobile" : "desktop";
//   }
//   return "unknown";
// }

export async function sendAnalyticsEvent(eventName: string) {
  try {
    // Prevent multiple calls within the same session
    if (typeof window !== "undefined") {
      const hasSentEvent = sessionStorage.getItem("analyticsEventSent");
      if (hasSentEvent) {
        console.log("Analytics event already sent in this session. Skipping...");
        return;
      }
      sessionStorage.setItem("analyticsEventSent", "true");
    }

    console.log("Sending analytics event...");

    const locale = typeof navigator !== "undefined" ? navigator.language : "unknown";
    const country = inferCountryFromLocale(locale);
    const userId = getUserId(locale, country);

    const response = await fetch("https://analytics-engine-nine.vercel.app/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        timestamp: new Date().toISOString(),
        user_id: userId,
        metadata: {
          source: "CodePill",
          device: getDeviceType(),
          path: typeof window !== "undefined" ? window.location.pathname : "unknown", // Capture relative path
          locale,
          country, // Attach inferred country
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error response body
      console.error("Failed to send analytics event:", response.status, errorText);
      return;
    }

    const responseData = await response.json();
    console.log("Analytics event sent successfully:", responseData);
  } catch (error) {
    console.error("Error sending analytics event:", error);
  }
}

function getUserId(locale: string, country: string) {
  if (typeof window !== "undefined") {
    let userId = localStorage.getItem("analyticsUserId");
    if (!userId) {
      userId = `guest_${Math.random().toString(36).substring(2, 15)}_${country}_${locale}`;
      localStorage.setItem("analyticsUserId", userId);
    }
    return userId;
  }
  return `unknown_user_${country}_${locale}`;
}

function getDeviceType() {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad/.test(userAgent) ? "mobile" : "desktop";
  }
  return "unknown";
}

// Infer country from locale (e.g., "en-US" → "US")
function inferCountryFromLocale(locale: string): string {
  if (!locale.includes("-")) return "unknown";
  return locale.split("-")[1].toUpperCase(); // Extract country code
}

