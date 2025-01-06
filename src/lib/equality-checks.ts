// type guard, useful for filtering arrays and other type narrowing checks
export const isDefined = <T>(v: T | undefined | null): v is T => v !== undefined && v!== null;
