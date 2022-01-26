import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Hustler } from 'generated/graphql';
import {
  PanelFooter,
  ControlsBody,
  ControlsWrapper,
  LineKey,
  LineValue,
  LineContent,
} from 'features/hustlers/components/HustlerInformation/styles';
import { Button } from '@chakra-ui/react';

type BulletProps = {
  color?: string;
};

const Bullet = ({ color }: BulletProps) => (
  <div
    css={css`
      height: 10px;
      width: 10px;
      min-width: 10px;
      border-radius: 50%;
      margin-right: 8px;
      background-color: ${color};
      // necessary when 'align-items: top' to ensure proper alignment with text
      margin-top: 4px;
    `}
  ></div>
);

const formatGears = ({
  clothes,
  drug,
  ring,
  vehicle,
  weapon,
  waist,
  neck,
  hand,
  foot,
}: Hustler) => [
  {
    key: 'Weapon:',
    name: weapon?.name,
    color: weapon && DopeLegendColors[weapon.tier],
  },
  {
    key: 'Vehicule:',
    name: vehicle?.name,
    color: vehicle && DopeLegendColors[vehicle.tier],
  },
  {
    key: 'Drug:',
    name: drug?.name,
    color: drug && DopeLegendColors[drug.tier],
  },
  {
    key: 'Clothes:',
    name: clothes?.name,
    color: clothes && DopeLegendColors[clothes?.tier],
  },
  {
    key: 'Hands:',
    name: hand?.name,
    color: hand && DopeLegendColors[hand?.tier],
  },
  {
    key: 'Feet:',
    name: foot?.name,
    color: foot && DopeLegendColors[foot?.tier],
  },
  {
    key: 'Neck:',
    name: neck?.name,
    color: neck && DopeLegendColors[neck?.tier],
  },
  {
    key: 'Ring:',
    name: ring?.name,
    color: ring && DopeLegendColors[ring?.tier],
  },
  {
    key: 'Waist:',
    name: waist?.name,
    color: waist && DopeLegendColors[waist?.tier],
  },
];

const HustlerGear = (props: Hustler) => (
  <ControlsWrapper>
    <ControlsBody>
      {formatGears(props).map((gear, index) => (
        <LineContent
          key={gear.key}
          css={css`
            background-color: ${index % 2 !== 0 ? '#EDEFEE' : 'inherit'};
          `}
        >
          <LineKey>{gear.key}</LineKey>
          <LineValue>
            {gear?.color && <Bullet color={gear.color} />}
            <div>{gear.name}</div>
          </LineValue>
        </LineContent>
      ))}
    </ControlsBody>
    <PanelFooter>
      <Button type="button" loadingText="Processing...">
        Cancel
      </Button>

      <Button type="button" variant="primary" loadingText="Processing...">
        Save changes
      </Button>
    </PanelFooter>
  </ControlsWrapper>
);

export default HustlerGear;
