"use client";

import { useRelease } from "@/app/hooks/useRelease";

// Loading component
export function ReleaseLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-600">Loading release...</span>
    </div>
  );
}

// Error component
export function ReleaseError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Release
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    </div>
  );
}

// Release display component
export function ReleaseDisplay({ catNo }: { catNo: string }) {
  const { data: release, isLoading, error } = useRelease({ catNo });

  if (isLoading) {
    return <ReleaseLoading />;
  }

  if (error) {
    return <ReleaseError error={error} />;
  }

  if (!release) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">
              Release Not Found
            </h2>
            <p className="text-yellow-600">No data found for release {catNo}</p>
          </div>
        </div>
      </div>
    );
  }

  const { metadata } = release;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {metadata.title}
          </h1>
          <p className="text-gray-600">Catalog Number: {catNo}</p>
          {metadata.creator && (
            <p className="text-gray-600">Artist: {metadata.creator}</p>
          )}
        </div>

        {/* Release content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Basic info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Release Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-900">{metadata.title}</span>
                </div>
                {metadata.creator && (
                  <div>
                    <span className="font-medium text-gray-700">Artist:</span>
                    <span className="ml-2 text-gray-900">
                      {metadata.creator}
                    </span>
                  </div>
                )}
                {metadata.date && (
                  <div>
                    <span className="font-medium text-gray-700">
                      Release Date:
                    </span>
                    <span className="ml-2 text-gray-900">{metadata.date}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {metadata.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Description
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {metadata.description}
                  </p>
                </div>
              </div>
            )}

            {/* Additional metadata */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Media Type:</span>
                  <span className="ml-2 text-gray-900">
                    {metadata.mediatype}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">License:</span>
                  <span className="ml-2 text-gray-900">
                    <a
                      href={metadata.licenseurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View License
                    </a>
                  </span>
                </div>
                {metadata.subject && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-600">Tags:</span>
                    <span className="ml-2 text-gray-900">
                      {metadata.subject}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
