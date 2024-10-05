export const CardItems = ({ title, value, text, children }) => {
  return (
    <div className="w-40 h-24 md:w-[240px] md:h-28 rounded-lg shadow-md flex justify-between p-3">
      <div className="flex justify-between flex-col">
        <h2 className="text-xs md:text-sm font-semibold">{title}</h2>
        <p className="font-extrabold text-sm md:text-xl">{value}</p>
        <span className="text-[6px] text-slate-500 md:text-xs">{text}</span>
      </div>
      <div className="min-h-full flex items-center">{children}</div>
    </div>
  );
};
