import React from "react";
import Svg, { Path } from "react-native-svg";

interface GalleryIconProps {
  size?: number;
  color?: string;
}

export default function GalleryIcon({
  size = 24,
  color = "#f3f3f3",
}: GalleryIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5l-3 4L9 13z"
      />
    </Svg>
  );
}
