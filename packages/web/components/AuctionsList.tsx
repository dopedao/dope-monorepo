import { useRouter } from "next/router";
import { TokenThumbnail } from "./CustomThumbnail";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tokens &&
        tokens.map((token) => {
          // const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return <TokenThumbnail token={token} />;
        })}
    </div>
  );
};
