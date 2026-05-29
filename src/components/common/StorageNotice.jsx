const StorageNotice = ({ usingLocal }) => {
  if (!usingLocal) return null;

  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
      Tasks are saved locally in your browser. Run <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/50">npm run server</code> in another terminal to sync with JSON Server.
    </div>
  );
};

export default StorageNotice;
