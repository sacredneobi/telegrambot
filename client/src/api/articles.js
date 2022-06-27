import { useState, useEffect, useCallback } from "react";
import useAxios from "axios-hooks";

const useGet = (countPerPage = 0) => {
  const [answer, setAnswer] = useState({ countPage: 0, items: [] });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  const [{ data, loading }] = useAxios(
    {
      url: `/api/articles?limit=${countPerPage}&offset=${
        (page - 1) * (countPerPage ? countPerPage : 0)
      }${search ? `&search=${search}` : ""}`,
    },
    { useCache: false }
  );

  useEffect(() => {
    if (data) {
      setAnswer((prev) => ({
        countPage: Math.ceil(
          (data?.count ? data.count : 0) / (countPerPage ? countPerPage : 0)
        ),
        items: data.rows ? data.rows : [],
      }));
    }
  }, [data]);

  const usePage = useCallback(
    (page) => {
      setPage(page ? page : 1);
    },
    [countPerPage]
  );

  const useSearch = useCallback((value) => {
    setSearch((prev) => {
      if (prev !== value) {
        setPage(1);
      }
      return value === "" ? null : value;
    });
  }, []);

  return {
    countPage: answer?.countPage,
    items: answer?.items,
    loading,
    usePage,
    page,
    useSearch,
  };
};

export { useGet };