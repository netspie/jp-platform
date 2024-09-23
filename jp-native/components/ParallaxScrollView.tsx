import type { PropsWithChildren, ReactElement } from "react";
import { View } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      className="py-10 px-2"
    >
      <View>{children}</View>
    </Animated.ScrollView>
  );
}
