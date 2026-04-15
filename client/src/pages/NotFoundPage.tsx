import { EmptyState, VStack } from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";
import Navbar from "../components/navbar/Navbar";
const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <EmptyState.Root
        size={"lg"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <EmptyState.Content>
          <EmptyState.Indicator>
            <TbError404 />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>404 Page</EmptyState.Title>
            <EmptyState.Description>
              The page you are looking for doesnt exist.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </>
  );
};

export default NotFoundPage;
