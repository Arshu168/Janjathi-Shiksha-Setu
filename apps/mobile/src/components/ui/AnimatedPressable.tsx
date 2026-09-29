import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  children: React.ReactNode;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  style,
  scaleTo = 0.96,
  children,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: any) => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 80,
    }).start();
    onPressOut?.(e);
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <Pressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
