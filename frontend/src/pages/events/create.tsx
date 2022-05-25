import React from 'react';

import { CreateEvents } from '@/containers/CreateEvents/CreateEvents';
import { Layout } from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

export default function CreateEventsPage() {
  return (
    <Layout
      meta={
        <Meta
          title="dStream | Create"
          description="Create Live Stream on dStream"
        />
      }
    >
      <CreateEvents />
    </Layout>
  );
}
