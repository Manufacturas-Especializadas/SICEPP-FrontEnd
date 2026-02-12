import { useCallback, useState, type SyntheticEvent } from "react";
import type { Epp } from "../types/types";
import toast from "react-hot-toast";
import { eppService } from "../api/services/EppService";

interface useEppFormReturn {
  loading: boolean;
  error: string | null;
  formData: Epp;
  handleChange: (field: keyof Epp, value: string | number) => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: Epp = {
  name: "",
  area: "",
  position: "",
  shift: "",
  requestedQuantity: 0,
  deliveryEPPPrevious: true,
  eppTypeId: 0,
  sizeId: 0,
  reasonRequestId: 0,
  previousConditionId: 0,
};

export const useEppForm = (onSuccess?: () => void): useEppFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Epp>(initialFormData);

  const handleChange = useCallback(
    (field: keyof Epp, value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (error) setError(null);
    },
    [error],
  );

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("El nombre es requerido");

    if (!formData.area.trim()) errors.push("El área es requerida");

    if (!formData.position.trim()) errors.push("El puesto es requrido");

    if (!formData.shift.trim()) errors.push("El turno es requerido");

    if (Number(formData.eppTypeId) === 0)
      errors.push("El tipo de Epp es requerido");

    if (Number(formData.sizeId) === 0) errors.push("La talla es requerida");

    if (Number(formData.requestedQuantity) === 0)
      errors.push("La cantidad es requerida");

    if (Number(formData.reasonRequestId) === 0)
      errors.push("El motivo de la solicitud es requerido");

    if (Number(formData.previousConditionId) === 0)
      errors.push("La condición es requerida");

    if (formData.deliveryEPPPrevious === null)
      errors.push("Esta pregunta es requerida");

    if (errors.length > 0) {
      const errorMessage = errors.join(". ");
      setError(errorMessage);
      toast.error(errors.join("\n"));

      return false;
    }

    return true;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setError(null);
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);
      setError(null);

      const loadingToast = toast.loading("Registrando...");

      try {
        const payload = {
          ...formData,
          eppTypeId: Number(formData.eppTypeId),
          previousConditionId: Number(formData.previousConditionId),
          reasonRequestId: Number(formData.reasonRequestId),
          requestedQuantity: Number(formData.requestedQuantity),
        };

        await eppService.create(payload);

        toast.dismiss(loadingToast);

        toast.success("EPP registrado correctamente");

        resetForm();

        if (onSuccess) onSuccess();
      } catch (err: any) {
        toast.dismiss(loadingToast);

        const message =
          err?.response?.data?.message ||
          "Ocurrio un error al registrar el EPP";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [formData, onSuccess, resetForm, validateForm],
  );

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
