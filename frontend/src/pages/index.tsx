import React from 'react';

import { EventsApp } from '@/containers/App/App';
import { Layout } from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

export default function LandingPage() {
  return (
    <Layout
      meta={
        <Meta title="dStream" description="Live Streaming on the blockchain" />
      }
    >
      <EventsApp />
    </Layout>
  );
}
