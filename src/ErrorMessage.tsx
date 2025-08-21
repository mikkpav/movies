interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 p-4 bg-red-100 text-red-800 rounded-xl m-10'>
      <p>{message}</p>
      {onRetry && (
        <button
          className='mt-2 px-3 py-1 border-red-800 text-red-800 rounded max-w-24'
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};
