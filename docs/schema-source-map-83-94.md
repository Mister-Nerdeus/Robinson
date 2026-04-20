# Schema Source Map (83-94)

## Canonical Sources
- Business identity: `src/config/company.ts`
- FAQ entries: `src/content/faq.ts`
- Service template metadata/copy: `src/content/serviceTemplates.ts`

## JSON-LD Mapping
- `localBusinessSchema()` fields map to `company` values:
  - `name`, `alternateName`, `telephone`
  - postal address fields
  - business description
- `serviceSchema(name, description, path)`:
  - `name` and `description` originate from service template entries
  - `provider.name` maps to `company.publicBrand`
- `faqSchema()`:
  - `mainEntity` maps from `faqContent`

## Hard Stops
- Enforcement test: `tests/schema-source-contract.spec.ts`
- Unverifiable review/rating fields are disallowed:
  - `aggregateRating`
  - `ratingValue`
  - `reviewCount`
  - `Review` objects
