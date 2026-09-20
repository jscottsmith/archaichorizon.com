import { cn } from "@/lib/utils";

/** Desktop panel header height (py-3 + size-8 controls). */
const PANEL_HEADER_HEIGHT_CLASS = "h-14";

/**
 * Overlay header above a faded scroll body so content can pass underneath
 * without the header itself being masked by the scroll fade.
 *
 * Mask sits on a viewport-sized overflow-hidden wrapper; the inner element
 * scrolls so edge fades stay pinned to the visible area.
 */
export function PanelChrome(props: {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 flex-1 flex-col",
        props.className
      )}
    >
      <div className="panel-scroll-fade min-h-0 flex-1 overflow-hidden">
        <div
          className={cn(
            "h-full overflow-y-auto overscroll-contain pb-[calc(var(--spacing-shell-inset)+8rem)]",
            props.bodyClassName
          )}
        >
          {props.header ? (
            <div
              className={cn(
                PANEL_HEADER_HEIGHT_CLASS,
                "shrink-0 max-md:hidden"
              )}
              aria-hidden
            />
          ) : null}
          {props.children}
        </div>
      </div>
      {props.header ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 max-md:hidden">
          <div className="pointer-events-auto">{props.header}</div>
        </div>
      ) : null}
    </div>
  );
}
