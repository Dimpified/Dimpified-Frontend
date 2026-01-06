// analytics/mixpanel.ts
import mixpanel from "mixpanel-browser";

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  debug: import.meta.env.DEV,
  persistence: "localStorage",
  track_pageview: false,
});

// First-touch attribution (once)
const url = new URL(window.location.href);
mixpanel.register_once({
  utm_source: url.searchParams.get("utm_source") || undefined,
  utm_medium: url.searchParams.get("utm_medium") || undefined,
  utm_campaign: url.searchParams.get("utm_campaign") || undefined,
  referrer: document.referrer || undefined,
});

export default mixpanel;
