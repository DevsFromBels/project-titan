"use client";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import { useWindowSize } from "@uidotdev/usehooks";

export default function NotFound() {
  const t = useTranslations("not-found");
  const size = useWindowSize();

  if (size?.width && size.width <= 1023.8) {
    return (
      <div className="w-[100vw] m-auto flex h-screen items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>

          <p className="mt-2 text-2xl">{t("text")}</p>

          <Link href="/">
            <Button className="mt-6">{t("btn-text")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[calc(100vw_-_250px)] m-auto flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <p className="mt-2 text-2xl">{t("text")}</p>

        <Link href="/">
          <Button className="mt-6">{t("btn-text")}</Button>
        </Link>
      </div>
    </div>
  );
}
