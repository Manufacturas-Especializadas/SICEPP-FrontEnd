import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import type { StoreForm } from "../types/types";
import toast from "react-hot-toast";
import { storeService } from "../api/services/StoreService";

interface useStoreFormReturn {
  loading: boolean;
  error: string | null;
  formData: StoreForm;
  handleChange: (
    field: keyof StoreForm,
    value: string | number | boolean,
  ) => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: StoreForm = {
  eppId: 0,
  deliveryDate: "",
  authorizedBy: "",
  lastDelivery: "",
  replacementPolicy: null,
  statusId: 0,
  deliveryConfirmation: null,
};

export const useStoreForm = (
  eppId: number,
  onSuccess?: () => void,
): useStoreFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<StoreForm>({
    ...initialFormData,
    eppId,
  });

  const handleChange = useCallback(
    (field: keyof StoreForm, value: string | number | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          typeof value !== "boolean" && field === "statusId"
            ? Number(value)
            : value,
      }));

      if (error) setError(null);
    },
    [error],
  );

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];

    if (!formData.authorizedBy.trim())
      errors.push("El nombre del supervisor es requerido");

    if (!formData.deliveryDate) errors.push("La fecha de entraga es requerida");

    if (formData.replacementPolicy === null)
      errors.push("Debe indicar si cumple política de reposición");

    if (formData.statusId === 0) errors.push("El estatus es requerido");

    if (formData.deliveryConfirmation === null)
      errors.push("El estatus es requerido");

    if (errors.length > 0) {
      const errorMessage = errors.join(". ");
      setError(errorMessage);
      toast.error(errors.join("\n"));

      return false;
    }

    return true;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      ...formData,
      eppId,
    });
    setError(null);
    setLoading(false);
  }, [eppId]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);
      setError(null);

      const loadingToast = toast.loading("Guardando información...");

      try {
        const payload = {
          eppId: formData.eppId,
          deliveryDate: formData.deliveryDate,
          authorizedBy: formData.authorizedBy,
          lastDelivery: formData.lastDelivery,
          replacementPolicy: formData.replacementPolicy ?? false,
          statusId: Number(formData.statusId),
          deliveryConfirmation: formData.deliveryConfirmation ?? false,
        };

        await storeService.create(payload);

        toast.dismiss(loadingToast);
        toast.success("Información guardada correctamente");

        if (onSuccess) onSuccess();
      } catch (err: any) {
        toast.dismiss(loadingToast);

        const message =
          err?.response?.data?.message ||
          "Ocurrió un error al guardar la información";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [formData, onSuccess, validateForm],
  );

  useEffect(() => {
    if (eppId) {
      setFormData((prev) => ({
        ...prev,
        eppId,
      }));
    }
  }, [eppId]);

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
