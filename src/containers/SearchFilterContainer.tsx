import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import TimeFilterDropdown from '../components/TimeFilterDropdown';

type SearchFilterContainerProps = {
  categories: string[];
  timeOptions: string[];
  onSearch?: (text: string) => void;
  onCategoryChange?: (category: string) => void;
  onTimeChange?: (time: string) => void;
  onFilter?: () => void;
};

const SearchFilterContainer = ({
  categories,
  timeOptions,
  onSearch,
  onCategoryChange,
  onTimeChange,
  onFilter
}: SearchFilterContainerProps) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} onFilter={onFilter} />
      <TimeFilterDropdown 
        options={timeOptions} 
        onSelect={onTimeChange} 
        label={t('mealListing')} 
      />

      <CategoryFilter 
        categories={categories} 
        onCategoryChange={onCategoryChange} 
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    borderRadius: 10,
    marginTop: 15,
  },
});

export default SearchFilterContainer; 