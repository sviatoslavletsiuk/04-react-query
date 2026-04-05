import s from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = "Whoops, something went wrong! Please try reloading the page!",
}: ErrorMessageProps) => {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
