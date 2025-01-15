import { isDefined } from "@repo/lib/equality-checks";

type FormErrorProps = {
  error?: string;
};

// NB: this only handles simple, non-array cases
export const FormError = (props: FormErrorProps) => (
  <span data-testid="form-error" className="text-red-600 text-right">
    {isDefined(props.error) ? props.error : "✅"}
  </span>
);
