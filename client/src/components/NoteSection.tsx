import NoteCard from "./NoteCard";
import { Box, Grid } from "@chakra-ui/react";
import EmptySection from "./EmptySection";
import FilterSection from "./filter/FilterSection";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

import { FaRegSadCry } from "react-icons/fa";
import SkeletonCard from "./SkeletonCard";
import { FilterProvider } from "../context/FilterProvider";
import { checkParameterQuery, hasFiltered } from "../utils/checkQuery";
import type { bodyData } from "../types/NoteInput";
import { TagsProvider } from "../context/TagsProvider";
import { useNavigate } from "react-router-dom";
const NoteSection = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [url, setUrl] = useState<string>(checkParameterQuery);
  const MAXIMUM_SKELETON = 8;

  const hasFilter = hasFiltered();

  const skeletonSequence = Array.from(
    { length: MAXIMUM_SKELETON },
    (_, index) => index + 1,
  );

  const {
    data,
    isLoading,
    statusCode,
  }: {
    data: bodyData;
    isLoading: boolean;
    statusCode: number | null | undefined;
  } = useFetch(url || API_URL, true, ["notes", url]);

  useEffect(() => {
    if (statusCode === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [statusCode, navigate]);
  return (
    <Box as="section" p={5} pt={0}>
      <FilterProvider url={url} setUrl={setUrl}>
        <TagsProvider>
          <FilterSection />

          {data?.message?.length === 0 && hasFilter && (
            <EmptySection
              title="Search has not found."
              description="Oops! We couldn’t find any notes matching your search. Try using different keywords or check again later."
              icon={FaRegSadCry}
            />
          )}

          {data?.message?.length === 0 && !hasFilter && (
            <EmptySection
              title="Your note is empty"
              description='To add a new note, click the "Create Note" button and start jotting
           down your thoughts!.'
            />
          )}

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            pt={4}
          >
            {isLoading &&
              skeletonSequence.map((value) => <SkeletonCard key={value} />)}
            {data?.message?.map((note) => {
              return <NoteCard key={note._id} data={note} />;
            })}
          </Grid>
        </TagsProvider>
      </FilterProvider>
    </Box>
  );
};

export default NoteSection;
