import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import ContactSection from './ContactSection';

interface SocialLink {
  label: string;
  url: string;
  icon?: ImageSourcePropType | string;
}

interface ProfileDataProps {
  name: string;
  realName?: string;
  bio: string;
  avatar: ImageSourcePropType | string;
  email?: string;
  social?: SocialLink[];
  handleLink?: (url: string) => void;
  theme: {
    text: string;
    textSecondary: string;
    card: string;
    link?: string;
    badge?: string;
  };
}

const ProfileData: React.FC<ProfileDataProps> = ({ name, realName, bio, avatar, email, social = [], handleLink, theme }) => {
  const avatarSource = typeof avatar === 'string' ? { uri: avatar } : avatar;
  const [showRealName, setShowRealName] = useState(false);
  const displayName = showRealName && realName ? realName : name;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: theme.text }]}>{displayName}</Text>
          {realName && (
            <TouchableOpacity
              style={[styles.toggleSwitch, { borderColor: theme.text }]}
              onPress={() => setShowRealName(!showRealName)}
            >
              <Text style={[styles.toggleIcon, { color: theme.text }]}>{showRealName ? '→' : '←'}</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Badge */}
        <View style={[styles.badge, { backgroundColor: '#ffbccd' }]}>
          <Text style={[styles.badgeText, { color: '#000' }]}>Game Developer | Web Design | Artist</Text>
        </View>

        <Text style={[styles.bio, { color: theme.textSecondary }]}>{bio}</Text>

        {/* render ContactSection inside profile */}
        {(email || social.length > 0) && (
          <ContactSection
            email={email ?? ''}
            social={social as any}
            theme={{ text: theme.text, textSecondary: theme.textSecondary, link: theme.link ?? '#007aff' }}
            handleLink={handleLink ?? (() => {})}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 230,
    height: 230,
    marginTop: 12,
    borderRadius: 115,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  toggleSwitch: {
    width: 22,
    height: 22,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    opacity: 0.3,
  },
  toggleIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
    padding: 4,
    marginTop: 12,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileData;