import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperation = () => {
  return (
    <>
      <TableOperations>
        <Filter
          filterField={`discount`}
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />

        <SortBy
          options={[
            { value: "name-asc", label: "Sort by name ( A - Z )" },
            { value: "name-desc", label: "Sort by name ( Z - A )" },
            { value: "regularPrice-asc", label: "Sort by Price (low frist) " },
            {
              value: "regularPrice-desc",
              label: "Sort by Price (high frist) ",
            },
            {
              value: "maxCapacity-asc",
              label: "Sort by Max Capacity (low frist) ",
            },
            {
              value: "maxCapacity-desc",
              label: "Sort by Max Capacity (high frist) ",
            },
          ]}
        />
      </TableOperations>
    </>
  );
};

export default CabinTableOperation;
