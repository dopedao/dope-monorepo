import { HustlerCustomization, ZOOM_WINDOWS } from 'utils/HustlerConfig';
import { ReceiptItem } from './ReceiptItem';
import { Box, Image } from '@chakra-ui/react';
import RenderFromDopeId from 'features/hustlers/components/RenderFromDopeId';

const ReceiptItemHustler = ({
  hustlerConfig,
  hideUnderline,
}: {
  hustlerConfig: HustlerCustomization;
  hideUnderline?: boolean;
}) => {
  return (
    <ReceiptItem hideUnderline={hideUnderline}>
      <Box>
        <Box border="2px solid var(--gray-100)" overflow="hidden" borderRadius="4px">
          <RenderFromDopeId
            bgColor={hustlerConfig.bgColor}
            body={hustlerConfig.body}
            facialHair={hustlerConfig.facialHair}
            hair={hustlerConfig.hair}
            id={hustlerConfig.dopeId}
            name={hustlerConfig.name}
            renderName={hustlerConfig.renderName}
            sex={hustlerConfig.sex}
            textColor={hustlerConfig.textColor}
            zoomWindow={ZOOM_WINDOWS[1]}
            showVehicle={false}
          />
        </Box>
      </Box>
      <Box flex="1">{hustlerConfig.name}</Box>
      <Box>
        <Image src="/images/icon/optimism.svg" width="16px" alt="This asset lives on Optimism" />
      </Box>
    </ReceiptItem>
  );
};

export default ReceiptItemHustler;
