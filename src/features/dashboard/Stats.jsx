//
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        value={numBookings}
        title="Bookings"
        color={`blue`}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        value={formatCurrency(sales)}
        title="Sales"
        color={`green`}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={checkins}
        title="Check ins"
        color={`indigo`}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        value={`${Math.round(occupation * 100)}%`}
        title="Occupancy rate"
        color={`yellow`}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
