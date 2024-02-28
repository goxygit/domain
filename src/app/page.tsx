import Image from "next/image";
import styles from "./page.module.css";
import HeaderLine from "@/components/header_line/main";
import Question from "@/components/question/main";

export default function Home() {
  return (

    <>
      <HeaderLine />
      <Question />
    </>
  );
}
