const TextInput = ({ label, error, ...props }) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      <input className="input" {...props} />
      {error ? <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p> : null}
    </label>
  );
};

export default TextInput;
