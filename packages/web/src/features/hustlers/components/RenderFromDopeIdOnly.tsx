import { useMemo } from 'react';
import RenderFromDopeId from './RenderFromDopeId';
import { getRandomHustler } from 'utils/HustlerConfig';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';

const RenderFromDopeIdOnly = ({ id }: { id: string }) => {
  const hustlerConfig = useMemo(() => getRandomHustler({ dopeId: id }), [id]);
  return (
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
      zoomWindow={ZOOM_WINDOWS[3]}
      showVehicle={true}
    />
  );
};
export default RenderFromDopeIdOnly;
