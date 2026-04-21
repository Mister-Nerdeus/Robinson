const HEADER_SELECTOR = "[data-site-header='true']";

function getStickyHeaderOffset(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const rootStyles = window.getComputedStyle(document.documentElement);
  const cssOffset = Number.parseFloat(rootStyles.getPropertyValue("--sticky-header-offset")) || 0;
  return Math.max(headerHeight, cssOffset);
}

export function scrollElementIntoMeasuredView(
  target: HTMLElement | null | undefined,
  behavior: ScrollBehavior = "smooth",
) {
  if (!target || typeof window === "undefined") {
    return;
  }

  const offset = getStickyHeaderOffset();
  const top = Math.max(window.scrollY + target.getBoundingClientRect().top - offset - 12, 0);
  window.scrollTo({ top, behavior });
}

export function focusElement(
  target: HTMLElement | null | undefined,
  preventScroll = true,
) {
  target?.focus({ preventScroll });
}

export function scrollAndFocus(
  target: HTMLElement | null | undefined,
  options?: { behavior?: ScrollBehavior; delayMs?: number },
) {
  if (!target || typeof window === "undefined") {
    return;
  }

  scrollElementIntoMeasuredView(target, options?.behavior ?? "smooth");
  window.setTimeout(() => focusElement(target), options?.delayMs ?? 180);
}
