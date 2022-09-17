import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import { RouteFactory } from "../router/route-factory";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../components/Elements/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Digital Story - Home</title>
      </Head>

      <div className="h-screen w-screen px-8 sm:px-24 text-light flex flex-col py-12">
        <header className="flex justify-between items-center ">
          <div className="w-40 sm:w-44">
            <img src="/digital-story.svg" alt="digital-story" />
          </div>

          <nav className="mr-24 hidden md:block">
            <ul className="flex items-center text-sm capitalize space-x-6 cursor-pointer">
              <li className="hover:underline">about</li>
              <li className="hover:underline">blog</li>
              <li className="hover:underline">learn</li>
            </ul>
          </nav>

          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-light rounded-full hidden md:block">
            <Image
              src="/john.jpg"
              alt="profile-image"
              className="object-cover object-right rounded-full cursor-pointer"
              priority={true}
              width="100%"
              height="100%"
              layout="responsive"
            />
          </div>
          <GiHamburgerMenu size="1.5em" className="block md:hidden" />
        </header>

        <main className="space-y-12 mt-12 md:mt-0 md:flex flex-1">
          <section className="md:w-3/5 space-y-10 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="font-bold text-light leading-tight text-4xl lg:text-5xl">
                Be in charge of your <br className="hidden md:block" /> Digital
                Identity
              </h1>
              <p className="text-xs opacity-40 text-light hidden md:block lg:text-sm">
                Start managing your digital wallet with Digital Story, the first
                wallet <br className="hidden md:block" />
                that lets you control your data.
              </p>
            </div>

            <Link href={RouteFactory.Dashboard.Index}>
              <Button
                className="shadow-lg font-light hidden md:block"
                size="md"
              >
                Dashboard
              </Button>
            </Link>
          </section>

          <section className="flex flex-col justify-center md:h-full md:w-2/5">
            <Image
              src="/digital-story-phone.svg"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </section>

          <section className="space-y-8 block md:hidden">
            <p className="text-sm opacity-40 text-light">
              Start managing your digital wallet with Digital Story, the first
              wallet <br className="md:block hidden" />
              that lets you control your data.
            </p>

            <Link href={RouteFactory.Dashboard.Index}>
              <Button
                className="shadow-lg font-light hidden md:block"
                size="md"
              >
                Dashboard
              </Button>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
