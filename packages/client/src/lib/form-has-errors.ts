import { isDefined } from "@repo/lib/equality-checks.ts";
import type { FormikErrors } from "formik";

export const formHasErrors = <T>(errors: FormikErrors<T>) =>
  Object.values(errors).filter(isDefined).length > 0;
