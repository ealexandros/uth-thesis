import { LogoutOutlined } from "@ant-design/icons";
import { message } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../contexts/authentication";
import { Authorization } from "../lib/authorization";

const Invite: NextPage = () => {
  const { user } = useAuth();
  const connectionToken =
    "Loremipsumdolorsitametconsecteturadipisicingelit.Accusamussunttemporaquidemnullavoluptas,reiciendissuscipiteullamfacilisofficiisconsequatursoluta,eteumipsamquisquisquamaliquammagnidistinctio?";

  const copyToken = () => {
    message.info({
      duration: 0.6,
      content: "Copied",
    });
    navigator.clipboard.writeText(connectionToken);
  };

  return (
    <Authorization mustAuth={true}>
      <Head>
        <title>University of Thessaly - Invitation Code</title>
      </Head>

      <div className="h-screen w-screen px-12 flex flex-col overflow-hidden">
        <header className="py-4">
          <a
            href="/"
            className="flex items-center space-x-1 text-black hover:text-primary duration-100"
          >
            <LogoutOutlined />
            <span>Logout</span>
          </a>
        </header>

        <main className="flex flex-1 items-center text-center">
          <section className="w-full space-y-12">
            <h1 className="text-4xl">
              Hey <span className="capitalize">{user?.username}</span> 👋
            </h1>

            <div className="flex w-[18em] h-[18em] m-auto border-4 border-primary rounded-lg border-dashed">
              <QRCodeSVG
                value={connectionToken}
                className="m-auto w-full h-full p-8"
              />
            </div>

            <p
              onClick={copyToken}
              className="m-auto break-words w-9/12 md:w-[26em] text-lg cursor-pointer select-none text-center"
              title="Click to copy"
            >
              {connectionToken}
            </p>
          </section>
        </main>

        <footer className="flex justify-between items-center py-12 h-12">
          <div className="w-48">
            <Image
              src="/digital-story.svg"
              alt="digital-story-logo"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="w-16">
            <Image
              src="/uth-logo.png"
              alt="digital-story-logo"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </footer>
      </div>
    </Authorization>
  );
};

export default Invite;
