import { Toaster } from "react-hot-toast";
import { useEppDetails } from "../../hooks/useEppDetails";
import { useStatus } from "../../hooks/useStatus";
import { useStoreForm } from "../../hooks/useStoreForm";
import { FloatingSelect } from "../CustomInputs/FloatingSelect";
import { Input } from "../CustomInputs/Input";
import { DetailItem } from "../DetailItem/DetailItem";
import { LoadingSkeleton } from "../LoadingSkeleton/LoadingSkeleton";

interface Props {
  eppId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StoreDetailModal = ({ eppId, isOpen, onClose }: Props) => {
  const { data, loading } = useEppDetails(eppId);

  const { data: status } = useStatus();

  const { formData, handleChange, handleSubmit } = useStoreForm(eppId!, () => {
    onClose();
  });

  const statusOptions = status.map((e) => ({
    label: e.nameStatus,
    value: e.id,
  }));

  if (!isOpen) return null;

  if (loading) return <LoadingSkeleton />;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 
      backdrop-blur-sm"
    >
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: 9999,
          },
          success: {
            duration: 10000,
            position: "top-right",
            style: {
              background: "#10B981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            position: "top-right",
            style: {
              background: "#EF4444",
              color: "#fff",
            },
          },
          loading: {
            duration: Infinity,
            position: "top-right",
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 relative
        animate-fadeIn max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Detalle de solicitud</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl 
            hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Información del EPP
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem label="Solicitante" value={data?.name} highlight />
            <DetailItem label="Área" value={data?.area} />
            <DetailItem label="Puesto" value={data?.position} />
            <DetailItem label="Turno" value={data?.shift} />
            <DetailItem label="Tipo de Epp" value={data?.eppType} />
            <DetailItem label="Talla" value={data?.size} />
            <DetailItem
              label="Cantidad solicitada"
              value={String(data?.requestedQuantity)}
            />
            <DetailItem label="Motivo" value={data?.reasonRequest} />
            <DetailItem
              label="¿Entregó EPP anterior?"
              value={data?.deliveryEPPPrevious ? "Sí" : "No"}
            />
          </div>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-gray-700">
            Gestión de almacén
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Fecha de entrega"
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => {
                handleChange("deliveryDate", e.target.value);
              }}
            />
            <Input
              label="Autorizado por (Nombre del supervisor)"
              value={formData.authorizedBy}
              onChange={(e) => {
                handleChange("authorizedBy", e.target.value);
              }}
            />
            <Input
              label="Última entrega"
              type="date"
              value={formData.lastDelivery}
              onChange={(e) => {
                handleChange("lastDelivery", e.target.value);
              }}
            />

            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm text-gray-700">
                Cumple política de reposición
              </label>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="replacementPolicy"
                    checked={formData.replacementPolicy === true}
                    onChange={() => handleChange("replacementPolicy", true)}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="replacementPolicy"
                    checked={formData.replacementPolicy === false}
                    onChange={() => handleChange("replacementPolicy", false)}
                  />
                  No (requiere autorización)
                </label>
              </div>
            </div>

            <FloatingSelect
              label="Estatus de la solicitud"
              options={statusOptions}
              value={formData.statusId}
              onChange={(value) => {
                handleChange("statusId", Number(value));
              }}
            />

            <div className="flex flex-col gap-2 mt-4">
              <label className="font-medium text-sm text-gray-700">
                Confirmación de entrega
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.deliveryConfirmation ?? false}
                  onChange={(e) => {
                    handleChange("deliveryConfirmation", e.target.checked);
                  }}
                />
                Confirmar entrega
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="px-6 py-2 rounded-xl border border-gray-300 
              text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 
              transition disabled:opacity-50 hover:cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
