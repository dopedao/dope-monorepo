import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Image } from "@chakra-ui/react";
import PanelBody from "components/PanelBody";
import PanelContainer from "components/PanelContainer";
import PanelFooter from "components/PanelFooter";

const HongbaoPanel = () => {
  const numEnvelopes = 7;

  return(
    <PanelContainer>
      <PanelBody>
        <Image src="/images/lunar_new_year_2022/hongbao-with-bg.png" alt="A surprise awaits you" />
      </PanelBody>
      <PanelFooter>
        <Button variant="cny" disabled>
          Open { numEnvelopes } Envelopes
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default HongbaoPanel;
