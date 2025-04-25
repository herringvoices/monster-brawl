import React, { useState, useEffect } from "react";
import "../styles/EffectOverlay.css";

export type EffectType = "damage" | "heal" | "defense";

interface EffectOverlayProps {
  message: string;
  type: EffectType;
  isActive: boolean;
  onEffectComplete?: () => void;
}

const EffectOverlay: React.FC<EffectOverlayProps> = ({
  message,
  type,
  isActive,
  onEffectComplete,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isActive) {
      // Show the effect
      setVisible(true);

      // Hide it after animation completes
      timer = setTimeout(() => {
        setVisible(false);
        if (onEffectComplete) {
          onEffectComplete();
        }
      }, 1500); // Match animation duration
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, onEffectComplete]);

  if (!isActive && !visible) return null;

  return (
    <div className="effect-overlay">
      <div className={`effect-message effect-${type}`}>{message}</div>
    </div>
  );
};

export default EffectOverlay;
