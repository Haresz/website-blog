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
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function Nav() {
  const [token, setToken] = useState("");
  const toast = useToast();
  const user: any = useAppSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    const tokenFromCookie: any = Cookies.get("token");
    setToken(tokenFromCookie);

    const tokenInterval = setInterval(() => {
      const updatedToken: any = Cookies.get("token");
      if (updatedToken !== token) {
        setToken(updatedToken);
      }
    }, 5000);

    return () => clearInterval(tokenInterval);
  }, [token]);

  const handleLogOut = () => {
    Cookies.remove("token");
    setToken("");
    toast({
      title: `Your Log Out`,
      status: "info",
      isClosable: true,
    });
  };

  return (
    <Box className="w-full py-8 px-20 flex justify-between bg-white  border-b-2 font-bold text-black">
      <Link href={"/"}>
        <Text fontSize={"3xl"}>{!user.name ? "Your Name" : user.name}</Text>
      </Link>
      <HStack gap={4}>
        {!token ? (
          <>
            <Link href={"/auth/sign-up"}>
              <Button colorScheme="blue">Sign up</Button>
            </Link>
            <Link href={"/auth/sign-in"}>
              <Button colorScheme="blue" variant="outline">
                Sign In
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/dhasboard"}>
              <Toolbox size={38} />
            </Link>
            <Menu>
              <MenuButton>
                <UserCircle size={38} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleLogOut()}>
                  <SignOut size={32} />
                  <Text ml={3} fontSize="lg" fontWeight={"semibold"}>
                    {" "}
                    LogOut
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
