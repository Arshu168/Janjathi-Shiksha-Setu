import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, CheckCircle2, Building, ShieldCheck, ArrowUpRight } from 'lucide-react-native';

export default function PaymentsScreen() {
  const transactions = [
    {
      id: 'tx-1',
      scheme: 'Post-Matric Scholarship for ST Students',
      amount: 18500,
      date: '12 Sep 2026',
      ref: 'PFMS/2026/DBT/98124',
      status: 'CREDITED',
      bank: 'State Bank of India (•••4821)',
      component: 'Academic Tuition & Maintenance Allowance',
    },
    {
      id: 'tx-2',
      scheme: 'National Fellowship for Higher Education of ST Students',
      amount: 31000,
      date: '15 Jul 2026',
      ref: 'PFMS/2026/DBT/61042',
      status: 'CREDITED',
      bank: 'State Bank of India (•••4821)',
      component: 'Quarterly Research Stipend',
    },
    {
      id: 'tx-3',
      scheme: 'Pre-Matric Scholarship for ST Students (Class IX-X)',
      amount: 3500,
      date: '28 Mar 2025',
      ref: 'PFMS/2025/DBT/11902',
      status: 'CREDITED',
      bank: 'Punjab National Bank (•••9014)',
      component: 'Books & Stationery Grant',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>DBT Disbursal History</Text>
          <Text style={styles.headerSub}>Public Financial Management System (PFMS)</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <Text style={styles.statsSub}>Total Direct Benefit Transferred</Text>
          <Text style={styles.statsAmount}>₹53,000</Text>
          <View style={styles.verifiedRow}>
            <ShieldCheck size={14} color={colors.primary} />
            <Text style={styles.verifiedText}>Aadhaar Seeding Status: Active & Validated</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>TRANSACTION TIMELINE</Text>

        <View style={styles.txList}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txCard}>
              <View style={styles.txHeader}>
                <View>
                  <Text style={styles.txAmount}>₹{tx.amount.toLocaleString('en-IN')}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <CheckCircle2 size={12} color={colors.primary} />
                  <Text style={styles.statusBadgeText}>{tx.status}</Text>
                </View>
              </View>

              <Text style={styles.txScheme}>{tx.scheme}</Text>
              <Text style={styles.txComponent}>{tx.component}</Text>

              <View style={styles.txFooter}>
                <View style={styles.bankRow}>
                  <Building size={13} color={colors.textSecondary} />
                  <Text style={styles.bankText}>{tx.bank}</Text>
                </View>
                <Text style={styles.refText}>Ref: {tx.ref}</Text>
              </View>
            </View>
          ))}
        </View>
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
    fontSize: 16,
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
  statsCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsSub: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statsAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.charcoal,
    marginTop: 4,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  txList: {
    gap: 12,
  },
  txCard: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  txAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
  },
  txDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.primary,
  },
  txScheme: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 2,
  },
  txComponent: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  txFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F1EE',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bankText: {
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  refText: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
