type FormErrorProps = {
  error?: string,
  touched?: boolean,
};

// NB: this only handles simple, non-array cases
export const FormError = (props: FormErrorProps) =>
  (
    <span className="text-red-600 text-right">
      {props.error && props.touched ? props.error : '✅'}
    </span>
  );