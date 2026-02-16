interface Props {
  label: string;
  value?: string;
  highlight?: boolean;
}

export const DetailItem = ({ label, value, highlight }: Props) => {
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded-xl ${highlight ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}
    >
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span
        className={`text-sm ${highlight ? "font-bold text-blue-700" : "text-gray-800"}`}
      >
        {value || "-"}
      </span>
    </div>
  );
};
