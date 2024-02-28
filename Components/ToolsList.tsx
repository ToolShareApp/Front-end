import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import GlobalStateContext from '../Contexts/GlobalStateContext'
import ToolCard from './ToolCard'
import { ScrollView } from 'react-native-gesture-handler'
import { Searchbar, Menu, Divider, Button, PaperProvider, Text } from 'react-native-paper'
import { GreenTheme } from '../Themes/GreenTheme'
import Loader from './Loader'

export default function ToolsList () {
  const { api } = useContext(GlobalStateContext)
  const [listings, setListings] = useState<object[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  function getListings () {
    return api.get(`/listing/`).then((apiResponse: any) => {
      const {
        data: { data },
      } = apiResponse
      return data
    })
  }

  useEffect(() => {
    getListings().then((response: any) => {
      setListings(response)
      setLoading(false)
    })
  }, [])

  const onChangeSearch = (query: string) => setSearchQuery(query)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const filterListings = () => {
    return listings.filter((listing: any) => {
      const matchCategory = selectedCategory === 'All' || listing.category === selectedCategory || listing.subcategory === selectedCategory
      const matchQuery = listing.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.subcategory.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchQuery
    })
  }

  const categories = ['All', ...new Set(listings.map((listing: any) => listing.category))]

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        theme={GreenTheme}
        iconColor={GreenTheme.colors.primary}
        style={{ borderRadius: 0, elevation: 0 }}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            icon="menu-down"
            mode="contained"
            onPress={openMenu}
            theme={GreenTheme}
            style={styles.squareButton}
            contentStyle={styles.squareButtonContent}
            labelStyle={{ color: GreenTheme.colors.lightText }}
          >
            {selectedCategory}
          </Button>
        }>
        {categories.map((category, index) => (
          <Menu.Item key={index} onPress={() => {
            setSelectedCategory(category)
            closeMenu()
          }} title={category}/>
        ))}
      </Menu>
      <Divider theme={GreenTheme}/>

      <ScrollView>
        {loading ? (
            <Loader message={'Loading Tools...'} visible={loading} />
        ) : (
          <>
            { filterListings().map(listing => (
              <ToolCard
                key={listing.listing_id}
                listing_id={listing.listing_id}
                category={listing.category}
                name={listing.tool}
                subcategory={listing.subcategory}
                photo={listing.photo_url}
              />
            )) }
          </>
          )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  squareButton: {
    margin: 10,
    height: 50,
    backgroundColor: GreenTheme.colors.primary,
  },
  squareButtonContent: {
    height: 50,
  },
})