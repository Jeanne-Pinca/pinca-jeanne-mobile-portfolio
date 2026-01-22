import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, Text } from 'react-native';

interface SocialLink {
  label: string;
  url: string;
  icon?: ImageSourcePropType;
}

interface Theme {
  text: string;
  textSecondary: string;
  link: string;
  background?: string;
  card?: string;
}

interface ContactSectionProps {
  email?: string;
  social: SocialLink[];
  theme: Theme;
  handleLink: (url: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, social, theme, handleLink }) => {
  if (!social || social.length === 0) return null;

  return (
    <View style={styles.section}>
      
      <View style={styles.socialRow}>
        {social.map((item, index) => (
          <TouchableOpacity
            key={`${item.label}-${index}`}
            onPress={() => handleLink(item.url)}
            style={styles.iconButton}
            activeOpacity={0.7}
            accessibilityLabel={item.label}
          >
            {item.icon && (
              <Image 
                source={item.icon} 
                style={styles.icon} 
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  emailButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 24,
    alignSelf: 'center',
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 13,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 13,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default ContactSection;