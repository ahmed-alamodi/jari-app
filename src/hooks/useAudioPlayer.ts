import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioTimestamp {
  word: string;
  startTime: number; // seconds
  endTime: number;   // seconds
}

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  activeWordIndex: number;
  isLoading: boolean;
  error: string | null;
}

interface AudioPlayerActions {
  play: (src: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setPlaybackRate: (rate: number) => void;
  seek: (time: number) => void;
}

export function useAudioPlayer(timestamps?: AudioTimestamp[]): [AudioPlayerState, AudioPlayerActions] {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    activeWordIndex: -1,
    isLoading: false,
    error: null,
  });

  const updateProgress = useCallback(() => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    let activeWordIndex = -1;

    if (timestamps) {
      activeWordIndex = timestamps.findIndex(
        (ts) => currentTime >= ts.startTime && currentTime < ts.endTime
      );
    }

    setState((prev) => ({
      ...prev,
      currentTime,
      activeWordIndex,
    }));

    animationRef.current = requestAnimationFrame(updateProgress);
  }, [timestamps]);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.playbackRate = state.playbackRate;

    audio.addEventListener('loadedmetadata', () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
      }));
    });

    audio.addEventListener('ended', () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        activeWordIndex: -1,
      }));
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    });

    audio.addEventListener('error', () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: 'فشل تحميل الصوت',
      }));
    });

    audio.play().then(() => {
      setState((prev) => ({ ...prev, isPlaying: true }));
      animationRef.current = requestAnimationFrame(updateProgress);
    }).catch(() => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'تعذر تشغيل الصوت',
      }));
    });
  }, [state.playbackRate, updateProgress]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((prev) => ({ ...prev, isPlaying: false }));
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play();
    setState((prev) => ({ ...prev, isPlaying: true }));
    animationRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
      activeWordIndex: -1,
    }));
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setState((prev) => ({ ...prev, playbackRate: rate }));
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return [state, { play, pause, resume, stop, setPlaybackRate, seek }];
}
