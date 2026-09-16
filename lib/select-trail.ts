/**
 * Lightweight bridge between the trail cards/sheet and the enquiry form.
 * Avoids a context provider for a single value.
 */
const EVENT = "lenzo:select-trail";

export function selectTrailAndScroll(slug: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: slug }));
  document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onTrailSelected(handler: (slug: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
