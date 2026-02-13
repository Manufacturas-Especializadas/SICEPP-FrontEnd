import { HardHat } from "lucide-react";
import { FormCard } from "../../components/FormCard/FormCard";
import { Input } from "../../components/CustomInputs/Input";
import { useEppTypes } from "../../hooks/useEppTypes";
import { useEppForm } from "../../hooks/useEppForm";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useSizes } from "../../hooks/useSizes";
import { useReasonRequest } from "../../hooks/useReasonRequest";
import { usePreviousCondition } from "../../hooks/usePreviousCondition";
import { LoadingSkeleton } from "../../components/LoadingSkeleton/LoadingSkeleton";
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

  if (loading) return <LoadingSkeleton />;

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
      </FormCard>
    </div>
  );
};
