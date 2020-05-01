import React from 'react';
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import Typography from './Typography';
import styles from './styles/AlbumCardStyles';

export default function AlbumCard({ album, onPress }) {
  const { title, raw, imageUrl } = album;
  const subtitle = raw['album_release_date'].slice(0, 12);
  const paragraph = `Tracks: ${album.tracks && album.tracks.length}`;
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
        <Image width={20} source={{ uri: imageUrl }} style={{ ...styles.image, width: 75, height: 75 }} />
        <View style={{ ...styles.header, height: 75 }}>
          <Typography maxChar={25} style={styles.title} text={title} tag="h2" />
          <Typography maxChar={40} style={styles.subtitle} text={subtitle} tag="p" />
          <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
