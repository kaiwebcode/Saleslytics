# Saleslytics — Sales CSV Analysis Application

Saleslytics is a modern retail sales analysis dashboard built for the Developer Technical Assessment.

It allows users to upload sales data in CSV format, validate the data, analyze sales performance, filter results, visualize sales trends, and download filtered records.

## Features

* CSV upload with drag-and-drop support
* CSV file validation
* Required column validation
* Invalid row detection and reporting
* Maximum file size validation
* Date filtering
* Retailer filtering
* Product filtering
* Search across retailers and products
* Total quantity calculation
* Total sales value calculation
* Average selling price calculation
* Promotion percentage calculation
* Sales trend chart
* Filtered CSV export
* Responsive dashboard UI
* Sample CSV download
* Loading and error states
* Component-based architecture
* Framer Motion animations

## Required CSV Format

The uploaded CSV must contain these columns:

```text
Date
Retailer
Product
Quantity
Regular Price
Promotion Price
```

Example:

```csv
Date,Retailer,Product,Quantity,Regular Price,Promotion Price
2026-01-05,Retailer A,Product A,10,100,90
2026-01-06,Retailer B,Product B,15,200,180
2026-01-07,Retailer A,Product C,8,150,
```

### Validation Rules

The application validates:

* Date must use `YYYY-MM-DD` format.
* Retailer cannot be empty.
* Product cannot be empty.
* Quantity must be a positive integer.
* Regular Price must be greater than zero.
* Promotion Price is optional.
* Promotion Price cannot be negative.
* Promotion Price cannot be greater than Regular Price.
* Files must have a `.csv` extension.
* Files must be smaller than 5 MB.
* Missing required columns are rejected.

Invalid rows are reported with their row number and validation error.

## Analytics

Saleslytics calculates the following metrics from the currently filtered records.

### Total Quantity

The sum of all quantities in the filtered dataset.

### Total Sales Value

Sales value is calculated using:

```text
Quantity × Selling Price
```

If a promotion price exists, the promotion price is used. Otherwise, the regular price is used.

### Average Selling Price

```text
Total Sales Value ÷ Total Quantity
```

### Promotion Percentage

The promotion percentage is calculated based on the discount value compared with the corresponding regular-price sales value.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts
* Framer Motion
* Lucide React

### Backend

* Next.js Route Handlers
* Node.js runtime
* Papa Parse

### Storage

The application uses in-memory storage through `globalThis`.

No external database is required.

## Project Structure

```text
sales-csv-analyzer/
│
├── app/
│   ├── api/
│   │   ├── sales/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── sales/
│   │   ├── sales-sidebar.tsx
│   │   ├── sales-header.tsx
│   │   ├── upload-dropzone.tsx
│   │   ├── upload-feedback.tsx
│   │   ├── sales-kpi-card.tsx
│   │   ├── sales-kpi-grid.tsx
│   │   ├── sales-chart.tsx
│   │   ├── sales-filters.tsx
│   │   ├── sales-table.tsx
│   │   └── sales-records.tsx
│   │
│   └── ui/
│
├── hooks/
│   └── use-sales.ts
│
├── lib/
│   ├── analytics.ts
│   ├── sales-utils.ts
│   ├── storage.ts
│   └── utils.ts
│
├── public/
│   └── sample-sales.csv
│
├── types/
│   └── sales.ts
│
├── AI_USAGE.md
├── README.md
└── package.json
```

## Getting Started

### Prerequisites

Make sure you have:

* Node.js 20+
* npm

### Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Enter the project directory:

```bash
cd sales-csv-analyzer
```

Install dependencies:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

### Upload CSV

```text
POST /api/upload
```

Accepts a CSV file using multipart form data.

The endpoint:

1. Checks the uploaded file.
2. Validates the required columns.
3. Parses the CSV.
4. Validates each row.
5. Stores valid rows.
6. Reports invalid rows.

### Get Sales Records

```text
GET /api/sales
```

Returns the currently stored sales records.

## Storage Limitation

This project intentionally uses in-memory storage because the assessment allows it.

The current implementation does not use a database.

Therefore, uploaded data can be lost when the server restarts or when deployed serverless instances are replaced.

For a production application, this could be replaced with PostgreSQL, MySQL, MongoDB, or another persistent database.

## Known Limitations

* Sales data is stored in memory.
* Data is not persistent across server restarts.
* No authentication is implemented because it was not required by the assessment.
* The application currently focuses on CSV-based analysis rather than long-term data management.

## Assessment Requirements Covered

| Requirement              | Status                       |
| ------------------------ | ---------------------------- |
| CSV upload               | Complete                     |
| CSV validation           | Complete                     |
| Invalid row reporting    | Complete                     |
| Date filtering           | Complete                     |
| Retailer filtering       | Complete                     |
| Product filtering        | Complete                     |
| Total quantity           | Complete                     |
| Total sales value        | Complete                     |
| Average selling price    | Complete                     |
| Promotion percentage     | Complete                     |
| Sales chart              | Complete                     |
| Filtered CSV download    | Complete                     |
| README                   | Complete                     |
| AI usage documentation   | Complete                     |
| Git history              | Complete after final commits |
| Deployment / local setup | Included                     |
| Demonstration video      | To be recorded               |

## AI Usage

AI tools were used during development for code generation, debugging, architecture suggestions, UI improvements, and documentation.

Detailed AI usage, prompts, generated code, mistakes, and corrections are documented in:

```text
AI_USAGE.md
```

## Author

**Kaif Qureshi**

Built as part of the Developer Technical Assessment.
