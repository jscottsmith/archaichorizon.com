import { ROUTES } from "@/app/constants/routes";

const CONTENT_ROUTES = [
  ROUTES.COLLECTION,
  ROUTES.CONTACT,
  ROUTES.ABOUT,
] as const;

export function isContentRoute(pathname: string): boolean {
  if (pathname === ROUTES.HOME) {
    return false;
  }

  if (pathname.startsWith("/release/")) {
    return true;
  }

  return CONTENT_ROUTES.some((route) => pathname === route);
}

export function showContentPanel(
  pathname: string,
  isPlaylistPanelOpen: boolean
): boolean {
  return isContentRoute(pathname) || isPlaylistPanelOpen;
}
