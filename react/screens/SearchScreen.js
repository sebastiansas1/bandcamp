import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';

import colors from '../consts/colors';
import { capitalize } from '../utils/StringUtility';
import { InputField, Icon, SearchResultCard } from '../components';

import styles from './styles/SearchScreenStyles';
import { endpoints } from '../utils/ApiUtility';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.length === 0) return setSearchResults([]);
    if (query.length > 2) searchForQuery(query);
  }, [query]);

  const searchForQuery = async () => {
    const url = `${endpoints.search}?query=${query.toLowerCase()}&page=1`;
    try {
      const { data } = await axios.get(url);
      const searchData = data.results.map((item, index) => {
        return { ...item, id: index, type: capitalize(item.type) };
      });
      return setSearchResults(searchData);
    } catch (error) {
      alert(error);
    }
  };

  const navigateToResult = (itemId) => {
    const searchItem = searchResults.find(({ id }) => id === itemId);
    if (searchItem.type === 'Artist') navigation.navigate('Artist', searchItem);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
  };

  const renderSearchResults = ({ item }) => {
    let subtitle;
    let paragraph;
    switch (item.type) {
      case 'Artist':
        subtitle = `${item.location} • ${item.genre}`;
        paragraph = item.type;
        break;
      case 'Album':
        subtitle = `${item.releaseDate}`;
        paragraph = `${item.type} • ${item.artist}`;
        break;
      case 'Track':
        subtitle = `${item.releaseDate}`;
        paragraph = `${item.type} • ${item.artist}`;
        break;
      default:
        paragraph = item.type;
        break;
    }
    return (
      <SearchResultCard
        id={item.id}
        title={item.name}
        subtitle={subtitle}
        imageUrl={item.imageUrl}
        paragraph={paragraph}
        onPress={navigateToResult}
        roundImage={item.type === 'Artist'}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <InputField
        placeholder="Artists, albums, or songs"
        value={query}
        onChange={(value) => setQuery(value)}
        startSlot={
          <Icon name="search" color={query ? colors.white : colors.lightGray} size={24} style={styles.startSlot} />
        }
        endSlot={
          query.length > 0 && (
            <Icon name="close" size={24} color={colors.white} style={styles.endSlot} onPress={clearSearch} />
          )
        }
      />
      <View style={styles.resultsContainer}>
        {searchResults.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults}
            keyExtractor={({ url }) => url.toString()}
            renderItem={renderSearchResults}
          />
        )}
      </View>
    </View>
  );
}
