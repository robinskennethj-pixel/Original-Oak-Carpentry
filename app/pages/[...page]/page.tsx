import { builder, BuilderComponent } from '@builder.io/react';
import { notFound } from 'next/navigation';

// Initialize Builder.io with MCP integration
builder.init(process.env.BUILDER_PUBLIC_KEY!);

export default async function BuilderPage({
  params
}: {
  params: { page?: string[] }
}) {
  const urlPath = '/' + (params?.page?.join('/') || '');

  try {
    // Fetch content from Builder.io with MCP optimization
    const content = await builder
      .get('page', {
        url: urlPath,
        cacheSeconds: 60,
        enrich: true,
        includeRefs: true,
        noWrap: true
      })
      .promise();

    if (!content) {
      notFound();
    }

    return (
      <div className="builder-page">
        <BuilderComponent
          model="page"
          content={content}
          options={{
            enrich: true,
            includeRefs: true,
            noWrap: true
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Builder.io MCP integration error:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  // Return empty paths for ISR (Incremental Static Regeneration)
  // Builder.io content will be fetched on-demand
  return [];
}

export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds