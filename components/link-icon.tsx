import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LinkIconProps {
  size?: number;
  color?: string;
}

export default function LinkIcon({
  size = 24,
  color = "white",
}: LinkIconProps) {
  const strokeDashoffset = useSharedValue(28);

  useEffect(() => {
    strokeDashoffset.value = withTiming(0, { duration: 1000 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        strokeDasharray="28"
        animatedProps={animatedProps}
        d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"
      />
    </Svg>
  );
}
