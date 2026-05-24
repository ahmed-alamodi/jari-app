/**
 * JsonLd — Server Component that injects JSON-LD structured data into <head>.
 *
 * Usage:
 *   import JsonLd from '@/components/seo/JsonLd';
 *   import { buildOrganizationSchema } from '@/lib/seo/schema';
 *
 *   // Single schema
 *   <JsonLd schema={buildOrganizationSchema()} />
 *
 *   // Multiple schemas
 *   <JsonLd schema={[buildOrganizationSchema(), buildWebSiteSchema()]} />
 *
 * This is a pure Server Component — zero client JS, no hydration cost.
 */

interface JsonLdProps {
  schema: object | object[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  // Support both single schema object and array of schemas
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s, null, 0),
          }}
        />
      ))}
    </>
  );
}
