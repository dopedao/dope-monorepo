import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HustlerQuery } from 'generated/graphql';
import { getRandomHustler, HustlerCustomization, ZOOM_WINDOWS } from 'utils/HustlerConfig';
import { getHustlerRles } from 'hooks/render';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import LoadingBlock from 'components/LoadingBlock';
import { HustlerHustlerSex } from 'generated/graphql';

const HustlerEdit = ({ data }: { data: HustlerQuery }) => {
  const [hustler, setHustler] = useState(data?.hustlers.edges?.[0]?.node);
  const [itemRles, setItemRles] = useState<string[] | undefined>([]);
  const router = useRouter();
  const hustlerId = router.query.id;
  const [isLoading, setLoading] = useState(true);
  const [ogTitle, setOgTitle] = useState('');
  const [hustlerConfig, setHustlerConfig] = useState<HustlerCustomization>(getRandomHustler({}));

  useEffect(() => {
    if (!hustler) {
      return;
    }
    if (hustlerConfig.sex === 'female') {
      hustler.sex = HustlerHustlerSex.Female;
    } else {
      hustler.sex = HustlerHustlerSex.Male;
    }
    setHustler(hustler);
    setItemRles(getHustlerRles(hustler));
  }, [hustler, hustlerConfig.sex]);

  useEffect(() => {
    if (!hustler) {
      // error occured
      return;
    }
    console.log('rendering hustlerEdit');

    setHustlerConfig(
      getRandomHustler({
        renderName: Boolean(hustler.name && hustler.name.length > 0),
        name: hustler.name ? hustler.name : '',
        dopeId: hustler.id,
        sex: hustler.sex === 'MALE' ? 'male' : 'female',
        textColor: hustler.color ? `#${hustler.color.slice(0, -2)}` : undefined,
        bgColor: hustler.background ? `#${hustler.background.slice(0, -2)}` : undefined,
        body: hustler.body?.id ? parseInt(hustler.body.id.split('-')[2]) : undefined,
        hair: hustler.hair?.id ? parseInt(hustler.hair.id.split('-')[2]) : undefined,
        facialHair: hustler.beard?.id ? parseInt(hustler.beard.id.split('-')[2]) : undefined,
        zoomWindow: ZOOM_WINDOWS[2],
        showVehicle: true,
      }),
    );
    setOgTitle(hustler.title || '');
    setLoading(false);
  }, [hustler]);

  return isLoading ? (
    <LoadingBlock color="white" maxRows={10} />
  ) : (
    <>
      <ConfigureHustler
        config={hustlerConfig}
        setHustlerConfig={setHustlerConfig}
        ogTitle={ogTitle}
        itemRles={itemRles}
        hustlerId={hustlerId?.toString()}
        isCustomize
      />
    </>
  );
};
export default HustlerEdit;
