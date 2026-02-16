import type { JSX } from "react";
import type * as types from "../../types/types";

interface Props {
  data: types.EppListItem[];
}

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

export const StoreStatusCard = ({ data }: Props): JSX.Element => {
  const pending = data.filter(
    (d) => d.status === "Pendiente autorizacion",
  ).length;
  const approved = data.filter((d) => d.status === "Aprobado").length;
  const rejected = data.filter((d) => d.status === "Rechazado").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Pendientes" value={pending} color="bg-yellow-500" />
      <StatCard title="Aprobadas" value={approved} color="bg-green-500" />
      <StatCard title="Rechazadas" value={rejected} color="bg-red-500" />
    </div>
  );
};

const StatCard = ({ title, value, color }: StatCardProps): JSX.Element => (
  <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
    <div className={`w-2 h-14 rounded ${color}`} />
  </div>
);
