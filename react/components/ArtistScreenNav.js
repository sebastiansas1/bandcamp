import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from './Icon';
import styles from './styles/ArtistScreenNavStyles';
import colors from '../consts/colors';

export default function ArtistScreenNav({
  imageUrl,
  headerText,
  headerOpacity = 0,
  onBack,
  onMore,
  onFollow,
  followButtonOpacity = 1,
}) {
  const [navBarBackground, setNavBarBackground] = useState(`rgba(0,0,0, ${headerOpacity})`);

  useEffect(() => {
    setNavBarBackground(`rgba(0,0,0, ${headerOpacity})`);
  }, [headerOpacity]);

  return (
    <View style={{ ...styles.container, backgroundColor: navBarBackground }}>
      <TouchableOpacity style={styles.arrowIcon} onPress={onBack} activeOpacity={0.4}>
        <Icon name="chevron-left" color={colors.white} size={35} />
      </TouchableOpacity>
      {followButtonOpacity < 0 && (
        <View style={{ opacity: headerOpacity }}>
          <TouchableOpacity style={styles.header}>
            <Image source={{ uri: imageUrl, height: 40, width: 40 }} style={styles.headerImage} />
            <Text style={styles.headerText}>{headerText}</Text>
          </TouchableOpacity>
        </View>
      )}
      {followButtonOpacity > 0 && (
        <View style={{ opacity: followButtonOpacity }}>
          <TouchableOpacity style={styles.followButton} onPress={onFollow} activeOpacity={0.8}>
            <Text style={styles.followText}>+ FOLLOW</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.moreIcon} onPress={onMore} activeOpacity={0.4}>
        <Icon name="more-horiz" color={colors.white} size={25} />
      </TouchableOpacity>
    </View>
  );
}
