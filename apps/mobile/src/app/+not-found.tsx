import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { Home, Compass } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Compass size={40} color={colors.primary} />
      </View>
      <Text style={styles.title}>Page Under Construction</Text>
      <Text style={styles.desc}>
        The section you are trying to reach is being synchronized with the Janjathi Shiksha Setu national portal.
      </Text>
      <TouchableOpacity 
        style={styles.homeBtn} 
        onPress={() => router.replace('/(tabs)')}
        activeOpacity={0.8}
      >
        <Home size={18} color="#FFFFFF" />
        <Text style={styles.homeBtnText}>Return to Portal Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
