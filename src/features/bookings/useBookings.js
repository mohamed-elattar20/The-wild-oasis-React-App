import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  // console.log(filterValue);
  const filterObj =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Query
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterObj, sortBy, page], // Whenever ( FilterObj or sortBy or page ) Changes
    //  It Will Re-Fetch The Data
    queryFn: () => getBookings({ filterObj, sortBy, page }),
  });

  // Pre-Fetching

  const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortBy, page + 1],
      queryFn: () => getBookings({ filterObj, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortBy, page - 1],
      queryFn: () => getBookings({ filterObj, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error };
};
