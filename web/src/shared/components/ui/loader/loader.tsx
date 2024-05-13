'use client'
import React from "react";
import styles from '@/shared/components/ui/loader/loader.module.css'
import { useTheme } from "next-themes";

const Loader = () => {
  const { theme } = useTheme();
  return <div className={styles.loader}></div>;
};

export default Loader;
