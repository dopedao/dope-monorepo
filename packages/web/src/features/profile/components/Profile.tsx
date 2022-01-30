import { Accordion, Box } from '@chakra-ui/react'
import { useProfileWalletQuery } from 'generated/graphql';
import GearWrapper from './GearWrapper';
import Section from "./Section"

import { useWeb3React } from "@web3-react/core";
import LoadingBlock from 'components/LoadingBlock';
import { useMemo } from 'react';
import { ProfileGear, ProfileHustler } from "../types"
import HustlersWrapper from './HustlersWrapper';
import Dopes from './Dopes';

const Profile = () => {
  // const { account } = useWeb3React();
  const account = "0xba740c9035fF3c24A69e0df231149c9cd12BAe07"

  const { data, isFetching: isLoading } = useProfileWalletQuery({
    where: {
      id: account
    }
  })

  const gear = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.items) return result

      const { items } = edge.node

      return [...result, ...items]
    }, [] as ProfileGear[])
  }, [data])

  const hustlers = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.items) return result

      const { hustlers } = edge.node

      return [...result, ...hustlers]
    }, [] as ProfileHustler[])
  }, [data])

  return (
    <Accordion
      allowMultiple
      allowToggle
      background="#fff"
      defaultIndex={0}
    >
      <Section title="Dopes">
        <Dopes />
        {/* <HustlersWrapper hustlers={hustlers} /> */}
      </Section>
      <Section title="Hustlers">
        <HustlersWrapper hustlers={hustlers} />
      </Section>
      <Section title="Gear">
        <GearWrapper gear={gear} />
      </Section>
    </Accordion>
  )
}

export default Profile;
