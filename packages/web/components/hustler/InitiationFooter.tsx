import PanelFooter from '../PanelFooter';

const beforeLaunch = true;
const hasDopeNft = false;

const CountdownTimer = () => {
  return <>
    Counting down
  </>;
}

const NoDopeMessage = () => {
  return <>
    Buy some dope
  </>;
}

const MintHustlerControls = () => {
  return <>
    Customize and mint hustler
  </>;
}

const InitiationFooter = () => {
  let footerContent;

  if (beforeLaunch) {
    footerContent = <CountdownTimer />;
  } else if (hasDopeNft) {
    footerContent = <MintHustlerControls />;    
  } else {
    footerContent = <NoDopeMessage />;
  }

  return (    
    <PanelFooter>
      { footerContent } 
    </PanelFooter>
  )
}

export default InitiationFooter;
