import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useHustler, useSwapMeet } from 'hooks/contracts';

interface Metadata {
  image: string;
}

const Render = ({ itemIds }: { itemIds: BigNumber[] }) => {
  const [json, setJson] = useState<Metadata>();
  const [itemRles, setItemRles] = useState<string[]>([]);
  const [bodyRles, setBodyRles] = useState<string[]>([]);

  const swapmeet = useSwapMeet();
  const hustlers = useHustler();

  useEffect(() => {
    if (swapmeet) {
      Promise.all(itemIds.map(id => swapmeet.tokenRle(id, 0))).then(setItemRles);
    }
  }, [itemIds, swapmeet]);

  useEffect(() => {
    if (hustlers) {
      Promise.all([hustlers.bodyRle(0, 0), hustlers.bodyRle(2, 0)]).then(setBodyRles);
    }
  }, [hustlers]);

  useEffect(() => {
    if (hustlers && bodyRles.length > 0 && itemRles.length > 0) {
      hustlers
        .render('', '', 64, '0xb6ccc3ff', '0x202221ff', [0, 0, 0, 0], [...bodyRles, ...itemRles])
        .then(meta => {
          meta = meta.replace('data:application/json;base64,', '');
          meta = Buffer.from(meta, 'base64').toString();
          meta = meta.replace(', "attributes":', '');
          const decoded = JSON.parse(meta);
          setJson(decoded as Metadata);
        });
    }
  }, [hustlers, itemRles, bodyRles]);

  return (
    <div
      css={css`
        display: flex;
        align-self: center;
        justify-content: center;
      `}
    >
      {json && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          css={css`
            width: 640px;
            height: 640px;
          `}
          alt=""
          src={json.image}
        />
      )}
    </div>
  );
};

export default Render;
