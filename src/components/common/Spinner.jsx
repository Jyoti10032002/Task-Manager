const Spinner = ({ fullScreen = false }) => {
  const wrapperClass = fullScreen
    ? 'min-h-[50vh] flex items-center justify-center'
    : 'flex items-center justify-center py-12';

  return (
    <div className={wrapperClass}>
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400" />
        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-2 border-indigo-400/30" />
      </div>
    </div>
  );
};

export default Spinner;
