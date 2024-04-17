"use client";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Heading
        style={{ fontSize: "200px" }}
        className="w-full text-center font-black border-b-2 py-8"
      >
        THE BLOG
      </Heading>
      <InputSearch />
      <div className="mx-20 flex flex-wrap justify-between">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
}
