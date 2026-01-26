import React, { ReactNode } from "react";
import Typewriter from "typewriter-effect";
interface IProps {
  className?: string;
}
export function TextWritter({ className }: IProps) {
  return (
    <div className={className}>
      <Typewriter
        options={{
          strings: [
            "Приветствую!!!",
            "Рад вам на моей странице!!!",
            "Я фулл-стак разработчик!",
            "Меня зовут Ажеев Александр, приятно познакомиться!!!",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}
