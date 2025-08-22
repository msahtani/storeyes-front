import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CategoryFilterProps = {
  categories: string[];
  onCategoryChange?: (category: string) => void;
  initialCategory?: string;
};

const CategoryFilter = ({ 
  categories, 
  onCategoryChange, 
  initialCategory 
}: CategoryFilterProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || categories[0]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const getCategoryTranslation = (category: string) => {
    switch(category) {
      case 'All':
        return t('all');
      case 'Cleaning Table':
        return t('categories.cleaningTable');
      case 'Serving Table':
        return t('categories.servingTable');
      case 'Food':
        return t('food');
      case 'Drink':
        return t('drink');
      default:
        return category;
    }
  };

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.tabsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              selectedCategory === category && styles.selectedTab
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={[
              styles.tabText,
              selectedCategory === category && styles.selectedTabText
            ]}>
              {getCategoryTranslation(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  selectedTab: {
    backgroundColor: '#2691A3',
  },
  tabText: {
    color: '#2691A3',
    fontSize: 14,
  },
  selectedTabText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CategoryFilter; 