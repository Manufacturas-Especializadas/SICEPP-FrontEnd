import { useDownloadReport } from "../../hooks/useDownloadReport";
import { useMonths } from "../../hooks/useMonths";

export const ReportsTable = () => {
  const { months, loading } = useMonths();
  const { downloading, downloadReport } = useDownloadReport();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Cargando meses disponibles...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider"
              >
                Mes
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {months.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  No hay meses con datos disponibles
                </td>
              </tr>
            ) : (
              months.map((month) => {
                const monthId = `${month.year}-${month.month}`;
                const isDownloading = downloading === monthId;

                return (
                  <tr key={monthId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {month.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          downloadReport(month.year, month.month, monthId)
                        }
                        disabled={isDownloading}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isDownloading
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer"
                        }`}
                      >
                        {isDownloading ? "Descargando..." : "Descargar Reporte"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
