/* eslint-disable */
import { v4 as uuid } from "uuid";
import { BiDollar, BiHomeAlt } from "react-icons/bi";
import { LuUser } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { FaPersonChalkboard } from "react-icons/fa6";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: <BiHomeAlt />,
    link: "/affiliate/dashboard/overview",
  },
  {
    id: uuid(),
    title: "My Users",
    icon: <LuUser />,
    link: "/affiliate/dashboard/my-user",
  },

  {
    id: uuid(),
    title: "Payment",
    icon: <BiDollar />,
    children: [
      {
        id: uuid(),
        link: "/affiliate/dashboard/earning",
        name: "Earning",
      },
      {
        id: uuid(),
        link: "/affiliate/dashboard/Withdraw",
        name: "Withdraw",
      },
    ],
  },

  {
    id: uuid(),
    title: "Profile",
    icon: <ImProfile />,
    link: "/affiliate/dashboard/profile",
  },
  {
    id: uuid(),
    title: "Onboarding",
    icon: <FaPersonChalkboard />,
    link: "/affiliate/dashboard/onboard",
  },
];

export default DashboardMenu;
