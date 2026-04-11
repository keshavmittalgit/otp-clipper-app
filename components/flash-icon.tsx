import React from "react";
import Svg, { Path } from "react-native-svg";

interface FlashIconProps {
  size?: number;
  color?: string;
}

export default function FlashIcon({
  size = 24,
  color = "#f3f3f3",
}: FlashIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M9 10L6 5h12l-3 5zm9-6H6V2h12zM9 22V11h6v11zm3-9a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1"
      />
    </Svg>
  );
}
