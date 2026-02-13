import type { ReactNode, SyntheticEvent } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  onSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void;
  resetForm?: () => void;
}

export const FormCard = ({
  title,
  subtitle,
  children,
  icon,
  onSubmit,
  resetForm,
}: Props) => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
          {icon && (
            <div className="p-3 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-200">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {children}
          </div>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-all active:scale-95 hover:cursor-pointer"
          >
            Guardar registro
          </button>
        </div>
      </form>
    </div>
  );
};
