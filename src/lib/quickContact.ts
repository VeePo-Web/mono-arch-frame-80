/**
 * Quick Contact bottom-sheet — global open helper.
 *
 * The sheet is mounted once at the App layer and listens for a window
 * `quickcontact:open` event. Any trigger (sticky bar pill on mobile,
 * mobile-nav consultation pill, page-level FAB) calls `openQuickContact()`
 * to raise it.
 *
 * A plain CustomEvent avoids threading a context provider through every
 * wrapper and keeps zero re-renders for components that aren't actively
 * driving the sheet.
 */

const EVENT_NAME = "quickcontact:open";

export interface QuickContactPayload {
  /** Lead source — recorded in Supabase so the team can attribute. */
  source?: string;
}

export function openQuickContact(payload: QuickContactPayload = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<QuickContactPayload>(EVENT_NAME, { detail: payload }));
}

export function subscribeQuickContact(handler: (payload: QuickContactPayload) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    const ce = e as CustomEvent<QuickContactPayload>;
    handler(ce.detail ?? {});
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
