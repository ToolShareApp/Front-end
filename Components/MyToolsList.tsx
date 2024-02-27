import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Searchbar, Menu, Button, Divider } from 'react-native-paper'
import GlobalStateContext from '../Contexts/GlobalStateContext'
import MyToolCard from './MyToolCard'
import { GreenTheme } from '../Themes/GreenTheme'
import { useNavigation } from "@react-navigation/native";

const MyToolsList: React.FC = () => {
  const { api, user } = useContext(GlobalStateContext)
  const [tools, setTools] = useState<object[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const navigation: any = useNavigation();

  const fetchUserTools = async () => {
    try {
      const response = await api.get(`/listing/owner/${user.profile_id}`)
      if (response.status && response.data) {
        setTools(response.data.data)
      }
    } catch (error) {
      console.error('Error when retrieving a list of user tools:', error)
    }
  }

  useEffect(() => {
    fetchUserTools()
  }, [tools])

  const onChangeSearch = (query: string) => setSearchQuery(query)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const filterListings = () => {
    return tools.filter((listing: any) => {
      const matchCategory = selectedCategory === 'All' || listing.category === selectedCategory || listing.subcategory === selectedCategory
      const matchQuery = listing.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.subcategory.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchQuery
    })
  }

  const categories = ['All', ...new Set(tools.map((listing: any) => listing.category))]

  return (
    <View><View style={styles.buttonContainer}>
    <Button icon="plus" mode="outlined" style={styles.button} onPress={() => navigation.navigate('MyTools', {
      screen: 'AddListingScreen'
    })
  }
    >Add a listing</Button>
      </View>
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
        {filterListings().map(listing => (
          <MyToolCard
            key={listing.listing_id}
            listing={listing}
            listing_id={listing.listing_id}
            category={listing.category}
            name={listing.tool}
            subcategory={listing.subcategory}
            photo={listing.photo_url}
            setTools={setTools}
          />
        ))}
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
    width: "40%",
    margin: 15,
  },
})

export default MyToolsList
