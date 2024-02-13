import { useEffect, useState } from "react";
import { useSwapMeet, useInitiator } from "hooks/contracts";

export const useIsGearClaimed = (id: number) => {
  const init = useInitiator();
  const [isClaimed, setIsClaimed] = useState(true);

  useEffect(() => {
    init.isOpened(id).then((res) => {
      setIsClaimed(res);
    });
  }, [init, id]);

  // Rest of the hook logic...
  return isClaimed;
};