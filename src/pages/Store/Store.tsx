import { StoreStatusCard } from "../../components/StoreStatus/StoreStatus";
import { StoreTable } from "../../components/StoreTable/StoreTable";
import { useEpp } from "../../hooks/useEpp";

export const Store = () => {
  const { data } = useEpp();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Solicitudes EPP</h1>
        <p className="text-gray-500 text-sm">
          Gestión y seguimiento de solicitudes
        </p>
      </header>

      <StoreStatusCard data={data} />
      <StoreTable data={data} />
    </div>
  );
};
