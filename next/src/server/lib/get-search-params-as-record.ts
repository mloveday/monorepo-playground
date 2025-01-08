export const getSearchParamsAsRecord = (
  usp: URLSearchParams,
): Record<string, string> => Object.fromEntries(usp.entries());
