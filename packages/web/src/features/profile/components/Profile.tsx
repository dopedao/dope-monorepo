import { Accordion, Image, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import Section from './Section';
import Dopes from './Dopes';
import Gear from './Gear';
import Hustlers from './Hustlers';
import Listings from './Listings';
import { useDebounce } from 'usehooks-ts';
import { ChangeEvent, useState } from 'react';
import useQueryParam from 'hooks/useQueryParam';

const Profile = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 1500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <>
      <Stack
        margin="0"
        spacing="8px"
        width="100%"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
        direction={['column', 'column', 'row']}
      >
        <InputGroup>
          <Input
            className="search"
            placeholder="Search…"
            size="sm"
            border="2px solid black"
            borderRadius="4px"
            onChange={handleSearchChange}
            value={searchValue}
            _focus={{ boxShadow: '0' }}
          />
          {searchValue !== '' && (
            <InputRightElement height="100%">
              <Image
                width="16px"
                src="/images/icon/circle-clear-input.svg"
                alt="Search"
                onClick={() => setSearchValue('')}
                cursor="pointer"
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Stack>
      <Accordion allowToggle defaultIndex={0}>
        <Section>
          <Listings />
        </Section>
        <Section>
          <Hustlers searchValue={debouncedSearchValue} />
        </Section>
        <Section>
          <Gear searchValue={debouncedSearchValue} />
        </Section>
        <Section>
          <Dopes searchValue={debouncedSearchValue} />
        </Section>
      </Accordion>
    </>
  );
};

export default Profile;
