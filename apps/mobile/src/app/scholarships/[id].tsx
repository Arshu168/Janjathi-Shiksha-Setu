import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { demoStudentData } from '@/constants/demoData';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle, FileText, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react-native';

export default function ScholarshipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = demoStudentData.schemes.find((s) => s.id === id) || demoStudentData.schemes[0];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>{scheme.name}</Text>
          <Text style={styles.headerSub}>Ministry of Tribal Affairs Scheme</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Card */}
        <View style={styles.mainCard}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{scheme.short}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{scheme.statusLabel}</Text>
            </View>
          </View>
          <Text style={styles.schemeTitle}>{scheme.name}</Text>
          <Text style={styles.schemeDesc}>{scheme.desc}</Text>

          <View style={styles.amountBox}>
            <IndianRupee size={20} color={colors.primary} />
            <View>
              <Text style={styles.amountLabel}>ANNUAL FINANCIAL ASSISTANCE</Text>
              <Text style={styles.amountValue}>{scheme.maxAmount}</Text>
            </View>
          </View>
        </View>

        {/* Eligibility Criteria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ELIGIBILITY CRITERIA</Text>
          <View style={styles.criteriaBox}>
            {scheme.eligibility.map((crit, idx) => (
              <View key={idx} style={styles.critRow}>
                <CheckCircle size={16} color={colors.primary} />
                <Text style={styles.critText}>{crit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Required Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ONE-WALLET REUSABLE DOCUMENTS</Text>
          <View style={styles.criteriaBox}>
            <View style={styles.critRow}>
              <FileText size={16} color={colors.secondary} />
              <Text style={styles.critText}>Scheduled Tribe (ST) Certificate (Digital Verified)</Text>
            </View>
            <View style={styles.critRow}>
              <FileText size={16} color={colors.secondary} />
              <Text style={styles.critText}>Income Certificate (Below ₹2.50 Lakh / Annum)</Text>
            </View>
            <View style={styles.critRow}>
              <FileText size={16} color={colors.secondary} />
              <Text style={styles.critText}>Aadhaar-Linked Active DBT Bank Account</Text>
            </View>
          </View>
        </View>

        {/* Apply CTA */}
        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={() => router.push({ pathname: '/apply/[schemeId]', params: { schemeId: scheme.id } })}
          activeOpacity={0.85}
        >
          <Text style={styles.applyBtnText}>Proceed to Application</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 54,
    paddingBottom: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F1EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
  },
  headerSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  statusBadge: {
    backgroundColor: '#EBF5EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.charcoal,
    lineHeight: 22,
  },
  schemeDesc: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 8,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9F7F4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
    marginTop: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  criteriaBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  critRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  critText: {
    fontSize: 12,
    color: colors.charcoal,
    flex: 1,
    lineHeight: 17,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
