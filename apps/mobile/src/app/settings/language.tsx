import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, Check, Globe2, Volume2, Sparkles, Home } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language.store';
import { LanguageCode } from '@/constants/translations';

interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
  isPopular?: boolean;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'National / Official', isPopular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'National / MP, CG, RJ, JH', isPopular: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh, Telangana', isPopular: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu', isPopular: true },
  { code: 'bn', name: 'Bengali / Santhali', nativeName: 'বাংলা / ᱥᱟᱱᱛᱟᱲᱤ', region: 'West Bengal, Jharkhand, Odisha', isPopular: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'gon', name: 'Gondi', nativeName: 'गोंडी (Koya)', region: 'Central India Tribal Belt' },
  { code: 'sat', name: 'Santali (Ol Chiki)', nativeName: 'ᱚᱞ ᱪᱤᱠᱤ', region: 'Santhal Parganas, Mayurbhanj' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', region: 'Mizoram, Tripura' },
  { code: 'kha', name: 'Khasi', nativeName: 'Ka Ktien Khasi', region: 'Meghalaya' },
];

export default function LanguageSettingsScreen() {
  const { language: currentLang, setLanguage, t } = useLanguageStore();
  const [saved, setSaved] = useState(false);

  const handleSelectLanguage = async (code: LanguageCode) => {
    await setLanguage(code);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{t('lang.header_title', 'Multilingual Preferences')}</Text>
          <Text style={styles.headerSub}>{t('lang.header_sub', 'Select language for portal & guidance')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.homeShortcutBtn} 
          onPress={() => router.push('/(tabs)')}
        >
          <Home size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.infoBanner}>
          <Globe2 size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>{t('lang.banner_title', 'Constitutional Language Inclusivity')}</Text>
            <Text style={styles.infoDesc}>
              {t('lang.banner_desc', 'Janjathi Shiksha Setu supports official scheduled and tribal dialect scripts. JAGO AI guidance adapts to your preferred dialect.')}
            </Text>
          </View>
        </View>

        {saved && (
          <View style={styles.savedAlert}>
            <Check size={16} color="#FFFFFF" />
            <Text style={styles.savedAlertText}>
              {t('lang.saved_success', 'Language preference updated successfully!')}
            </Text>
          </View>
        )}

        <Text style={styles.sectionHeader}>{t('lang.section_title', 'SUPPORTED LANGUAGES & SCRIPTS')}</Text>

        <View style={styles.langList}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langCard, isSelected && styles.langCardSelected]}
                onPress={() => handleSelectLanguage(lang.code)}
                activeOpacity={0.7}
              >
                <View style={styles.langCardLeft}>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <View>
                    <View style={styles.langTitleRow}>
                      <Text style={[styles.langNative, isSelected && styles.langNativeSelected]}>
                        {lang.nativeName}
                      </Text>
                      {lang.isPopular && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularBadgeText}>{t('lang.popular', 'Popular')}</Text>
                        </View>
                      )}
                      {isSelected && (
                        <View style={styles.activeBadge}>
                          <Text style={styles.activeBadgeText}>{t('lang.active', 'Active')}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langRegion}>{lang.region}</Text>
                  </View>
                </View>

                {isSelected ? (
                  <View style={styles.checkIconBadge}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.voicePreviewBtn}
                    onPress={() => Alert.alert('Voice Guidance', `Audio instructions in ${lang.nativeName} activated.`)}
                  >
                    <Volume2 size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footerNote}>
          <Sparkles size={16} color={colors.primary} />
          <Text style={styles.footerNoteText}>
            {t('lang.audio_note', 'Audio narration for tribal dialects (Gondi, Santali, Bhili) powered by AI Bhashini Speech Pipeline.')}
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
  homeShortcutBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6D3',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  infoDesc: {
    fontSize: 11,
    color: '#124127',
    lineHeight: 16,
  },
  savedAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
  savedAlertText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 6,
  },
  langList: {
    gap: 10,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  langCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F7FCF9',
    borderWidth: 1.5,
  },
  langCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  langTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langNative: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
  },
  langNativeSelected: {
    color: colors.primary,
  },
  popularBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
  },
  activeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  langName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 1,
  },
  langRegion: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  checkIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicePreviewBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F3F1EE',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F3F1EE',
    borderRadius: 10,
  },
  footerNoteText: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    flex: 1,
  },
});
