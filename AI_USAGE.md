# AI Usage — Saleslytics

## Project

**Saleslytics — Sales CSV Analysis Application**

## Purpose

AI tools were used during development as coding assistants for architecture planning, implementation, debugging, UI improvements, and documentation.

The generated code was reviewed, tested, modified, and integrated manually. I remained responsible for understanding the implementation and verifying that the application worked correctly.

---

## AI Tools Used

### ChatGPT

Used for:

* Project architecture planning
* Component structure
* Next.js and TypeScript implementation
* CSV validation logic
* API route implementation
* React hook implementation
* UI improvements
* Debugging TypeScript and React errors
* Tailwind and shadcn/ui styling
* README and AI documentation

### GitHub Copilot / Other AI Coding Tools

If applicable, list any additional AI coding tools used during development here.

---

# Important Prompts Used

## Prompt 1 — Project Architecture

> Build a scalable Next.js TypeScript architecture for a Sales CSV Analysis Application. The application should allow users to upload a CSV containing Date, Retailer, Product, Quantity, Regular Price, and Promotion Price. It should validate the CSV, report invalid rows, filter records, calculate sales metrics, display a chart, and export filtered results as CSV. Use reusable components and Next.js Route Handlers.

### Result

The AI suggested separating:

* API routes
* hooks
* analytics utilities
* storage
* reusable sales components
* types

This led to the component-based project structure used in the application.

---

## Prompt 2 — CSV Validation API

> Create a Next.js Route Handler that accepts a CSV file using multipart FormData, validates the required headers and each row, rejects invalid rows, and returns imported and rejected row counts with row-level error messages.

### Result

The generated implementation used Papa Parse and created validation rules for:

* Date
* Retailer
* Product
* Quantity
* Regular Price
* Promotion Price

The implementation was then reviewed and adjusted during testing.

---

## Prompt 3 — Sales Analytics

> Create a reusable React hook for a sales analytics dashboard. It should fetch sales records, handle CSV uploads, filter by search, date, retailer, and product, calculate total quantity, total sales value, average selling price, promotion percentage, generate chart data, and export filtered records as CSV.

### Result

The AI generated the initial `useSales` hook.

The hook was manually reviewed and tested against the API and UI components.

---

## Prompt 4 — Dashboard UI

> Refactor the Sales CSV dashboard into reusable components including sidebar, header, upload dropzone, upload feedback, KPI cards, chart, filters, sales table, and records section. Keep the application responsive, polished, accessible, and easy to maintain.

### Result

The original large page component was split into smaller reusable components under:

```text
components/sales/
```

This improved maintainability and made individual sections easier to modify.

---

## Prompt 5 — Debugging

> The CSV upload API expects multipart FormData but the frontend is currently sending JSON. The upload is returning "Unable to process CSV file." Find the issue and provide the correct frontend implementation.

### Result

The upload implementation was changed to use:

```typescript
const formData = new FormData();

formData.append("file", file);

await fetch("/api/upload", {
  method: "POST",
  body: formData,
});
```

This fixed the CSV upload issue.

---

# AI-Generated Code

AI assistance was used for portions of:

* `app/api/upload/route.ts`
* `app/api/sales/route.ts`
* `hooks/use-sales.ts`
* Sales dashboard components
* CSV validation logic
* Sales calculation logic
* Chart implementation
* CSV export logic
* Tailwind styling
* Documentation

The generated code was not blindly copied into the project. It was reviewed, tested, debugged, and modified to match the application's requirements.

---

# AI Mistakes Found and Corrected

## Mistake 1 — Sending JSON Instead of FormData

### Problem

The initial frontend upload implementation parsed the CSV on the client and attempted to send JSON to:

```text
/api/upload
```

However, the backend Route Handler expected:

```typescript
request.formData()
```

This caused the upload to fail with:

```text
Unable to process CSV file.
```

### How I identified it

I tested the upload functionality with the sample CSV and inspected the API behavior.

The frontend request format did not match the backend's expected request format.

### Correction

The frontend was changed to send the actual file using `FormData`:

```typescript
const formData = new FormData();

formData.append("file", file);

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});
```

After the correction, the sample CSV uploaded successfully.

---

# Mistake 2 — `id` Property Not Present in `SalesRecord`

### Problem

The generated upload route attempted to create records containing an `id`:

```typescript
{
  id: randomUUID(),
  date,
  retailer,
  product,
  quantity,
  regularPrice,
  promotionPrice,
}
```

However, the project's `SalesRecord` TypeScript type did not define an `id` property.

This produced a TypeScript error because the object did not match the declared type.

### How I identified it

The issue was caught during TypeScript/build validation.

The TypeScript compiler reported that the generated object was incompatible with `SalesRecord`.

### Correction

The unnecessary `id` generation was removed because the assessment did not require unique database IDs.

The record now matches the defined type:

```typescript
{
  date,
  retailer,
  product,
  quantity,
  regularPrice,
  promotionPrice,
}
```

This removed the TypeScript mismatch.

---

# Additional Debugging Example — Upload Feedback

Another issue occurred in the upload feedback component.

The upload error structure was:

```typescript
{
  row: number;
  message: string;
}[]
```

The UI initially attempted to render each error object directly as a React child.

This caused a React/TypeScript error because an object cannot be rendered directly.

The implementation was corrected to explicitly render:

```tsx
Row {errorItem.row}: {errorItem.message}
```

This made the validation errors readable to the user.

---

# How AI Code Was Verified

AI-generated code was verified using:

1. TypeScript type checking.
2. ESLint.
3. Next.js production build.
4. Manual browser testing.
5. CSV upload testing.
6. Invalid CSV testing.
7. Filter testing.
8. CSV export testing.
9. API endpoint testing.
10. Responsive UI testing.

Commands used during verification:

```bash
npm run lint
```

```bash
npm run build
```

```bash
npm run dev
```

---

# My Understanding of the Application

The application follows this flow:

```text
CSV File
   ↓
Upload Dropzone
   ↓
POST /api/upload
   ↓
Papa Parse
   ↓
CSV Header Validation
   ↓
Row Validation
   ↓
Valid Sales Records
   ↓
In-Memory Storage
   ↓
GET /api/sales
   ↓
useSales Hook
   ↓
Filtering + Analytics
   ↓
Dashboard
   ├── KPI Cards
   ├── Sales Chart
   ├── Filters
   └── Sales Table
```

The main analytics calculations are performed from the currently filtered records.

For example:

```text
Sales Value = Quantity × Selling Price
```

where the promotion price is used when available.

The average selling price is:

```text
Average Selling Price =
Total Sales Value / Total Quantity
```

---

# Known Limitation

The application uses in-memory storage because persistent storage was not required by the assessment.

This means uploaded records can be lost after a server restart or when a serverless instance is replaced.

A production version would use persistent storage such as PostgreSQL.

---

# Final Note

AI was used as a development assistant rather than as a replacement for technical understanding.

I reviewed and tested the generated code, identified implementation mistakes, corrected them, and verified the final application through local testing and production builds.
