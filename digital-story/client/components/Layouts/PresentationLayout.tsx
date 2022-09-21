import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { RouteFactory } from "../../router/route-factory";
import { DashboardLayout } from "./DashboardLayout";

type PresentationLayoutProps = {
  children: React.ReactNode;
};

export const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  const router = useRouter();

  return (
    <div className="font-light">
      <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
        Presentations
      </h1>

      <ul className="flex space-x-2 text-light py-6 text-md lg:text-lg">
        <li
          className={twMerge(
            router.pathname !== RouteFactory.Dashboard.Presentations.Verifier
              ? "opacity-60 hover:opacity-80 transition-all duration-200"
              : "opacity-95"
          )}
        >
          <Link href={RouteFactory.Dashboard.Presentations.Verifier} passHref>
            <a>Verifier</a>
          </Link>
        </li>
        <span className="opacity-60">/</span>
        <li
          className={twMerge(
            router.pathname !== RouteFactory.Dashboard.Presentations.Prover
              ? "opacity-60 hover:opacity-80 transition-all duration-200"
              : "opacity-95"
          )}
        >
          <Link href={RouteFactory.Dashboard.Presentations.Prover} passHref>
            <a>Prover</a>
          </Link>
        </li>
      </ul>

      {children}
    </div>
  );
};
