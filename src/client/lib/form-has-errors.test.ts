import { FormikErrors } from "formik";
import {describe, expect, it} from "vitest";

import {formHasErrors} from "@/client/lib/form-has-errors";

describe('form-has-errors', () => {
  const trueCases: [string, FormikErrors<unknown>][] = [
    ["one string error", {field: "some error"}],
    ["multiple strings of errors", {field: "some error", other: "another error"}],
    ["a string array of errors", {field: ["some error", "another error"]}],
    ["a nested errors object", {field: {field: "and error"}}],
    ["a nested errors object array", {field: [{field: "and error"}]}],
  ];

  it.each(trueCases)('should return true when there is %s', (_, errors) => {
    expect(formHasErrors(errors)).toBe(true);
  });
  const falseCases: [string, FormikErrors<unknown>][] = [
    ["an empty object", {}],
    ["an object with an undefined field", {field: undefined}],
    ["an object with a null field", {field: null}],
  ];

  it.each(falseCases)('should return false when there is %s', (_, errors) => {
    expect(formHasErrors(errors)).toBe(false);
  });
});