import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants/colors';

const logoImg = require('../../../assets/logo.png');

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', hideText = false }) => {
  if (size === 'lg') {
    return (
      <View style={styles.containerLg}>
        <View style={styles.badgeLg}>
          <Image source={logoImg} style={styles.imageLg} resizeMode="contain" />
        </View>
        {!hideText && (
          <View style={styles.textContainerLg}>
            <Text style={styles.titleLg}>JANJATHI SHIKSHA SETU</Text>
            <Text style={styles.subtitleLg}>Ministry of Tribal Affairs</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.badge, size === 'sm' && styles.badgeSm]}>
        <Image
          source={logoImg}
          style={[styles.image, size === 'sm' && styles.imageSm]}
          resizeMode="contain"
        />
      </View>
      {!hideText && (
        <View>
          <Text style={[styles.title, size === 'sm' && styles.titleSm]}>JANJATHI SHIKSHA SETU</Text>
          <Text style={styles.subtitle}>Ministry of Tribal Affairs</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  containerLg: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeSm: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  badgeLg: {
    width: 104,
    height: 104,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageSm: {
    width: '100%',
    height: '100%',
  },
  imageLg: {
    width: '100%',
    height: '100%',
  },
  textContainerLg: {
    alignItems: 'center',
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: 0.4,
  },
  titleSm: {
    fontSize: 12,
  },
  titleLg: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: 0.6,
    marginTop: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  subtitleLg: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
});
