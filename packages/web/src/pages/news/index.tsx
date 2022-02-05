import styled from '@emotion/styled';
import Head from 'components/Head';
import NewsWindow from 'features/news/components/NewsWindow';

const TITLE = 'The Daily Dope';

const News = () => (
  <>
    <Head title={TITLE} />
    <NewsWindow />
  </>
);
export default News;
