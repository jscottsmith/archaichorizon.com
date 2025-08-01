import { Track, formatTrackLength } from "@/app/utils/tracks";
import { usePlaylist } from "../contexts/PlaylistProvider";

interface TrackListProps {
  tracks?: Track[];
  currentTrackIndex?: number;
  onTrackSelect?: (index: number) => void;
}

export function TrackList({
  tracks: propTracks,
  currentTrackIndex: propCurrentTrackIndex,
  onTrackSelect: propOnTrackSelect,
}: TrackListProps) {
  const { tracks, currentTrackIndex, selectTrack } = usePlaylist();

  // Use props if provided, otherwise use context
  const displayTracks = propTracks || tracks;
  const displayCurrentTrackIndex = propCurrentTrackIndex ?? currentTrackIndex;
  const handleTrackSelect = propOnTrackSelect || selectTrack;
  if (displayTracks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4">
      <h4 className="text-sm font-medium mb-3 text-gray-200">Track List</h4>
      <div className="space-y-2">
        {displayTracks.map((track, index) => (
          <button
            key={index}
            onClick={() => handleTrackSelect(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              index === displayCurrentTrackIndex
                ? "bg-blue-600/20 border border-blue-500/30 text-blue-300"
                : "hover:bg-gray-500/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-gray-400 min-w-[2rem]">
                  {track.track}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{track.title}</div>
                  {track.artist && (
                    <div className="text-xs text-gray-400">{track.artist}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {track.album && (
                  <span className="hidden sm:inline">{track.album}</span>
                )}
                {track.length && (
                  <span className="font-mono">
                    {formatTrackLength(track.length)}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
