import {FormikErrors} from "formik";

export const formHasErrors = <T>(errors: FormikErrors<T>) => Object.values(errors).filter(Boolean).length > 0;