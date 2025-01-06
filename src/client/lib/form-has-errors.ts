import {FormikErrors} from "formik";

import {isDefined} from "@/lib/equality-checks";

export const formHasErrors = <T>(errors: FormikErrors<T>) => Object.values(errors).filter(isDefined).length > 0;