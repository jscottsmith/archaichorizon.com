// Internet Archive API TypeScript Definitions

// Base response structure from Internet Archive Advanced Search API
export interface IAAdvancedSearchResponse {
  response: {
    docs: IADocument[];
    numFound: number;
    start: number;
    rows: number;
    params: {
      q: string;
      rows: number;
      page: number;
      output: string;
    };
  };
  responseHeader: {
    status: number;
    QTime: number;
    params: {
      q: string;
      rows: number;
      page: number;
      output: string;
    };
  };
}

// Individual document/item from Internet Archive
export interface IADocument {
  // Core metadata
  identifier: string;
  title?: string;
  description?: string;
  creator?: string | string[];
  date?: string;
  year?: number;
  cat_no?: string; // Catalog number field
  thumbnail?: string; // Thumbnail URL

  // Collection and type information
  collection?: string | string[];
  mediatype?: string;
  type?: string;

  // File and format information
  format?: string | string[];
  files?: string[];
  filecount?: number;

  // Access and rights
  publicdate?: string;
  rights?: string;
  licenseurl?: string;

  // Subject and language
  subject?: string | string[];
  language?: string | string[];

  // Publisher and contributor information
  publisher?: string | string[];
  contributor?: string | string[];

  // Coverage and spatial information
  coverage?: string | string[];
  spatial?: string | string[];

  // Technical metadata
  size?: number;
  downloads?: number;
  week?: number;
  month?: number;

  // Additional fields that might be present
  [key: string]: unknown;
}

// Specific collection document type for Archaic Horizon
export interface ArchaicHorizonDocument extends IADocument {
  collection: "archaichorizon" | string[];
  // Add any specific fields for Archaic Horizon collection
}

// API request parameters
export interface IAAdvancedSearchParams {
  q: string;
  rows?: number;
  page?: number;
  output?: "json" | "xml";
  sort?: string;
  fields?: string[];
}

// Error response structure
export interface IAErrorResponse {
  error: string;
  message: string;
  status: number;
}

// Pagination metadata
export interface IAPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Enhanced response with pagination
export interface IAEnhancedResponse {
  data: IADocument[];
  pagination: IAPaginationInfo;
  metadata: {
    query: string;
    responseTime: number;
    timestamp: string;
  };
}

// Collection-specific types
export interface CollectionMetadata {
  name: string;
  description?: string;
  itemCount: number;
  lastUpdated: string;
  curator?: string;
}

// Search result with highlighting
export interface IASearchResult extends IADocument {
  highlight?: {
    title?: string[];
    description?: string[];
    [key: string]: string[] | undefined;
  };
  score?: number;
}

// Facet information for search results
export interface IAFacet {
  field: string;
  values: Array<{
    value: string;
    count: number;
  }>;
}

// Complete search response with facets
export interface IASearchResponse extends IAAdvancedSearchResponse {
  facets?: IAFacet[];
  spellcheck?: {
    suggestions: string[];
    collations: string[];
  };
}
