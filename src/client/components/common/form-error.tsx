import {isDefined} from "@/lib/equality-checks";

type FormErrorProps = {
  error?: string,
};

// NB: this only handles simple, non-array cases
export const FormError = (props: FormErrorProps) => (
  <span className="text-red-600 text-right">
    {isDefined(props.error) ? props.error : '✅'}
  </span>
);