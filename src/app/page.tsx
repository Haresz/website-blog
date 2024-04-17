"use client";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { actionGetBlog } from "@/lib/features/blogSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Heading } from "@chakra-ui/react";
import { useRef } from "react";

export default function Home() {
  const blogs: any = useAppSelector(
    (state: RootState) => state.blogSlice.blogs
  );
  const store = useAppStore();
  const initialized: any = useRef(false);
  if (!initialized.current) {
    store.dispatch(actionGetBlog());
    initialized.current = true;
  }

  console.log(blogs, initialized);
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
        {blogs.map((item: any) => {
          return <Cards title={item.title} content={item.body} />;
        })}
      </div>
    </div>
  );
}
