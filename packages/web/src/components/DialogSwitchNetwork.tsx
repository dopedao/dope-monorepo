import Dialog from 'components/Dialog';

const DialogSwitchNetwork = ({ networkName }: { networkName: string }) => {
  return (
    <Dialog title={`${networkName} Network Required`} icon="stop-hand">
      <p>
        To use this screen you need to be on the {networkName} Ethereum network. Please switch
        networks using your wallet provider.
      </p>
    </Dialog>
  );
};

export default DialogSwitchNetwork;
