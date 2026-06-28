import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SybilChat from './SybilChat';
import { SpeakerWaveIcon } from './SpeakerWaveIcon';
import { getPageAudioGuide } from '../constants/pageAudioGuide';
import { OPEN_SYBIL_CHAT_EVENT } from '../constants/sybilChatOpenEvent';

type SybilChatStateDetail = { isOpen: boolean; isFullscreen: boolean };

export default function HelpDock() {
  const { pathname } = useLocation();
  const dockRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sybilState, setSybilState] = useState<SybilChatStateDetail>({
    isOpen: false,
    isFullscreen: false,
  });
  const [offscreen, setOffscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const guide = getPageAudioGuide(pathname);
  const hasAudio = Boolean(guide);

  useEffect(() => {
    const onSybilChatState = (e: Event) => {
      const detail = (e as CustomEvent<SybilChatStateDetail>).detail;
      if (detail) setSybilState(detail);
    };
    window.addEventListener('sybilChatState', onSybilChatState);
    return () => window.removeEventListener('sybilChatState', onSybilChatState);
  }, []);

  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sybilState.isOpen, hasAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);

    return () => {
      audio.pause();
    };
  }, [pathname, guide?.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncPlaybackState = () => {
      setIsPlaying(!audio.paused && !audio.ended);
    };

    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('play', syncPlaybackState);
    audio.addEventListener('playing', syncPlaybackState);
    audio.addEventListener('pause', syncPlaybackState);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('play', syncPlaybackState);
      audio.removeEventListener('playing', syncPlaybackState);
      audio.removeEventListener('pause', syncPlaybackState);
      audio.removeEventListener('ended', onEnded);
    };
  }, [guide?.src, sybilState.isOpen]);

  useEffect(() => {
    if (sybilState.isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [sybilState.isOpen]);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !guide) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    void audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, [guide]);

  const openChat = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_SYBIL_CHAT_EVENT));
  }, []);

  if (sybilState.isOpen && sybilState.isFullscreen) {
    return <SybilChat embedded hideLauncher />;
  }

  const iconState = isPlaying ? 'playing' : 'idle';

  return (
    <div
      ref={dockRef}
      className={`help-dock fixed bottom-5 right-5 z-[9000] flex flex-col items-end gap-3 ${
        offscreen ? 'help-dock-offscreen' : ''
      }`}
    >
      {!sybilState.isOpen && (
        <div className={`help-dock-pill ${hasAudio ? 'help-dock-pill--dual' : 'help-dock-pill--solo'}`}>
          <div className="help-dock-led" aria-hidden />

          <div className="help-dock-body">
            {hasAudio && guide && (
              <>
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-label={isPlaying ? 'Pause page audio' : guide.label}
                  title={isPlaying ? 'Pause' : 'Listen'}
                  className={`help-dock-half help-dock-half--listen ${isPlaying ? 'is-active' : ''}`}
                >
                  <SpeakerWaveIcon key={pathname} state={iconState} size={19} />
                </button>
                <div className="help-dock-divider" aria-hidden />
              </>
            )}

            <button
              type="button"
              onClick={openChat}
              aria-label="Open Sybil AI chat"
              title="Chat with Sybil"
              className="help-dock-half help-dock-half--chat"
            >
              <span className="help-dock-chat-ring">
                <span className="help-dock-chat-ring-spin" aria-hidden />
                <span className="help-dock-chat-icon">
                  <MessageCircle size={17} strokeWidth={1.75} aria-hidden />
                </span>
              </span>
            </button>
          </div>

          {hasAudio && guide && <audio ref={audioRef} src={guide.src} preload="none" />}
        </div>
      )}

      <SybilChat embedded hideLauncher />
    </div>
  );
}
