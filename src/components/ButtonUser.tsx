import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
  disabled?: boolean; // Add disabled prop
  style?: StyleProp<ViewStyle>; // Support for external styles
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, disabled, style, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={({ pressed }) => [
          styles.container,
          disabled ? styles.disabled : null, // Apply disabled styles
          pressed && !disabled ? styles.pressed : null, // Add pressed state style
          style, // Allow external styles to override
        ]}
        onPress={disabled ? null : pressableProps.onPress} // Prevent action if disabled
      >
        <Text style={[styles.text, disabled ? styles.disabledText : null]}>
          {text}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.userBtn,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  disabled: {
    backgroundColor: 'gray', // Change the background color for the disabled state
    opacity: 0.6, // Add transparency to indicate disabled state
  },
  pressed: {
    opacity: 0.8, // Optional: Change opacity for pressed state
  },
  disabledText: {
    color: 'lightgray', // Optional: Change text color for disabled state
  },
});

export default Button;