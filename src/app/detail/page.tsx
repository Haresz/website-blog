import React from "react";
import { Heading, Image, Text } from "@chakra-ui/react";

export default function page() {
  return (
    <div>
      <div className="w-full py-8 px-20 bg-white font-bold text-2xl text-black border-b-2">
        Your Name
      </div>

      <div className="">
        <Image
          className="w-full h-96"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />
        <Heading className="m-20">Title</Heading>

        <Text className="m-20 font-normal text-justify text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, eos
          delectus, ex praesentium rerum odit exercitationem pariatur voluptas
          itaque soluta dolore impedit, autem laborum veniam! Architecto cumque
          cum nemo doloremque! Ut provident, nihil laborum tempore omnis facere
          repellat! Quae pariatur ab non enim hic sit a dolore molestias officia
          commodi mollitia harum soluta, veritatis dicta aspernatur cupiditate
          numquam necessitatibus ipsum? Ullam et obcaecati delectus adipisci
          repudiandae distinctio nemo expedita deleniti facilis, minima
          laboriosam dolore animi veritatis aut omnis possimus ea libero
          asperiores, rerum fugit necessitatibus! Beatae neque consequatur
          aliquam ratione! Ad explicabo incidunt nulla alias, repellat placeat
          vel repellendus, ratione nesciunt molestias dolores obcaecati atque
          possimus doloremque earum, quae molestiae debitis corporis harum vitae
          reprehenderit illo minus culpa? Incidunt, ipsum.
        </Text>
      </div>
    </div>
  );
}
