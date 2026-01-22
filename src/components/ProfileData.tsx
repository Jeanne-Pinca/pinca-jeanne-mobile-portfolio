import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import ContactSection from './ContactSection';

interface SocialLink {
  label: string;
  url: string;
  icon?: ImageSourcePropType | string;
}

interface ProfileDataProps {
  name: string;
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

const ProfileData: React.FC<ProfileDataProps> = ({ name, bio, avatar, email, social = [], handleLink, theme }) => {
  const avatarSource = typeof avatar === 'string' ? { uri: avatar } : avatar;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
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
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
    padding: 4,
    marginTop: 12,
  },
});

export default ProfileData;