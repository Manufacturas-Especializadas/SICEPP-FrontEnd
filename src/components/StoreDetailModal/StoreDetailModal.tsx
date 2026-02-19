import { useEppDetails } from "../../hooks/useEppDetails";
import { useStatus } from "../../hooks/useStatus";
import { useStoreForm } from "../../hooks/useStoreForm";
import { FloatingSelect } from "../CustomInputs/FloatingSelect";
import { Input } from "../CustomInputs/Input";
import { DetailItem } from "../DetailItem/DetailItem";

interface Props {
  eppId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const StoreDetailModal = ({
  eppId,
  isOpen,
  onClose,
  onSuccess,
}: Props) => {
  const { data, loading } = useEppDetails(eppId);

  const { data: status } = useStatus();

  const { formData, handleChange, handleSubmit } = useStoreForm(
    eppId!,
    data?.store ?? null,
    onSuccess,
  );

  const statusOptions = status.map((e) => ({
    label: e.nameStatus,
    value: e.id,
  }));

  if (!isOpen) return null;

  if (loading) return "Cargando datos..";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 
      backdrop-blur-sm"
    >
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
            Información de la solicitud
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem label="Solicitante" value={data?.name} highlight />
            <DetailItem label="Área" value={data?.area} />
            <DetailItem label="Puesto" value={data?.position} />
            <DetailItem label="Turno" value={data?.shift} />
            <DetailItem label="Motivo" value={data?.reasonRequest} />
            <DetailItem
              label="¿Entregó EPP anterior?"
              value={data?.deliveryEPPPrevious ? "Sí" : "No"}
            />
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-4">
              EPP solicitados
            </h4>

            <div className="border rounded-xl overflow-hidden max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Talla</th>
                    <th className="px-4 py-3 text-left">Cantidad</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {data?.details.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.eppType}</td>
                      <td className="px-4 py-3">{item.size ?? "No aplica"}</td>
                      <td className="px-4 py-3">{item.requestedQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
