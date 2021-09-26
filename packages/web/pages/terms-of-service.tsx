import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import DesktopWindow from '../components/DesktopWindow';
import Dialog, { DialogProps } from '../components/Dialog';
import Head from '../components/Head';

const title = 'TERMS OF SERVICE';
const dialogCss = css`
  background: #000 url('/images/tile/brick-black.png') center / 200px repeat fixed;
  button {
    display: block;
    width: 100%;
    margin-bottom: 8px;
  }
`;

export default function Market() {
  const router = useRouter();

  const handleAgree = () => {
    router.replace('/loot');
  };
  const handleDisagree = () => {
    router.replace('/');
  };
  return (
    <DesktopWindow title={title}>
      <Head title="TOS" />
      <Dialog css={dialogCss} title={title} icon="stop-hand">
        <>
          <p>
            To the maximum extent permitted by applicable law, and except as expressly set forth
            herein, this software is provided on "as is" basis.
          </p>
          <p>
            The DOPE DAO does not make and specifically disclaims, all express and implied warranties
            of every kind relating to the software and/or use of the software.
          </p>
          <p>
            This includes, without limitation, actual and implied warranties of merchantability and
            fitness for a particular purpose, and non-infringement, as well as any warranties that the
            software or any elements thereof will achieve a particular result, or will be
            uninterrupted or error-free.
          </p>
          <Button onClick={() => handleAgree()}>Agree</Button>
          <Button onClick={() => handleDisagree()}>Disagree</Button>
        </>
      </Dialog>
    </DesktopWindow>
  );
}
