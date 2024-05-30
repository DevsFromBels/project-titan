"use client";
import { GET_PROFILE } from "@/features/graphql/actions/profile/getProfile.action";
import { IUseProfile } from "@/shared/hooks/use-profile";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import {
  ProfileMainBlockWidget,
  ProfileStatusWidget,
} from "@/widgets/profile/index";
import { useQuery } from "@apollo/client";
import { ProfileSkeleton } from "@/shared/components/maleculas/skeletons/profile-skeleton";
import useUser from "@/shared/hooks/use-user";
import ProfileMarketSkeleton from "@/shared/components/maleculas/skeletons/profile-market-skeleton";

const ProfileMarketContent = dynamic(
  () => import("@/widgets/profile/profile-market-content"),
  { ssr: false, loading: () => <ProfileMarketSkeleton /> }
);

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id.toLowerCase();

  try {
    const { loading, data } = useQuery<IUseProfile>(GET_PROFILE, {
      variables: {
        userName: id,
      },
    });

    const { user, loading: userLoading } = useUser();

    if (loading || userLoading) {
      return <ProfileSkeleton />;
    }

    if (!data?.profile.user.id) {
      return notFound();
    }

    return (
      <>
        <div className="pb-[200px]">
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
          <ProfileMarketContent user_id={data.profile.user.id} />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
