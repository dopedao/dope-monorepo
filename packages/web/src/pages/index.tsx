import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { PageWrapper } from 'ui/styles/components';
import Head from 'components/Head';
import AboutWindow from 'features/about/components/AboutWindow';
import Cookies from 'js-cookie';
import DesktopIconList from 'components/DesktopIconList';
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';
import { isTouchDevice } from 'utils/utils';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = () => {
  const [aboutWindowVisible, setAboutWindowVisible] = useState(false);

  useEffect(() => {
    // Read the cookie value when the component mounts
    setAboutWindowVisible(Cookies.get('aboutWindowVisible') !== 'false');
  }, []);

  useEffect(() => {
    // Write the cookie value when aboutWindowVisible changes
    Cookies.set('aboutWindowVisible', aboutWindowVisible ? 'true' : 'false', { expires: 3 });
  }, [aboutWindowVisible]);

  return (
    <IndexWrapper>
      <Head />
      <DesktopIconList />
      {aboutWindowVisible && (
        <AboutWindow posX={64} posY={-16} onClose={() => setAboutWindowVisible(false)} />
      )}
      {!isTouchDevice() && <StickyNoteHustlerMint />}
    </IndexWrapper>
  );
};
export default IndexPage;
