import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="home min-h-screen flex flex-col items-center justify-center">
      <div className="w-full text-center">
        <div className="py-6 px-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={session?.user?.image!}
          alt={`${session?.user?.name} image`}
          className="rounded-full h-40 w-40"
        />
      </div>
      <div className="text-center mt-12">
        <h3 className="text-4xl font-semibold mb-2">
          User name:&nbsp;{session?.user?.name}
        </h3>
        <div className="text-sm mb-2 font-bold">
          User email: {session?.user?.email}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
