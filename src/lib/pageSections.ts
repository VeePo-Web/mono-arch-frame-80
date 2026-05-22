/**
 * Routes where the nav should be transparent at the very top of the page.
 * Excludes form-centric routes where a clear bar reads as more trustworthy.
 */
export const routeHasTransparentTop = (pathname: string): boolean => {
  if (pathname === "/contact" || pathname === "/thank-you") return false;
  return true;
};
