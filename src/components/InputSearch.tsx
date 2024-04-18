import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function InputSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <InputGroup
      w={"fit-content"}
      className="ml-20 mt-10 mb-10 border-2 border-gray-400 rounded-lg"
    >
      <InputLeftElement pointerEvents="none" color="gray.500" fontSize="1.2em">
        <MagnifyingGlass size={20} />
      </InputLeftElement>
      <Input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Enter amount"
      />
    </InputGroup>
  );
}
