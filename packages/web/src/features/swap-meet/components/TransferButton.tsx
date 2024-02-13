import ShareIcon from 'ui/svg/Share';
import { useEffect, useRef, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useReservoirClient } from '@reservoir0x/reservoir-kit-ui';
import { toHex } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import StatusText from 'components/StatusText';

import {
  Box,
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

type Props = {
  chainId: number;
  contractAddress: string;
  tokenId: string;
  buttonProps?: ButtonProps;
  title: string;
};

type Step = {
  error?: string | undefined;
  errorData?: any;
  items?: any[];
  action: string;
  description: string;
};

export const TransferButton = ({
  chainId,
  contractAddress,
  tokenId,
  buttonProps,
  title,
}: Props) => {
  const { openConnectModal } = useConnectModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inProgress, setInProgress] = useState(false);
  const [complete, setComplete] = useState(false);
  const [recipientAddr, setRecipientAddr] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const toast = useToast();

  const recipientRef = useRef<HTMLInputElement>(null);
  const rClient = useReservoirClient();
  const wallet = useWalletClient();

  const send = async () => {
    if (!recipientAddr) {
      toast({
        title: 'Recipient address is required',
        status: 'error',
      });
      return;
    }
    if (!rClient || !wallet.data) {
      openConnectModal?.();
      return;
    }

    try {
      setInProgress(true);
      console.log('CHAIN ID', chainId);
      await rClient.actions.transferTokens({
        // @ts-ignore
        to: recipientAddr,
        chainId,
        items: [
          {
            token: `${contractAddress}:${tokenId}`,
            quantity: 1,
          },
        ],
        wallet: wallet.data,
        onProgress: steps => {
          setSteps(steps);
          console.log(steps);
        },
      });
      setComplete(true);
      onClose();
      toast({
        title: 'Transfer complete',
        status: 'success',
        description:
          'Your tokens have been sent to the recipient. Please wait a few minutes for the SWAP MEET to update.',
      });
    } catch (e: any) {
      console.error(e);
      toast({
        title: 'Transfer failed',
        status: 'error',
        description: e.message,
      });
    } finally {
      setInProgress(false);
    }
  };

  return (
    <>
      {complete ? (
        <StatusText>Transfer in progress…</StatusText>
      ) : (
        <Button onClick={onOpen} isLoading={isOpen} isDisabled={complete} {...buttonProps}>
          <ShareIcon color="black" width={16} height={16} />
          {/* <Box pl=".25em">Transfer</Box> */}
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer</ModalHeader>
          <ModalCloseButton />
          {/* form for recipient input */}
          {!inProgress && (
            <ModalBody>
              <Text>
                <p>
                  You are about to send&nbsp;
                  <em>{title}</em> to another Ethereum wallet.
                </p>
                <p>
                  Double-check the recipient&apos;s address below to make sure it&apos;s accurate.
                </p>
              </Text>
              <FormControl>
                <FormLabel>Recipient Address</FormLabel>
                <Input
                  type="text"
                  fontSize="small"
                  placeholder="0x..."
                  ref={recipientRef}
                  value={recipientAddr}
                  onChange={e => {
                    setRecipientAddr(e.currentTarget.value);
                  }}
                />
                <FormHelperText>Once sent, this action can&apos;t be undone</FormHelperText>
              </FormControl>
            </ModalBody>
          )}
          {/* show the transfer steps */}
          {inProgress && (
            <ModalBody>
              {steps.map((step, i) => {
                const stepComplete = (step?.items?.length ?? 0) === 0;
                return (
                  <Box key={step.action} mb={4}>
                    <Text textTransform="uppercase" pb={2}>
                      {stepComplete && (
                        <Box display="inline-block" mr={2}>
                          ✅
                        </Box>
                      )}
                      {!stepComplete && <Spinner size="xs" mr={2} display="inline-block" />}
                      {step.action}
                      <hr />
                    </Text>

                    <Text>{step.description}</Text>
                    {/* {step.error && <Text color="red">{step.error}</Text>} */}
                  </Box>
                );
              })}
            </ModalBody>
          )}

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              isLoading={inProgress}
              onClick={send}
              isDisabled={recipientAddr === undefined || recipientAddr === ''}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
