import { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GifPlayerProps {
  src: string; // GIFアニメーションのURL
  staticSrc: string; // 1フレーム目の静止画のURL
  alt: string;
  caption?: string;
  duration?: number; // GIFの再生時間(ミリ秒)デフォルトは4秒
  onImageClick?: () => void; // 画像クリック時のコールバック
}

export function GifPlayer({ src, staticSrc, alt, caption, duration = 4000, onImageClick }: GifPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  // Google Drive URLを画像として直接表示できる形式に変換
  const convertGoogleDriveUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileIdMatch = url.match(/\/d\/([^/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      }
    }
    return url;
  };

  const gifUrl = convertGoogleDriveUrl(src);

  // 再生処理
  const play = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素へのイベント伝播を防ぐ
    setIsPlaying(true);
    setPlayKey(Date.now()); // GIFを最初から再生
  };

  // リセット処理 - 1フレーム目に戻る
  const reset = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素へのイベント伝播を防ぐ
    setIsPlaying(false);
  };

  // GIF再生後、指定時間経過したら自動的に止画に戻る
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, duration]);

  return (
    <div className="max-w-[250px]">
      <div className="relative group">
        {/* 静止画またはGIF画像 */}
        <ImageWithFallback
          key={isPlaying ? `gif-${playKey}` : 'static'}
          src={isPlaying ? gifUrl : staticSrc}
          alt={alt}
          className={`w-full h-auto ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
          onClick={onImageClick}
        />
        
        {/* コントロールボタン */}
        <div className="absolute top-2 left-2 flex gap-2">
          {/* リセットボタン */}
          <button
            onClick={reset}
            className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          {/* 再生ボタン - 再生中は非表示 */}
          {!isPlaying && (
            <button
              onClick={play}
              className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70 transition-colors"
              title="Play"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {caption && (
        <p className="text-xs text-gray-500 mt-2">{caption}</p>
      )}
    </div>
  );
}