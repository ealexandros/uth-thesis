import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/authentication";
import { RouteFactory } from "../router/route-factory";

const Login: NextPage = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const onSumbit = (event: FormEvent) => {
    event.preventDefault();

    if (!username) {
      setError("Empty value");
      return;
    }

    setUser({
      username,
    });
    router.push(RouteFactory.Invite);
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex">
      <section className="flex relative w-full">
        <div className="absolute top-0 bottom-3/4 w-4 bg-primary rounded-br-md md:hidden" />

        <div className="mt-24 mx-auto w-4/6 space-y-16 lg:space-y-28 2xl:space-y-36 md:w-3/6 md:m-auto">
          <div className="w-5/6 lg:w-4/6 m-auto">
            <Image
              src="/assets/uth-logo-medium.png"
              alt="uth-logo"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <form onSubmit={onSumbit} className="space-y-8">
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <label htmlFor="username" className="font-light">
                  Username
                </label>
                <span className="text-xs text-primary">{error}</span>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Type.."
                onFocus={() => setError("")}
                className="border-2 px-2 py-1 border-gray-400 rounded-md"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
              <p className="underline opacity-50 cursor-pointer">
                Did you forget your username ?
              </p>
            </div>

            <button
              type="submit"
              className="bg-primary flex items-center space-x-2 text-white rounded-md shadow-md text-sm font-light py-2 px-6 w-full md:w-auto"
            >
              Login
            </button>
          </form>
        </div>

        <div className="absolute w-36 h-20 bottom-4 right-6 md:hidden">
          <Image
            src="/assets/digital-story.svg"
            alt="digital-story-logo"
            className="object-contain "
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </section>

      <section className="w-full h-full relative bg-light hidden md:flex">
        <div className="absolute top-0 bottom-3/4 w-4 bg-primary rounded-br-md" />

        <div className="m-auto w-[80%]">
          <h2 className="text-center opacity-80 text-2xl 2xl:text-4xl font-light">
            Take place in our self sovereign <br /> identity community
          </h2>
        </div>

        <div className="absolute bottom-6 right-6 w-36 h-20">
          <Image
            src="/assets/digital-story.svg"
            alt="digital-story-logo"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </section>
    </main>
  );
};

export default Login;
