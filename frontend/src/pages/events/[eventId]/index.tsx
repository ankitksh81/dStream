import React from 'react';

import { StreamEvent } from '@/containers/StreamEvent/StreamEvent';
import { Layout } from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

export default function StreamEventPage() {
  return (
    <Layout
      meta={
        <Meta
          title="dStream | Stream"
          description="Watch Live Stream on dStream"
        />
      }
    >
      <StreamEvent />
    </Layout>
  );
}
