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

export const EppIndex = () => {
  const {
    formData,
    loading,
    handleChange,
    handleDetailChange,
    handleSubmit,
    resetForm,
    addDetail,
    removeDetail,
  } = useEppForm();

  const { data: eppTypes } = useEppTypes();
  const { data: sizes } = useSizes();
  const { data: reasonRequest } = useReasonRequest();
  const { data: previousCondition } = usePreviousCondition();

  const eppTypesOptions =
    eppTypes?.map((e) => ({
      label: e.nameType,
      value: e.id,
    })) || [];

  const sizesOptions =
    sizes?.map((e) => ({
      label: e.nameSize,
      value: e.id,
    })) || [];

  const reasonRequestOptions =
    reasonRequest?.map((e) => ({
      label: e.nameReason,
      value: e.id,
    })) || [];

  const previousConditionOptions =
    previousCondition?.map((e) => ({
      label: e.nameCondition,
      value: e.id,
    })) || [];

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <FormCard
        title="REGISTRO DE EPP"
        subtitle="Control de equipo de protección persona para colaboradores"
        icon={<HardHat size={24} />}
        onSubmit={handleSubmit}
        resetForm={resetForm}
      >
        <Input
          label="Nombre"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input
          label="Área"
          value={formData.area}
          onChange={(e) => handleChange("area", e.target.value)}
        />

        <Input
          label="Puesto"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />

        <Input
          label="Turno"
          value={formData.shift}
          onChange={(e) => handleChange("shift", e.target.value)}
        />

        <div className="md:col-span-2 space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              Detalles de EPP
            </h3>

            <button
              type="button"
              onClick={addDetail}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 
              py-2 rounded-md transition"
            >
              + Agregar
            </button>
          </div>

          {formData.details.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 
              p-5 rounded-xl border border-slate-200 w-full"
            >
              <div className="md:col-span-4">
                <FloatingSelect
                  label="Tipo de EPP"
                  options={eppTypesOptions}
                  value={detail.eppTypeId}
                  onChange={(value) =>
                    handleDetailChange(index, "eppTypeId", Number(value))
                  }
                />
              </div>

              <div className="md:col-span-3">
                <FloatingSelect
                  label="Talla (opcional)"
                  options={sizesOptions}
                  value={detail.sizeId ?? 0}
                  onChange={(value) =>
                    handleDetailChange(index, "sizeId", Number(value))
                  }
                />
              </div>

              <div className="md:col-span-3">
                <Input
                  label="Cantidad"
                  type="number"
                  value={detail.requestedQuantity || ""}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "requestedQuantity",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="md:col-span-2 flex items-end">
                {formData.details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetail(index)}
                    className="w-full text-xs bg-red-500 hover:bg-red-600 
                    text-white px-3 py-2 rounded-md transition hover:cursor-pointer"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <FloatingSelect
            label="Motivo de la solicitud"
            options={reasonRequestOptions}
            value={formData.reasonRequestId}
            onChange={(value) => handleChange("reasonRequestId", Number(value))}
          />
        </div>

        <div className="md:col-span-2">
          <FloatingSelect
            label="Condición del EPP anterior"
            options={previousConditionOptions}
            value={formData.previousConditionId}
            onChange={(value) =>
              handleChange("previousConditionId", Number(value))
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            ¿Entrega EPP anterior?
          </label>

          <div className="flex items-center gap-6 h-12 px-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryEPPPrevious"
                checked={formData.deliveryEPPPrevious === true}
                onChange={() => handleChange("deliveryEPPPrevious", true)}
              />
              <span>Sí</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryEPPPrevious"
                checked={formData.deliveryEPPPrevious === false}
                onChange={() => handleChange("deliveryEPPPrevious", false)}
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </FormCard>
    </div>
  );
};
