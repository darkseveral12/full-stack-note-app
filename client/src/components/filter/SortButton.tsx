import { Button, Menu, Portal } from "@chakra-ui/react";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";

const SortButton = () => {
  const { sort, setSort, updateQuery } = useContext(FilterContext);
  const [open, setOpen] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Menu.Trigger asChild>
        <Button fontSize={"md"} variant={"subtle"} size="sm">
          {sort}{" "}
          {open ? (
            <>
              <IoMdArrowDropup />
            </>
          ) : (
            <>
              <IoMdArrowDropdown />
            </>
          )}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={sort}
              onValueChange={(e) => {
                setSort(e.value !== "latest" ? "oldest" : "latest");
                if (e.value === "latest") {
                  updateQuery("sort", ""); // empty string triggers params.delete()
                } else {
                  updateQuery("sort", e.value);
                }
              }}
            >
              {items.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const items = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];
export default SortButton;
