import { useQuery } from "@apollo/client";
import { GET_USER } from "@/features/graphql/actions/get-user.action";
import { IGetUser } from "../types/auth.types";

const useUser = () => {
  const { loading, data } = useQuery<IGetUser>(GET_USER);

  return {
    loading,
    user: data?.getLoggedInUser.user,
  };
};

export default useUser;
