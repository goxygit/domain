'use client'
import Image from "next/image";
import styles from "./page.module.css";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchData } from "@/store/data-slice";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  router.push('quiz/1')
  return (
    <>

    </>
  );
}
