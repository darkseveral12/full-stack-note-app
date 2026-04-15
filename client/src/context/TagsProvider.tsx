import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";
import { FilterContext } from "./FilterProvider";
import { useContext } from "react";
interface TagsContextProp {
  tag: string[];
  setTag: Dispatch<SetStateAction<string[]>>;
  clickTag: (tagString: string) => void;
}

interface TagsProviderProp {
  children: ReactNode;
}

const TagsContext = createContext<TagsContextProp>({
  tag: [],
  setTag: () => {},
  clickTag: () => {},
});

const TagsProvider = ({ children }: TagsProviderProp) => {
  const [tag, setTag] = useState<string[]>([]);
  const { updateQuery } = useContext(FilterContext);
  const clickTag = (tagString: string) => {
    const newTags = tag.includes(tagString)
      ? tag.filter((tag) => tag !== tagString) // remove
      : [...tag, tagString];

    setTag(newTags);

    updateQuery("tags", newTags);
  };

  return (
    <TagsContext.Provider value={{ tag, setTag, clickTag }}>
      {children}
    </TagsContext.Provider>
  );
};

export { TagsContext, TagsProvider };
