import { useQuery } from "@apollo/client";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IGetSettings } from "../types/settings.types";

const useSettings = () => {
  const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS);

  return {
    loading,
    data: data?.getSettings,
  };
};

export default useSettings;
