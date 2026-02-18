import { useNavigate } from "react-router-dom";
import { StoreStatusCard } from "../../components/StoreStatus/StoreStatus";
import { StoreTable } from "../../components/StoreTable/StoreTable";
import { useEpp } from "../../hooks/useEpp";

export const Store = () => {
  const { data, refresh } = useEpp();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Solicitudes EPP</h1>
        <p className="text-gray-500 text-sm">
          Gestión y seguimiento de solicitudes
        </p>
      </header>

      <StoreStatusCard data={data} />

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/reportes")}
          className="flex items-center px-5 py-2 rounded-xl bg-green-600 text-white
          hover:bg-green-700 transition shadow-sm hover:cursor-pointer"
        >
          Reportes
        </button>
      </div>
      <StoreTable data={data} onRefresh={refresh} />
    </div>
  );
};
