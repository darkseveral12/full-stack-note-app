import React, { createContext, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface FilterContextProp {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sort: "latest" | "oldest";
  setSort: Dispatch<SetStateAction<"latest" | "oldest">>;
  updateQuery: (key: string, value: string | string[]) => void;
}

interface FilterProviderProp {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
}

const FilterContext = createContext<FilterContextProp>({
  search: "",
  setSearch: () => {},
  sort: "latest",
  setSort: () => {},
  updateQuery: () => {},
});

const FilterProvider = ({ url, setUrl, children }: FilterProviderProp) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [search, setSearch] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });
  const [sort, setSort] = useState<"latest" | "oldest">(() => {
    const params = new URLSearchParams(window.location.search);
    const sortParam = params.get("sort");
    return sortParam === "latest" || sortParam === "oldest"
      ? sortParam
      : "latest";
  });

  // Function to update a single param in URL
  const updateQuery = (key: string, value: string | string[]) => {
    console.log(value);
    const params = new URLSearchParams(window.location.search); // live read
    if (typeof value === "string" && value.length > 0)
      params.set(key, value); // add/update param
    else if (Array.isArray(value) && value.length > 0)
      params.set(key, value.join(","));
    else params.delete(key); // remove if empty

    // Keep the router's location in sync too
    console.log("Query called !");
    navigate({ search: params.toString() }, { replace: true });

    if (Array.from(params.keys()).length === 0) setUrl("");
    else setUrl(`${API_URL}?${params.toString()}`);
  };

  useEffect(() => console.log(url), [url]);
  return (
    <FilterContext value={{ search, setSearch, sort, setSort, updateQuery }}>
      {children}
    </FilterContext>
  );
};

export { FilterContext, FilterProvider };
