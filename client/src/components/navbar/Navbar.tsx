import { Flex, Heading, HStack, IconButton, Icon } from "@chakra-ui/react";
import { LuNotebook } from "react-icons/lu";
import CreateNote from "./CreateNote";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { ClientOnly, Skeleton } from "@chakra-ui/react";
import { LuSun, LuMoon } from "react-icons/lu";
import AvatarMenu from "./AvatarMenu";
const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navbarBg = useColorModeValue("white", "black");
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="4"
      position="sticky"
      top="0"
      bgColor={navbarBg}
      zIndex="1000" // optional, keeps it above other elements
    >
      <HStack>
        <LuNotebook size={25} />
        <Heading as="h2">Note App</Heading>
      </HStack>
      {/* Add more navigation items here */}
      <HStack gap={3}>
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
          <IconButton onClick={toggleColorMode} variant="outline" size="md">
            {colorMode === "light" ? (
              <Icon size="sm">
                <LuSun />
              </Icon>
            ) : (
              <Icon size={"sm"}>
                <LuMoon />
              </Icon>
            )}
          </IconButton>
        </ClientOnly>
        <CreateNote />
        <AvatarMenu />
      </HStack>
    </Flex>
  );
};

export default Navbar;
