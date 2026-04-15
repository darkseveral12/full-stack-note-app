import {
  HStack,
  Field,
  InputGroup,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { FilterContext } from "../../context/FilterProvider";
import { LuSearch } from "react-icons/lu";
import SortButton from "./SortButton";
import { useContext, type KeyboardEvent } from "react";
import { useRef } from "react";
import TagsFilter from "./TagsFilter";
/* search={search}
setSearch={setSearch}
tag={tag}
setTag={setTag}
sort={sort}
setSort={setSort}
updateQuery={updateQuery}
*/

const FilterSection = () => {
  const { search, setSearch, updateQuery } = useContext(FilterContext);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const searchValue = searchRef.current!.value;
    updateQuery("search", searchValue);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = e.key;
    if (pressedKey === "Enter") handleSearch();
  };

  return (
    <>
      <HStack>
        <Field.Root>
          <Field.Label>Search Notes</Field.Label>
          <InputGroup startElement={<LuSearch />}>
            <Input
              ref={searchRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search notes..."
            />
          </InputGroup>
          <Field.HelperText>
            Search your notes by title or content
          </Field.HelperText>
        </Field.Root>
        <Button onClick={handleSearch} variant="subtle">
          Search
        </Button>
      </HStack>
      <HStack justifyContent={"space-between"} mt={"1.5"} alignItems={"center"}>
        <TagsFilter />
        <HStack>
          <Text>Sort by: </Text>
          <SortButton />
        </HStack>
      </HStack>
    </>
  );
};

export default FilterSection;
