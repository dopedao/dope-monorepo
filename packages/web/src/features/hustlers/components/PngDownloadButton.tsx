import { Button, Image } from '@chakra-ui/react';
import { Hustler } from '@dopewars/contracts';
import svgtopng from 'features/hustlers/components/ConfigureHustler/svg-to-png';
import { HustlerCustomization } from 'utils/HustlerConfig';

// Intended to be used anywhere svg-builder.ts has rendered
// a hustler.
const PngDownloadButton = ({hustlerConfig}: {hustlerConfig: HustlerCustomization}) => {
  return(
    <Button
    onClick={() => {
      svgtopng(
        'svg#dynamicBuiltSvg',
        `dope-wars-hustler-${hustlerConfig.name?.replace(' ', '_')}`,
        hustlerConfig.bgColor,
      );
    }}
  >
    <Image src="/images/icon/download.svg" alt="Download" />
  </Button>
  );
}
export default PngDownloadButton;
