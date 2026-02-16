import { useState, type JSX } from "react";
import type { EppListItem, StatusType } from "../../types/types";
import { formatDateTime } from "../../utils/dateFormatter";
import { StoreDetailModal } from "../StoreDetailModal/StoreDetailModal";

interface Props {
  data: EppListItem[];
}

export const StoreTable = ({ data }: Props): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Solicitante</th>
              <th className="px-6 py-4 text-left">Área</th>
              <th className="px-6 py-4 text-left">Puesto</th>
              <th className="px-6 py-4 text-left">Epp solicitado</th>
              <th className="px-6 py-4 text-left">Cantidad</th>
              <th className="px-6 py-4 text-left">Fecha de la solicitud</th>
              <th className="px-6 py-4 text-left">Estado</th>
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">{item.area}</td>
                <td className="px-6 py-4">{item.position}</td>
                <td className="px-6 py-4">{item.eppType}</td>
                <td className="px-6 py-4">{item.requestedQuantity}</td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDateTime(item.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedId(item.id);
                      setOpen(true);
                    }}
                    className="text-blue-600 hover:underline text-sm 
                    hover:cursor-pointer"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StoreDetailModal
        eppId={selectedId}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      ;
    </div>
  );
};

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps): JSX.Element => {
  const styles: Record<StatusType, string> = {
    "Pendiente autorizacion": "bg-yellow-100 text-yellow-700",
    Aprobado: "bg-green-100 text-green-700",
    Rechazado: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};
