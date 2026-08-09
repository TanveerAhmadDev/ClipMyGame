const Section = ({ title, count, children }) => {
  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <div className="sticky top-0 bg-white px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {title}
        </span>

        {count && <span className="text-xs text-zinc-400">{count}</span>}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Section;
