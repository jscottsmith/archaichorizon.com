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

export function showRightPanel(
  pathname: string,
  isPlaylistVisible: boolean
): boolean {
  return isContentRoute(pathname) || isPlaylistVisible;
}

export function getPanelTitle(
  pathname: string,
  isPlaylistVisible: boolean
): string {
  if (isPlaylistVisible) {
    return "Playlist";
  }

  if (pathname === ROUTES.COLLECTION) {
    return "Collection";
  }

  if (pathname === ROUTES.CONTACT) {
    return "Contact";
  }

  if (pathname === ROUTES.ABOUT) {
    return "About";
  }

  if (pathname.startsWith("/release/")) {
    return "Release";
  }

  return "Content";
}
