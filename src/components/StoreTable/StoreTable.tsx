import { useMemo, useState, type JSX } from "react";
import type { EppListItem, StatusType } from "../../types/types";
import { formatDateTime } from "../../utils/dateFormatter";
import { StoreDetailModal } from "../StoreDetailModal/StoreDetailModal";

interface Props {
  data: EppListItem[];
  onRefresh: () => void;
}

const ITEMS_PER_PAGE = 10;

export const StoreTable = ({ data, onRefresh }: Props): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Solicitante</th>
              <th className="px-6 py-4 text-left">Área</th>
              <th className="px-6 py-4 text-left">Puesto</th>
              <th className="px-6 py-4 text-left">Items solicitados</th>
              <th className="px-6 py-4 text-left">Fecha de la solicitud</th>
              <th className="px-6 py-4 text-left">Estado</th>
              <th className="px-6 py-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">{item.area}</td>
                <td className="px-6 py-4">{item.position}</td>
                <td className="px-6 py-4 items-center">{item.itemsCount}</td>
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
      <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 text-sm">
        <span className="text-gray-500">
          Página {currentPage} de {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded-md border text-gray-600 
            disabled:opacity-40 hover:cursor-pointer"
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded-md border text-gray-600 
            disabled:opacity-40 hover:cursor-pointer"
          >
            →
          </button>
        </div>
      </div>
      <StoreDetailModal
        eppId={selectedId}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          onRefresh();
        }}
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
