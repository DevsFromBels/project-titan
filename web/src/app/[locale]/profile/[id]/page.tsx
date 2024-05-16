"use client";
import { GET_PROFILE } from "@/features/graphql/actions/profile/getProfile.action";
import { IUseProfile } from "@/shared/hooks/use-profile";
import { notFound } from "next/navigation";

import {
  ProfileMainBlockWidget,
  ProfileStatusWidget,
} from "@/widgets/profile/index";
import { useQuery } from "@apollo/client";
import { ProfileSkeleton } from "@/shared/components/maleculas/skeletons/profile-skeleton";
import useUser from "@/shared/hooks/use-user";

// export function generateViewport() {
//   return {
//     themeColor: "#222",
//   };
// }

// export function generateMetadata({ params }: { params: { id: string } }) {
//   const id = params.id.toLowerCase();

//   try {
//     const { data } = useQuery<IUseProfile>(GET_PROFILE, {
//       variables: {
//         userName: id,
//         timestamp: Date.now(),
//       },
//     });

//     const userId = data?.profile.user.id;

//     const title = userId
//       ? `${data.profile.user.name}'s profile`
//       : "User not found";

//     const url = userId
//       ? `https://titanproject.top/${userId}`
//       : "https://titanproject.top/";

//     return {
//       title,

//       openGraph: {
//         description: data?.profile.info,
//         images: "https://titanproject.top/cat.jpeg",
//         url,
//         type: "profile",
//         siteName: "Titan",
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return notFound();
//   }
// }

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id.toLowerCase();

  try {
    const { loading, data } = useQuery<IUseProfile>(GET_PROFILE, {
      variables: {
        userName: id,
      },
    });

    const {user, loading: userLoading} = useUser();

    if (loading || userLoading) {
      return <ProfileSkeleton />;
    }

    if (!data?.profile.user.id) {
      return notFound();
    }

    return (
      <>
        <div>
          <ProfileMainBlockWidget
            image={data.profile.avatar_url}
            username={data.profile.user.name}
            id={data.profile.user.id}
            currentUser={user}
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
