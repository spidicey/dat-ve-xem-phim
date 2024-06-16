import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import {
  MdAttachMoney,
  MdHelpCenter,
  MdLogout,
  MdMovie,
  MdOutlineAdminPanelSettings,
  MdOutlineSettings,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import { getSession, signOut } from "next-auth/react";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Quản trị viên",
        path: "/dashboard/admins",
        icon: <MdOutlineAdminPanelSettings />,
      },
      {
        title: "Khách hàng",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Phim",
        path: "/dashboard/movie",
        icon: <MdMovie />,
      },
      {
        title: "Suất chiếu",
        path: "/dashboard/suatchieu",
        icon: <MdAttachMoney />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await getSession();
  // @ts-ignore
  console.log(session);
  // //@ts-ignore
  // if (session?.user?.role !== "admin") {
  //   return <div>ko co quyen</div>;
  // }
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <div className="sticky top-10">
      <div className="flex items-center space-x-5 mb-5">
        <Image
          className="rounded-full object-cover"
          src={"/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          {/* @ts-ignore */}
          <span className="font-medium">{session?.user.username}</span>
          <span className="text-xs text-[var(--textSoft)]">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-[var(--textSoft)] font-bold text-sm my-2">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button
        onClick={() => signOut()}
        className="flex items-center space-x-2 py-5 my-1 w-full text-white rounded-lg bg-none border-none cursor-pointer hover:bg-[#2e374a]"
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
