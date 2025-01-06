type FormErrorProps = {
  error?: string,
};

const getText = (
  error: string | undefined,
) => {
  if (error) return error;
  return '✅';
};

// NB: this only handles simple, non-array cases
export const FormError = (props: FormErrorProps) => {
  return (
    <span className="text-red-600 text-right">
      {getText(props.error)}
    </span>
  );
};