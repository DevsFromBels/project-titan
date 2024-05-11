import Logo from "@/../public/Logo.svg";
import { QRCode } from "react-qrcode-logo";

interface IQRCodeSignIn {
  url: string;
  theme: string | undefined;
}

const QRCodeSignIn = ({ url, theme }: IQRCodeSignIn) => {
  return (
    <div className="lg:flex lg:flex-col lg:text-center lg:gap-5 hidden">
      <QRCode
        value={url}
        bgColor={theme === "dark" ? "#020817" : "#ffffff"}
        fgColor={theme === "dark" ? "#ffffff" : "#020817"}
        logoPadding={0.1}
        logoWidth={40}
        logoHeight={40}
        logoOpacity={1}
        qrStyle="dots"
        eyeRadius={[3, 3, 3, 3]}
        logoImage={Logo.src}
      />
      <h1>SignIn With Mobile QRCode</h1>
    </div>
  );
};

export default QRCodeSignIn;
