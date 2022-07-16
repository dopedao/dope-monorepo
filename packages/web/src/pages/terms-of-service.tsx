import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import DesktopWindow from 'components/DesktopWindow';
import DesktopIconList from 'components/DesktopIconList';
import Dialog from 'components/Dialog';
import Head from 'components/Head';

const title = 'TERMS OF SERVICE';
const dialogCss = css`
  background: #000 url('/images/tile/brick-black.png') center / 200px repeat fixed;
  button {
    display: block;
    width: 100%;
    margin-bottom: 8px;
  }
`;

const TosWrapper = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

export default function Market() {
  const router = useRouter();

  const handleAgree = () => {
    window.localStorage.setItem('tos', 'true');
    router.replace('/swap-meet');
  };

  const handleDisagree = () => {
    router.replace('/');
  };

  return (<>
    <DesktopIconList />
    <DesktopWindow title={title}>
      <Head title="TOS" />
      <Dialog css={dialogCss} title={title} icon="stop-hand">
        <TosWrapper>
          <p>
            {`To the maximum extent permitted by applicable law, and except as expressly set forth
            herein, this software is provided on "as is" basis.`}
          </p>
          <p>
            The DOPE DAO does not make and specifically disclaims, all express and implied
            warranties of every kind relating to the software and/or use of the software.
          </p>
          <p>
            This includes, without limitation, actual and implied warranties of merchantability and
            fitness for a particular purpose, and non-infringement, as well as any warranties that
            the software or any elements thereof will achieve a particular result, or will be
            uninterrupted or error-free.
          </p>
        </TosWrapper>
        <Button onClick={() => handleAgree()}>Agree</Button>
        <Button onClick={() => handleDisagree()}>Disagree</Button>
      </Dialog>
    </DesktopWindow>
  </>);
}
