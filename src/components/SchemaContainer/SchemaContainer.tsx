import { Helmet } from 'react-helmet-async';

interface SchemaContainerProps {
  schema: Record<string, unknown>;
}

export default function SchemaContainer({ schema }: SchemaContainerProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
