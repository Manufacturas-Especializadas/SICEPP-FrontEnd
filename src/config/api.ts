const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    epp: {
      getEppDetails: "/api/Epp/",
      create: "/api/Epp/Create",
    },
    store: {},
    catalogs: {
      getEppTypes: "/api/Catalogs/epp-types",
      getSizes: "/api/Catalogs/sizes",
      getReasonRequest: "/api/Catalogs/ReasonRequest",
      getPreviousCondition: "/api/Catalogs/previous-condition",
      getEpp: "/api/Catalogs/epp",
    },
  },
};
