import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { demoStudentData } from '@/constants/demoData';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  IndianRupee, 
  Calendar, 
  Gift, 
  Sparkles,
  Building
} from 'lucide-react-native';
import { useLanguageStore } from '@/store/language.store';

export default function ScholarshipDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const schemeId = params.id;
  const { t } = useLanguageStore();

  const scheme = 
    demoStudentData.schemes.find((s) => s.id === schemeId) || 
    demoStudentData.schemes[0];

  const eligibilityList = scheme.eligibility && scheme.eligibility.length > 0 
    ? scheme.eligibility 
    : [
        'Must belong to a recognized Scheduled Tribe (ST) community.',
        'Family income verified below notified state threshold.',
        'Enrolled in a recognized educational institution.'
      ];

  const benefitsList = scheme.benefits && scheme.benefits.length > 0
    ? scheme.benefits
    : [
        'Direct Benefit Transfer (DBT) into Aadhaar seeded bank account.',
        'Course tuition fee reimbursement and academic allowances.',
        'Hostel/Day Scholar maintenance assistance.'
      ];

  const handleApply = () => {
    router.push({ pathname: '/apply/[schemeId]', params: { schemeId: scheme.id } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>{scheme.name}</Text>
          <Text style={styles.headerSub}>Ministry of Tribal Affairs • Official Scheme</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Banner Card */}
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
            <View style={styles.rupeeIconCircle}>
              <IndianRupee size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.amountLabel}>ANNUAL FINANCIAL ASSISTANCE</Text>
              <Text style={styles.amountValue}>{scheme.maxAmount || scheme.amount}</Text>
            </View>
          </View>

          {scheme.deadline && (
            <View style={styles.deadlineRow}>
              <Calendar size={13} color={colors.warning} />
              <Text style={styles.deadlineText}>Application Deadline: {scheme.deadline}</Text>
            </View>
          )}
        </View>

        {/* Benefits & Entitlements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SCHOLARSHIP BENEFITS & COVERAGE</Text>
          <View style={styles.criteriaBox}>
            {benefitsList.map((benefit, idx) => (
              <View key={idx} style={styles.critRow}>
                <Gift size={16} color={colors.secondary} />
                <Text style={styles.critText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Eligibility Criteria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ELIGIBILITY CRITERIA</Text>
          <View style={styles.criteriaBox}>
            {eligibilityList.map((crit, idx) => (
              <View key={idx} style={styles.critRow}>
                <CheckCircle size={16} color={colors.primary} />
                <Text style={styles.critText}>{crit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reusable Documents Vault */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ONE-WALLET REUSABLE DOCUMENTS</Text>
          <View style={styles.criteriaBox}>
            <View style={styles.critRow}>
              <ShieldCheck size={16} color={colors.primary} />
              <Text style={styles.critText}>Scheduled Tribe (ST) Certificate (Digital Verified)</Text>
            </View>
            <View style={styles.critRow}>
              <FileText size={16} color={colors.secondary} />
              <Text style={styles.critText}>Income Certificate (Current Financial Year)</Text>
            </View>
            <View style={styles.critRow}>
              <Building size={16} color={colors.accent} />
              <Text style={styles.critText}>Aadhaar-Linked Active DBT Bank Account</Text>
            </View>
          </View>
        </View>

        {/* Apply CTA */}
        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={handleApply}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color="#FFFFFF" />
          <Text style={styles.applyBtnText}>Proceed to One-Click Application</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
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
    paddingVertical: 3.5,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  schemeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.charcoal,
    lineHeight: 23,
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
    gap: 12,
    marginTop: 16,
    padding: 14,
    backgroundColor: '#F9F7F4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rupeeIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.charcoal,
    marginTop: 2,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F1EE',
  },
  deadlineText: {
    fontSize: 11,
    color: colors.warning,
    fontWeight: '700',
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
    gap: 12,
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
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
});
