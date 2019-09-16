import React from 'react';
import Layout from './components/Layout/Layout';
import SummonerSearch from './containers/SummonerSearch/SummonerSearch';
import TopSummoners from './containers/TopSummoners/TopSummoners';
import NotableSummoners from './containers/NotableSummoners/NotableSummoners';

function App() {
  return (
    <div>
      <Layout>
        <SummonerSearch />
        <TopSummoners />
        <NotableSummoners />
      </Layout>
    </div>
  );
}

export default App;
