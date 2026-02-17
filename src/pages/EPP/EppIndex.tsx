import { HardHat } from "lucide-react";
import { FormCard } from "../../components/FormCard/FormCard";
import { Input } from "../../components/CustomInputs/Input";
import { useEppTypes } from "../../hooks/useEppTypes";
import { useEppForm } from "../../hooks/useEppForm";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useSizes } from "../../hooks/useSizes";
import { useReasonRequest } from "../../hooks/useReasonRequest";
import { usePreviousCondition } from "../../hooks/usePreviousCondition";
import { Toaster } from "react-hot-toast";

export const EppIndex = () => {
  const { formData, loading, handleChange, handleSubmit, resetForm } =
    useEppForm();

  const { data: eppTypes } = useEppTypes();
  const { data: sizes } = useSizes();
  const { data: reasonRequest } = useReasonRequest();
  const { data: previousCondition } = usePreviousCondition();

  const eppTypesOptions =
    eppTypes.map((e) => ({
      label: e.nameType,
      value: e.id,
    })) || [];

  const sizesOptions =
    sizes.map((e) => ({
      label: e.nameSize,
      value: e.id,
    })) || [];

  const reasonRequestOptions =
    reasonRequest.map((e) => ({
      label: e.nameReason,
      value: e.id,
    })) || [];

  const previousConditionOptions =
    previousCondition.map((e) => ({
      label: e.nameCondition,
      value: e.id,
    })) || [];

  if (loading) return "Cargando datos...";

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
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
      <FormCard
        title="REGISTRO DE EPP"
        subtitle="Control de equipo de protección persona para colaboradores"
        icon={<HardHat size={24} />}
        onSubmit={handleSubmit}
        resetForm={resetForm}
      >
        <div className="flex flex-col gap-1.5">
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Área"
            value={formData.area}
            onChange={(e) => {
              handleChange("area", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Puesto"
            value={formData.position}
            onChange={(e) => {
              handleChange("position", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Turno"
            value={formData.shift}
            onChange={(e) => {
              handleChange("shift", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FloatingSelect
            label="Tipo de EPP"
            options={eppTypesOptions}
            value={formData.eppTypeId}
            onChange={(value) => {
              handleChange("eppTypeId", Number(value));
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FloatingSelect
            label="Talla (si aplica)"
            options={sizesOptions}
            value={formData.sizeId}
            onChange={(value) => {
              handleChange("sizeId", Number(value));
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Cantidad solicitada"
            type="number"
            value={formData.requestedQuantity || ""}
            onChange={(e) => {
              handleChange("requestedQuantity", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FloatingSelect
            label="Motivo de la solicitud"
            options={reasonRequestOptions}
            value={formData.reasonRequestId}
            onChange={(value) => {
              handleChange("reasonRequestId", Number(value));
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FloatingSelect
            label="Condición del EPP anterior"
            options={previousConditionOptions}
            value={formData.previousConditionId}
            onChange={(value) => {
              handleChange("previousConditionId", Number(value));
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            ¿Entrega EPP anterior?
          </label>

          <div
            className={`flex items-center gap-4 h-11.5 px-4 rounded-lg border transition-all duration-200 ${
              formData.deliveryEPPPrevious !== null
                ? "bg-blue-50/30 border-blue-400 shadow-sm shadow-blue-100"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="deliveryEPPPrevious"
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 
                cursor-pointer transition-transform group-active:scale-90"
                checked={formData.deliveryEPPPrevious === true}
                onChange={() => handleChange("deliveryEPPPrevious", true)}
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  formData.deliveryEPPPrevious === true
                    ? "text-blue-700"
                    : "text-slate-600 group-hover:text-blue-600"
                }`}
              >
                Sí
              </span>
            </label>
            <div className="w-px h-4 bg-slate-200" />
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="deliveryEPPPrevious"
                className="w-4 h-4 text-blue-600 border-slate-300 
                focus:ring-blue-500 cursor-pointer transition-transform 
                group-active:scale-90"
                checked={formData.deliveryEPPPrevious === false}
                onChange={() => handleChange("deliveryEPPPrevious", false)}
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  formData.deliveryEPPPrevious === false
                    ? "text-blue-700"
                    : "text-slate-600 group-hover:text-blue-600"
                }`}
              >
                No
              </span>
            </label>
          </div>
        </div>
      </FormCard>
    </div>
  );
};
