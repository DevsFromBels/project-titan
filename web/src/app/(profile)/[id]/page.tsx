import { GET_PROFILE } from "@/features/graphql/client/actions/profile/getProfile.action";
import { getClient } from "@/features/graphql/server/client";
import { IUseProfile } from "@/shared/hooks/use-profile";
import { notFound } from 'next/navigation'
import Image from "next/image";

const client = getClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id.toLowerCase();

  try {
    const { data } = await client.query<IUseProfile>({
      query: GET_PROFILE,
      variables: {
        userName: id,
      },
    });

    if (!data.profile.user.id) {
      return notFound();
    }

    const userId = data.profile.user.id;

    return {
      title: `${data.profile.user.name}'s profile`,
      openGraph: {
        description: data.profile.info,
        images: "https://titanproject.top/cat.jpeg",
        url: `https://titanproject.top/${userId}`,
      },
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id.toLowerCase();

  try {
    const { data } = await client.query<IUseProfile>({
      query: GET_PROFILE,
      variables: {
        userName: id,
      },
    });

    if (!data.profile.user.id) {
      return notFound();
    }

    return (
      <>
        <div className="w-[100vw]">
          <div className="relative flex flex-col justify-center items-center h-[200px] gap-2 bg-[#b284be]">
            <div className="blur-[50px] w-[80px] h-[80px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <div className="relative relative z-10 select-none">
              <Image
                src="https://titanproject.top/cat.jpeg"
                className="rounded-full shadow-lg shadow-cyan-500/10 border border-slate-100"
                width={100}
                height={100}
                alt="profile image"
                draggable={false}
                priority
              />
            </div>
            <h1 className="font-medium text-2xl">{data.profile.user.name}</h1>
          </div>
          <div>
            <p>about</p>
            <p>{data.profile.info}</p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
