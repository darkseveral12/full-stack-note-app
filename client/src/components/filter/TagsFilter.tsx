import { Wrap, Tag } from "@chakra-ui/react";
import { TagsContext } from "../../context/TagsProvider";
import { useContext } from "react";
const TagsFilter = () => {
  const { tag, clickTag } = useContext(TagsContext);

  return (
    <Wrap>
      {tag.length === 0 && (
        <Tag.Root
          rounded={"full"}
          size={"xl"}
          variant={"outline"}
          _hover={{ bg: "blue.500", color: "white", cursor: "pointer" }}
        >
          <Tag.Label>All</Tag.Label>
        </Tag.Root>
      )}

      {tag.map((tags) => (
        <Tag.Root
          variant={"outline"}
          rounded={"full"}
          size={"xl"}
          _hover={{ bg: "blue.500", color: "white", cursor: "pointer" }}
          onClick={() => clickTag(tags)}
          key={tags}
        >
          <Tag.Label>{tags}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger _hover={{ cursor: "pointer" }} />
          </Tag.EndElement>
        </Tag.Root>
      ))}
    </Wrap>
  );
};

export default TagsFilter;
