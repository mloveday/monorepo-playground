import {FormikErrors} from "formik";

export const formHasErrors = (errors: FormikErrors<any>) => Object.values(errors).filter(Boolean).length > 0;