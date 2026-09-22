interface DialogOptions {
  onClose?: () => void;
  fallbackFocusId?: string;
}

// Fixed positioning also locks touch scrolling. Preserve only the styles we own.
function lockPageScroll() {
  const root = document.documentElement;
  const body = document.body;
  const { scrollX, scrollY } = window;
  const properties = [
    // Keep the existing scrollbar track so viewport-sized and fixed elements stay put.
    [root, "overflow-y", root.scrollHeight > root.clientHeight ? "scroll" : "hidden"],
    [root, "scroll-behavior", "auto"],
    [body, "position", "fixed"],
    [body, "top", `${-scrollY}px`],
    [body, "left", `${-scrollX}px`],
    [body, "width", "100%"],
  ] as const;
  const previous = properties.map(([element, property]) => ({
    element,
    property,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  }));
  properties.forEach(([element, property, value]) => element.style.setProperty(property, value));

  return () => {
    previous.filter(({ property }) => property !== "scroll-behavior").forEach(({ element, property, value, priority }) => {
      if (value) element.style.setProperty(property, value, priority);
      else element.style.removeProperty(property);
    });
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    const scrollBehavior = previous.find(({ property }) => property === "scroll-behavior")!;
    if (scrollBehavior.value) root.style.setProperty("scroll-behavior", scrollBehavior.value, scrollBehavior.priority);
    else root.style.removeProperty("scroll-behavior");
  };
}


/** Native dialog behavior shared by Astro markup and React islands. */
export function createDialog(dialog: HTMLDialogElement, options: DialogOptions = {}) {
  const panel = dialog.querySelector<HTMLElement>("[data-dialog-panel]")!;
  const closeButton = dialog.querySelector<HTMLButtonElement>("[data-dialog-close]")!;
  const controller = new AbortController();
  const { signal } = controller;
  let opener: HTMLElement | null = null;
  let restoreScroll: (() => void) | undefined;
  let outsidePointer: number | null = null;
  let closeSequence = 0;

  const restore = () => {
    closeSequence++;
    outsidePointer = null;
    delete dialog.dataset.closing;
    if (!restoreScroll) return;
    restoreScroll();
    restoreScroll = undefined;
    const destination = opener?.isConnected && opener.getClientRects().length
      ? opener
      : options.fallbackFocusId ? document.getElementById(options.fallbackFocusId) : null;
    destination?.focus({ preventScroll: true });
    opener = null;
  };

  const finishClose = () => {
    if (!restoreScroll) return;
    if (dialog.open) dialog.close();
    restore();
    options.onClose?.();
  };

  const dismiss = async () => {
    if (!dialog.open || dialog.hasAttribute("data-closing")) return;
    outsidePointer = null;
    const sequence = ++closeSequence;
    // An early dismissal continues from the entrance's current appearance.
    const appearance = getComputedStyle(panel);
    panel.style.setProperty("--dialog-exit-transform", appearance.transform);
    panel.style.setProperty("--dialog-exit-opacity", appearance.opacity);
    dialog.dataset.closing = "";
    const animations = dialog.getAnimations({ subtree: true }).filter((animation) => {
      const target = (animation.effect as KeyframeEffect | null)?.target;
      return target === dialog || target === panel;
    });
    await Promise.allSettled(animations.map((animation) => animation.finished));
    if (sequence === closeSequence && dialog.open) finishClose();
  };

  const isOutside = (x: number, y: number) => {
    const bounds = panel.getBoundingClientRect();
    return x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom;
  };

  closeButton.addEventListener("click", () => { void dismiss(); }, { signal });
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); void dismiss(); }, { signal });
  dialog.addEventListener("close", () => { if (!dialog.open) finishClose(); }, { signal });
  dialog.addEventListener("pointerdown", (event) => {
    outsidePointer = event.isPrimary && event.button === 0 && isOutside(event.clientX, event.clientY)
      ? event.pointerId : null;
  }, { signal });
  dialog.addEventListener("pointerup", (event) => {
    const shouldDismiss = outsidePointer === event.pointerId && isOutside(event.clientX, event.clientY);
    outsidePointer = null;
    if (shouldDismiss) void dismiss();
  }, { signal });
  dialog.addEventListener("pointercancel", () => { outsidePointer = null; }, { signal });
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]'
    )).filter((element) => element.tabIndex >= 0 && element.checkVisibility());
    const first = controls[0];
    const last = controls[controls.length - 1];
    const destination = event.shiftKey && document.activeElement === first
      ? last : !event.shiftKey && document.activeElement === last ? first : null;
    if (destination) {
      event.preventDefault();
      destination.focus({ preventScroll: true });
    }
  }, { signal });

  return {
    open(trigger: HTMLElement | null) {
      if (dialog.open) return;
      opener = trigger;
      restoreScroll = lockPageScroll();
      dialog.querySelectorAll<HTMLElement>("[data-dialog-scroll]").forEach((element) => { element.scrollTop = 0; });
      try {
        dialog.showModal();
        closeButton.focus({ preventScroll: true });
      } catch (error) {
        restore();
        throw error;
      }
    },
    destroy() {
      controller.abort();
      if (dialog.open) dialog.close();
      restore();
    },
  };
}
