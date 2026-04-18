import {
  Card,
  IconButton,
  HStack,
  Tag,
  Wrap,
  Em,
  Box,
  TagCloseTrigger,
} from "@chakra-ui/react";
import { VscPinned } from "react-icons/vsc";

import { HiPlus } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import type { IFormInput } from "../types/NoteInput";
import { useContext } from "react";
import { TagsContext } from "../context/TagsProvider";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

const NoteCard = ({ data }: { data: IFormInput }) => {
  const { tag, clickTag } = useContext(TagsContext);

  return (
    <Card.Root variant="outline">
      <Card.Body gap="4" justifyContent={"space-between"}>
        <HStack justify={"space-between"}>
          <Box>
            <Card.Title as="h3" mt="2">
              {data.title}
            </Card.Title>
            <Em color={"gray.500"} textStyle={"sm"}>
              {formatDistanceToNow(new Date(data.updatedAt), {
                addSuffix: true,
              })}
            </Em>
          </Box>
          <IconButton
            size="sm"
            colorPalette={"blue"}
            variant="subtle"
            aria-label="pinned"
          >
            <VscPinned />
          </IconButton>
        </HStack>
        <Card.Description>{data.content}</Card.Description>
        <Wrap>
          {[...data.tags!]
            .sort((a, b) => {
              const aSelected = tag.includes(a);
              const bSelected = tag.includes(b);
              if (aSelected && !bSelected) return -1; // a first
              if (!aSelected && bSelected) return 1; // b first
              return 0; // keep original order otherwise
            })
            .map((tags) => (
              <Tag.Root
                key={tags}
                size="md"
                _hover={{ bg: "blue.500", color: "white", cursor: "pointer" }}
                transition="0.2s"
                onClick={() => clickTag(tags)}
              >
                <Tag.StartElement>
                  {tag.includes(tags) ? (
                    <TagCloseTrigger onClick={() => clickTag(tags)} />
                  ) : (
                    <HiPlus />
                  )}
                </Tag.StartElement>
                <Tag.Label>{tags}</Tag.Label>
              </Tag.Root>
            ))}
        </Wrap>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <EditNote data={data} />

        <DeleteNote data={data} />
      </Card.Footer>
    </Card.Root>
  );
};

export default NoteCard;
