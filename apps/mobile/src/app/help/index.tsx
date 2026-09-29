import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, Phone, Mail, Globe, MapPin, ShieldCheck, ExternalLink } from 'lucide-react-native';

export default function HelpScreen() {
  const helplines = [
    { title: 'National ST Scholarship Helpdesk', value: '1800-11-2001', type: 'phone', desc: 'Toll-free national query resolution (9:30 AM - 5:30 PM)' },
    { title: 'DBT Payment Disbursal Cell', value: '011-2338-8427', type: 'phone', desc: 'Direct Benefit Transfer & Aadhaar linking queries' },
    { title: 'Email Grievance Redressal', value: 'scholarship-mota@nic.in', type: 'email', desc: 'Official grievance and deficiency appeals' },
    { title: 'Official MoTA Portal', value: 'https://tribal.nic.in', type: 'web', desc: 'Ministry of Tribal Affairs Gazette & Notifications' },
  ];

  const handleAction = (item: any) => {
    if (item.type === 'phone') Linking.openURL(`tel:${item.value}`);
    if (item.type === 'email') Linking.openURL(`mailto:${item.value}`);
    if (item.type === 'web') Linking.openURL(item.value);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Helpline & Support</Text>
          <Text style={styles.headerSub}>Ministry of Tribal Affairs grievance channels</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <ShieldCheck size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Official Assistance Protocol</Text>
            <Text style={styles.bannerDesc}>
              ST scholarship queries are resolved within 48 business hours as per Ministry of Tribal Affairs Public Service Guarantee.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>DIRECT HELPLINE CHANNELS</Text>

        <View style={styles.list}>
          {helplines.map((h, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.card} 
              onPress={() => handleAction(h)}
              activeOpacity={0.7}
            >
              <View style={styles.iconBadge}>
                {h.type === 'phone' && <Phone size={18} color={colors.primary} />}
                {h.type === 'email' && <Mail size={18} color={colors.secondary} />}
                {h.type === 'web' && <Globe size={18} color={colors.accent} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{h.title}</Text>
                <Text style={styles.cardValue}>{h.value}</Text>
                <Text style={styles.cardDesc}>{h.desc}</Text>
              </View>
              <ExternalLink size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.officeBox}>
          <View style={styles.officeHeader}>
            <MapPin size={18} color={colors.primary} />
            <Text style={styles.officeTitle}>Ministry Headquarters</Text>
          </View>
          <Text style={styles.officeText}>
            Ministry of Tribal Affairs, Government of India{'\n'}
            Shastri Bhawan, Dr. Rajendra Prasad Road,{'\n'}
            New Delhi - 110001
          </Text>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6D3',
    marginBottom: 18,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  bannerDesc: {
    fontSize: 11,
    color: '#124127',
    lineHeight: 16,
  },
  sectionHeader: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3F1EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.charcoal,
  },
  cardValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 1,
  },
  cardDesc: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  officeBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  officeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  officeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.charcoal,
  },
  officeText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
