import React, { PropsWithChildren } from "react";
import { ids, classes } from "../../constants/ids";

/*
 * LabeledElements are used to display the audio track data currently playing in the media player.
 */

interface LabeledElementProps extends PropsWithChildren {
  enableId?: boolean;
}

export function AudioTrackTitle({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackTitle })}
      className={classes.audioTrackTitle}
    >
      {children}
    </span>
  );
}

export function AudioTrackArtist({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackArtist })}
      className={classes.audioTrackArtist}
    >
      {children}
    </span>
  );
}

export function AudioTrackAlbum({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackAlbum })}
      className={classes.audioTrackAlbum}
    >
      {children}
    </span>
  );
}

export function AudioTrackCurrentTrackNumber({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackCurrentTrackNumber })}
      className={classes.audioTrackCurrentTrackNumber}
    >
      {children}
    </span>
  );
}

export function AudioTrackTotalsTracks({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackTotalsTracks })}
      className={classes.audioTrackTotalsTracks}
    >
      {children}
    </span>
  );
}

export function AudioTrackCurrentTime({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackCurrentTime })}
      className={classes.audioTrackCurrentTime}
    >
      {children}
    </span>
  );
}

export function AudioTrackDuration({
  children,
  enableId = false,
}: LabeledElementProps) {
  return (
    <span
      {...(enableId && { id: ids.audioTrackDuration })}
      className={classes.audioTrackDuration}
    >
      {children}
    </span>
  );
}
