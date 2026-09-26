import { useEffect } from "react";

const SITE = "Aditya Vahlevy Nugraha, Kura Ninja";

export function useTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${SITE}` : SITE;
  }, [page]);
}
