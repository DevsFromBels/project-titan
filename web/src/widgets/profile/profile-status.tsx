import { DateOptionsWithMonth } from "@/shared/constants/date-output";
import {getLocale, getTranslations} from 'next-intl/server';

interface IProfileStatusWidget {
  info: string;
  registerDateString: string;
}

const ProfileStatusWidget = async ({
  info,
  registerDateString,
}: IProfileStatusWidget) => {
  const locale = await getLocale();
  const t = await getTranslations('profile');

  const languages = {
    ru: "ru-RU",
    en: "en-EU"
  }

  const registerDate = new Date(registerDateString).toLocaleString(
    languages[locale as keyof typeof languages ?? "en"],
    DateOptionsWithMonth
  );

  return (
    <div className="w-[98%] m-auto my-1 p-4 flex flex-col gap-1 bg-background border rounded-xl">
      {info && (
        <>
          <p className="text-md">{t('about')}</p>
          <p className="text-lg">{info}</p>
        </>
      )}
      <p className="text-md">{t('registerAt')}</p>
      <time className="text-lg" dateTime={registerDateString}>
        {registerDate}
      </time>
    </div>
  );
};

export default ProfileStatusWidget;
