import { Suspense } from "react";
import type { Metadata } from "next";

// Loading component
function ReleaseLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-600">Loading release...</span>
    </div>
  );
}

// Placeholder component for release display
function ReleaseDisplay({ catNo }: { catNo: string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Release Details
          </h1>
          <p className="text-gray-600">Catalog Number: {catNo}</p>
        </div>

        {/* Placeholder content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Release Information
            </h2>
            <p className="text-gray-500">
              This page will display detailed information for release {catNo}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              API integration coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReleasePageProps {
  params: {
    cat_no: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ReleasePageProps): Promise<Metadata> {
  const { cat_no } = params;

  return {
    title: `Release ${cat_no} - Archaic Horizon`,
    description: `Details for release ${cat_no} from the Archaic Horizon collection`,
  };
}

export default function ReleasePage({ params }: ReleasePageProps) {
  const { cat_no } = params;

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={cat_no} />
    </Suspense>
  );
}
