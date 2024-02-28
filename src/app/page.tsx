'use client'
import Image from "next/image";
import styles from "./page.module.css";
import HeaderLine from "@/components/header_line/main";
import Question from "@/components/question/main";
import Options from "@/components/options/main";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchData } from "@/store/data-slice";

export default function Home() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  return (

    <>
      <HeaderLine />
      <Question />
      <Options />
    </>
  );
}
