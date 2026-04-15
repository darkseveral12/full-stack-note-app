const API_URL = import.meta.env.VITE_API_BASE_URL;

export const checkParameterQuery = () => {
  const params = new URLSearchParams(window.location.search);
  if (Array.from(params.keys()).length === 0) return API_URL;
  return `${API_URL}?${params.toString()}`;
};

export const hasFiltered = () => {
  const params = new URLSearchParams(window.location.search);
  return Array.from(params.keys()).length > 0;
};
