/**
 * Quick Contact bottom-sheet — global open helper.
 *
 * The sheet itself is mounted once at the App layer and listens for a
 * `quickcontact:open` window event. Any trigger (sticky bar, mobile-nav
 * pill, FAB, future inline ghost buttons) calls `openQuickContact()` to
 * raise it.
 *
 * Why an event instead of context? Triggers live in different subtrees
 * (Navigation is outside Routes, StickyConsultBar lives below the Footer,
 * page-level FABs live deep in route trees). A plain CustomEvent avoids
 * threading a provider through every wrapper and keeps zero re-renders
 * for components that aren't actively driving the sheet.
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
