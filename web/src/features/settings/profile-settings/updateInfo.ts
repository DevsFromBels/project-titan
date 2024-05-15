import { USER_UPDATE_SETTINGS } from "@/features/graphql/actions/settings/user-update-info";
import { ProfileSettings } from "@/shared/types/settings.types";
import { useQuery } from "@apollo/client";

export function updateInfo(newInfo: string): void {
  useQuery<ProfileSettings>(USER_UPDATE_SETTINGS, {
    variables: {
      newInfo,
    },
  });
}
