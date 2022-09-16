import { RouteFactory } from "../../router/route-factory";
import {
  RiDashboard3Fill,
  RiMoonClearFill,
  RiNotification4Fill,
  RiCodeFill,
} from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbPlugConnected, TbCertificate } from "react-icons/tb";
import { BsFillGearFill, BsPlusLg } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { getTailwindMd } from "../../utils/tailwind";
import Link from "next/link";

const NavLink = ({
  label,
  path = "#",
  icon: Icon,
}: {
  label: string;
  path?: string;
  icon: IconType;
}) => {
  const router = useRouter();

  return (
    <li className="flex items-center space-x-2 cursor-pointer focus:underline hover:underline">
      <Link href={path}>
        <div
          className={twMerge(
            "flex items-center space-x-2",
            path === router.pathname && "underline"
          )}
        >
          <Icon size="1.5em" />
          <span className="font-light capitalize">{label}</span>
        </div>
      </Link>
    </li>
  );
};

const DashboardToolbox = ({ className }: { className?: string }) => (
  <ul className={twMerge("flex items-center space-x-6", className)}>
    <li className="cursor-pointer">
      <RiMoonClearFill size="1.4em" />
    </li>
    <li className="cursor-pointer">
      <RiNotification4Fill size="1.4em" />
    </li>
    <li className="cursor-pointer">
      <BsFillGearFill size="1.4em" />
    </li>
  </ul>
);

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="h-screen w-screen bg-dark text-white flex flex-col md:flex-row">
      <div
        className="px-12 py-10 cursor-pointer block relative md:hidden"
        onClick={() => setVisible((prev) => !prev)}
      >
        <GiHamburgerMenu size="1.5em" />
      </div>

      <aside
        className={twMerge(
          "w-64 h-full bg-dark-overlay hidden md:block z-10",
          visible && getTailwindMd() && "block absolute inset-y-0"
        )}
      >
        <div className="p-10 px-12 text-center h-full flex flex-col">
          <div
            className="cursor-pointer mb-8 flex justify-end md:hidden"
            onClick={() => setVisible((prev) => !prev)}
          >
            <BsPlusLg size="1.5em" className="rotate-45" />
          </div>

          <h2 className="text-white text-xl space-x-2">
            <span>Uni.</span>
            <span className="font-bold text-dark-accent">Thessaly</span>
          </h2>

          <div className="mt-4 mb-8 w-full h-px bg-white opacity-60 md:mb-20" />

          <nav className="text-left text-xs space-y-6 flex-1">
            <h6 className="text-white uppercase font-bold opacity-40">main</h6>
            <ul className="space-y-4">
              <NavLink
                label="Dashboard"
                path={RouteFactory.Dashboard.Index}
                icon={RiDashboard3Fill}
              />
              <NavLink
                label="Connections"
                path={RouteFactory.Dashboard.Connections}
                icon={TbPlugConnected}
              />
              <NavLink
                label="Credentials"
                path={RouteFactory.Dashboard.Credentials}
                icon={TbCertificate}
              />
              <NavLink label="Schema" icon={HiOutlineDocumentText} />
              <NavLink label="Cred. Definition" icon={RiCodeFill} />
            </ul>
          </nav>

          <DashboardToolbox className="pb-6 m-auto md:hidden" />

          <h6 className="text-white uppercase text-xs text-right font-bold opacity-40">
            beta
          </h6>
        </div>
      </aside>

      <section className="h-full w-full flex flex-col z-0">
        <div className="px-10 py-12 justify-end flex-initial hidden md:flex">
          <DashboardToolbox />
        </div>

        <div className="flex-1 h-full w-full overflow-scroll hide-scrollbar">
          <main className="h-full px-12 py-4 md:py-0">{children}</main>
        </div>
      </section>
    </section>
  );
};
