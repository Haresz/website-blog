"use client";
import {
  Box,
  Text,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { SignOut, Toolbox, UserCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Nav(props: { theme: string }) {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState<any>({});
  const toast = useToast();

  useEffect(() => {
    const tokenFromCookie: any = Cookies.get("token");
    setToken(tokenFromCookie);

    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const tokenInterval = setInterval(() => {
      const updatedToken: any = Cookies.get("token");
      if (updatedToken !== token) {
        setToken(updatedToken);
      }

      const updatedUserData = sessionStorage.getItem("userData");
      if (updatedUserData) {
        setUserData(JSON.parse(updatedUserData));
      }
    }, 5000);

    return () => clearInterval(tokenInterval);
  }, [token]);

  const handleLogOut = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("userData");
    setToken("");
    setUserData({});
    toast({
      title: `You've logged out`,
      position: "top",
      status: "info",
      isClosable: true,
    });
  };

  return (
    <Box
      className={
        props.theme == "dark"
          ? "w-full py-8 sm:px-20 px-4 flex justify-between bg-dark font-bold text-light container-nav"
          : "w-full py-8 sm:px-20 px-4 flex justify-between bg-white font-bold text-dark shadow-lg container-nav"
      }
    >
      <Link href={"/"}>
        <Text fontSize={"3xl"}>
          {!userData.name ? "Your Name" : userData.name}
        </Text>
      </Link>
      <HStack gap={4}>
        {!token ? (
          <>
            <Link href={"/auth/sign-in"}>
              <Button
                colorScheme="white"
                variant="outline"
                borderColor={"#2a4059"}
                borderRadius={0}
                size="md"
              >
                Login
              </Button>
            </Link>
            <Link href={"/auth/sign-up"}>
              <Button
                backgroundColor={"#2B6DED"}
                color={"white"}
                borderRadius={0}
                _hover={{ backgroundColor: "#2B6DED" }}
                size="md"
              >
                Sign up
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Menu>
              <MenuButton>
                <UserCircle size={38} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleLogOut()}>
                  <SignOut color="black" size={32} />
                  <Text
                    color={"black"}
                    ml={3}
                    fontSize="lg"
                    fontWeight={"semibold"}
                  >
                    Log Out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Box>
  );
}
