import React, { useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    // Inject high-polish interactive link and button click animation CSS
    const styleId = 'jss-click-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* Tactile interactive feedback on all links, buttons, and touchable elements */
        a, button, [role="button"], [role="tab"], [tabindex="0"], div[style*="cursor: pointer"] {
          transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.16s ease, filter 0.12s ease !important;
          cursor: pointer !important;
          -webkit-tap-highlight-color: transparent;
        }

        /* Subtle lift and glow on hover */
        a:hover, button:hover, [role="button"]:hover, div[style*="cursor: pointer"]:hover {
          transform: translateY(-1.5px);
          filter: brightness(1.02);
        }

        /* Tactile spring compression on click/tap */
        a:active, button:active, [role="button"]:active, [role="tab"]:active, div[style*="cursor: pointer"]:active {
          transform: scale(0.94) translateY(1px) !important;
          filter: brightness(0.93) !important;
        }

        /* Tab bar link items tactile compression */
        [role="tab"]:active {
          transform: scale(0.88) !important;
        }

        /* Screen fade-in transition */
        [data-testid="route-container"], [style*="flex: 1"] > [style*="position: absolute"] {
          animation: routeEnter 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes routeEnter {
          from {
            opacity: 0.85;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar for mobile container */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(26, 92, 56, 0.2);
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);
    }

    // Dynamic click ripple animation on links and interactive elements
    const handlePointerDown = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [role="button"], [role="tab"], div[style*="cursor: pointer"], [data-focusable="true"]'
      ) as HTMLElement | null;

      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.4;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'radial-gradient(circle, rgba(26, 92, 56, 0.22) 0%, rgba(26, 92, 56, 0) 70%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0.2)';
      ripple.style.opacity = '1';
      ripple.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease-out';
      ripple.style.zIndex = '9999';

      const prevPos = window.getComputedStyle(target).position;
      if (prevPos === 'static') {
        target.style.position = 'relative';
      }
      target.style.overflow = 'hidden';
      target.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => {
        ripple.remove();
      }, 450);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webWrapper}>
        <View style={styles.mobileFrame}>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EBE7DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    height: '100%',
    backgroundColor: '#F9F7F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
    overflow: 'hidden',
  },
});

