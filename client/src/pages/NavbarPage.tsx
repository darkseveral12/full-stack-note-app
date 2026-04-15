import { Flex, Icon, IconButton, ClientOnly, Skeleton } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { useColorModeValue } from "../components/ui/color-mode";
import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

const NavbarPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navbarBg = useColorModeValue("white", "black");
  return (
    <Flex h="10vh" bgColor={navbarBg} justifyContent={"flex-end"} padding="4">
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
    </Flex>
  );
};

export default NavbarPage;
