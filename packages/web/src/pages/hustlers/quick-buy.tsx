import { Box, Button, Image } from "@chakra-ui/react";
import { DEFAULT_BG_COLORS } from "utils/HustlerConfig";
import { getRandomArrayElement } from "utils/utils";
import AppWindow from "components/AppWindow";
import DopeCard from "features/dope/components/DopeCard";
import StackedResponsiveContainer from "components/StackedResponsiveContainer";
import LoadingBlock from "components/LoadingBlock";
import {useState, useEffect} from 'react';
import { 
  useSearchDopeQuery, 
  OrderDirection,
  SearchOrderField,
  SearchType
} from 'generated/graphql';
import { consoleSandbox } from "@sentry/utils";

const QuickBuyHustler = () => {
  const {
    data: unclaimedDope,
    status: searchStatus,
  } = useSearchDopeQuery(
    {
      query: '',
      first: 25,
      orderBy: {
        field: SearchOrderField.SalePrice,
        direction: OrderDirection.Asc,
      },
      where: {
        type: SearchType.Dope,
        opened: false,
        saleActive: true
      },
    }
  );
  const isLoading = searchStatus === 'loading';
  const [bgColor, setBgColor] = useState(getRandomArrayElement(DEFAULT_BG_COLORS));
  const [unclaimedDopeArr, setUnclaimedDopeArr] = useState<any>([]);
  const [currentDopeIndex, setCurrentDopeIndex] = useState(0);
  
  const decrementIndex = () => {
    let index = currentDopeIndex;
    index--;
    if (0 > index) index = 0;
    setCurrentDopeIndex(index);
  };

  const incrementIndex = () => {
    let index = currentDopeIndex;
    const maxIndex = unclaimedDopeArr.length - 1;
    index++;
    if (index > maxIndex) index = maxIndex;
    setCurrentDopeIndex(index);
  };

  useEffect(() => {
    if(unclaimedDope?.search?.edges) {
      // Have to filter array for things that have "node" property
      // which are the DOPE objects we want
      setUnclaimedDopeArr(
        unclaimedDope.search.edges?.map((dope: any) => {
          if (dope && dope.node) return dope.node
        })
      );
    }
  }, [unclaimedDope, isLoading]);

  return(
    <AppWindow 
      title="Quick Buy Hustler" 
      height={740}
      background={bgColor}
    >
      <StackedResponsiveContainer>
        {isLoading && <LoadingBlock maxRows={5} /> }
        {!isLoading && unclaimedDopeArr.length > 0 && <>
          <Box 
            flex="1 !important"
            display="flex"
            justifyContent="stretch"
          >
            <DopeCard
              key={unclaimedDopeArr[currentDopeIndex].id}
              dope={unclaimedDopeArr[currentDopeIndex]}
              buttonBar="for-marketplace"
              isExpanded={true}
              showPreviewButton={false}
              showCollapse
            />
          </Box>
          <Box
           flex="1 !important"
           display="flex"
           justifyContent="space-between"
           onSelect={() => {return false}}
          >
            <Button onClick={decrementIndex}>
              <Image src="/images/icon/arrow-back.svg" alt="Previous" />
            </Button>
            <Button variant="primary">
              Quick Buy Hustler
            </Button>
            <Button onClick={incrementIndex}>
              <Image src="/images/icon/arrow-forward.svg" alt="Next" />
            </Button>
          </Box>
        </>}
      </StackedResponsiveContainer>
    </AppWindow>
  )
}

export default QuickBuyHustler;
