import { useEffect } from "react";

const SITE = "Aditya Vahlevy Nugraha, adityavhlvy";

export function useTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${SITE}` : SITE;
  }, [page]);
}
