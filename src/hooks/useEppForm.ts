import { useCallback, useState, type SyntheticEvent } from "react";
import type { CreateEpp, CreateEppDetail } from "../types/types";
import toast from "react-hot-toast";
import { eppService } from "../api/services/EppService";

interface useEppFormReturn {
  loading: boolean;
  error: string | null;
  formData: CreateEpp;
  handleChange: (
    field: keyof Omit<CreateEpp, "details">,
    value: string | number | boolean,
  ) => void;
  handleDetailChange: (
    index: number,
    field: keyof CreateEppDetail,
    value: string | number,
  ) => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  addDetail: () => void;
  removeDetail: (index: number) => void;
  resetForm: () => void;
}

const initialFormData: CreateEpp = {
  name: "",
  area: "",
  position: "",
  shift: "",
  deliveryEPPPrevious: true,
  reasonRequestId: 0,
  previousConditionId: 0,
  details: [
    {
      eppTypeId: 0,
      sizeId: null,
      requestedQuantity: 0,
    },
  ],
};

export const useEppForm = (onSuccess?: () => void): useEppFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateEpp>(initialFormData);

  const handleChange = useCallback(
    (
      field: keyof Omit<CreateEpp, "details">,
      value: string | number | boolean,
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          typeof value !== "boolean" && field.toString().endsWith("Id")
            ? Number(value)
            : value,
      }));

      if (error) setError(null);
    },
    [error],
  );

  const handleDetailChange = useCallback(
    (index: number, field: keyof CreateEppDetail, value: string | number) => {
      setFormData((prev) => {
        const updatedDetails = [...prev.details];

        updatedDetails[index] = {
          ...updatedDetails[index],
          [field]:
            field === "requestedQuantity" || field.endsWith("Id")
              ? Number(value)
              : value,
        };

        return {
          ...prev,
          details: updatedDetails,
        };
      });
    },
    [],
  );

  const addDetail = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          eppTypeId: 0,
          sizeId: null,
          requestedQuantity: 0,
        },
      ],
    }));
  }, []);

  const removeDetail = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("El nombre es requerido");

    if (!formData.area.trim()) errors.push("El área es requerida");

    if (!formData.position.trim()) errors.push("El puesto es requrido");

    if (!formData.shift.trim()) errors.push("El turno es requerido");

    if (formData.details.length === 0)
      errors.push("Debe agregar al menos un EPP");

    formData.details.forEach((detail, index) => {
      if (Number(detail.eppTypeId) === 0)
        errors.push(`El tipo de EPP en la fila ${index + 1} es requerido`);

      if (Number(detail.requestedQuantity) === 0)
        errors.push(`La cantidad en la fila ${index + 1} es requerida`);
    });

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
        await eppService.create(formData);

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
    handleDetailChange,
    handleSubmit,
    addDetail,
    removeDetail,
    resetForm,
  };
};
