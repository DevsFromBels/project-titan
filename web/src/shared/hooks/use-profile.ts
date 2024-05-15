import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/features/graphql/actions/profile/getProfile.action";

const useProfile = ({ name } : { name: string }) => {
  const { loading,  data, error } = useQuery<IUseProfile>(GET_PROFILE, {
    variables: {
      userName: name
    }
  });

  return {
    loading,
    profile: data?.profile,
    error
  }
};
export default useProfile;

export type IUseProfile = {
    profile: {
      user: {
        id: string
        name: string
        email: string
        role: string
        createdAt: string
      }
      info: string
      isPublic: boolean
      avatar_url: string
    }
}