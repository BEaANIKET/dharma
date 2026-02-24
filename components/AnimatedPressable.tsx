import { ReactNode, useRef } from "react";
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type AnimatedPressableProps = PressableProps & {
  children: ReactNode;
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function AnimatedPressable({
  children,
  onPress,
  onPressIn,
  onPressOut,
  className,
  disabled,
  containerStyle,
  ...rest
}: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn: PressableProps["onPressIn"] = (event) => {
    if (!disabled) {
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    }
    onPressIn?.(event);
  };

  const handlePressOut: PressableProps["onPressOut"] = (event) => {
    if (!disabled) {
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, containerStyle]}>
      <Pressable
        {...rest}
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={className}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
