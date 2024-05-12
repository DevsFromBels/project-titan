import { GET_PROFILE } from "@/features/graphql/actions/profile/getProfile.action";
import { getClient } from "@/features/graphql/server/client";
import { IUseProfile } from "@/shared/hooks/use-profile";
import { notFound } from "next/navigation";

import {
  ProfileMainBlockWidget,
  ProfileStatusWidget,
} from "@/widgets/profile/index";
import { i18nLocales } from "@/shared/constants/i18n-locales";

const client = getClient();

export function generateViewport() {
  return {
    themeColor: "#222",
  };
}

export function generateStaticParams() {
  return i18nLocales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id.toLowerCase();

  try {
    const { data } = await client.query<IUseProfile>({
      query: GET_PROFILE,
      variables: {
        userName: id,
      },
    });

    const userId = data.profile.user.id;

    const title = userId
      ? `${data.profile.user.name}'s profile`
      : "User not found";

    const url = userId
      ? `https://titanproject.top/${userId}`
      : "https://titanproject.top/";

    return {
      title,
      
      openGraph: {
        description: data.profile.info,
        images: "https://titanproject.top/cat.jpeg",
        url,
        type: "profile",
        siteName: "Titan"
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

    const image =
      id === "sh1woo"
        ? "https://titanproject.top/sh1woo.jpeg"
        : "https://titanproject.top/cat.jpeg";

    return (
      <>
        <div>
          <ProfileMainBlockWidget
            id={data.profile.user.id}
            username={data.profile.user.name}
          />
          <ProfileStatusWidget
            info={data.profile.info}
            registerDateString={data.profile.user.createdAt}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
