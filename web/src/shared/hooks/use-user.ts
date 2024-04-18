import { useQuery } from "@apollo/client";
import { GET_USER, IGetUser } from "@/shared/graphql/actions/get-user.action";

const useUser = () => {
  const { loading,  data } = useQuery<IGetUser>(GET_USER);

  return {
    loading,
    user: data?.getLoggedInUser.user,
  }
};
export default useUser;