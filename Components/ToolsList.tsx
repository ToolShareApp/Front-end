import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import ToolCard from "./ToolCard";
import { ScrollView } from "react-native-gesture-handler";
import {
  Searchbar,
  Menu,
  Divider,
  Button,
  PaperProvider,
  Text,
} from "react-native-paper";
import { GreenTheme } from "../Themes/GreenTheme";
import Loader from "./Loader";

export default function ToolsList() {
  const { api, user } = useContext(GlobalStateContext);
  const [listings, setListings] = useState<object[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [visibleSubcategory, setVisibleSubcategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [filterByInterested, setFilterByInterested] = useState<boolean>(false);
  const [interestedList, setInterestedList] = useState<object[] | []>([])

  function getListings() {
    return api.get(`/listing/`).then((apiResponse: any) => {
      const {
        data: { data },
      } = apiResponse;
      const otherUsersListings: object[] = data.filter(
        (tool: object) => tool?.owner_id !== user?.profile_id
      );
      return otherUsersListings;
    });
  }

  function getSubcategoriesByCategory(selectedCategory: string) {
    return api
      .get(`/listing/subcategories/${selectedCategory}`)
      .then((apiResponse) => {
        const {
          data: { data },
        } = apiResponse;
        const subcategories = ["All", ...data];
        return subcategories;
      });
  }

  function getInterestedToolsByUserID(currentUser_id: number) {
    return api.get(`/interest/lendee/${currentUser_id}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      return data;
    });
  }

  const getInterestedTools = async () => {
    const response = await getInterestedToolsByUserID(user.profile_id);
    setInterestedList(response);
  };
  
  useEffect(() => {
    getListings().then((response: object[]) => {
      setListings(response);
      setLoading(false);
    });
    getSubcategoriesByCategory(selectedCategory).then((response: string[]) => {
      setSubcategories(response);
    });
  }, [selectedCategory]);
  
  useEffect(() => {
    if (filterByInterested) {
      getInterestedTools();
    }
  }, [filterByInterested]);
  
  const applyInterestedFilter = () => {
    setFilterByInterested(true);
  };
  
  const removeInterestedFilter = () => {
    setInterestedList([]);
    setFilterByInterested(false);
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const openCategoryMenu = () => setVisibleCategory(true);
  const openSubcategoryMenu = () => setVisibleSubcategory(true);

  const closeCategoryMenu = () => setVisibleCategory(false);
  const closeSubcategoryMenu = () => setVisibleSubcategory(false);

  const filterListings = () => {
    return listings.filter((listing: {category: string, subcategory: string, tool: string, listing_id: string}) => {
      const matchCategory = selectedCategory === "All" || listing.category === selectedCategory;
      const matchSubcategory = selectedSubcategory === "All" || listing.subcategory === selectedSubcategory;
      const matchQuery = listing.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchInterested = interestedList.length === 0 || interestedList.some(
        (interestedTool: {listing_id: string}) => interestedTool.listing_id === listing.listing_id
      );

      return matchCategory && matchSubcategory && matchQuery && matchInterested;
    });
  };

  const categories = [
    "All",
    ...new Set(listings.map((listing: any) => listing.category)),
  ];

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
        visible={visibleCategory}
        onDismiss={closeCategoryMenu}
        anchor={
          <Button
            icon="menu-down"
            mode="contained"
            onPress={openCategoryMenu}
            theme={GreenTheme}
            style={styles.squareButton}
            contentStyle={styles.squareButtonContent}
            labelStyle={{ color: GreenTheme.colors.lightText }}
          >
            {selectedCategory}
          </Button>
        }
      >
        {categories.map((category, index) => (
          <Menu.Item
            key={index}
            onPress={() => {
              setSelectedCategory(category);
              setSelectedSubcategory("All");
              closeCategoryMenu();
            }}
            title={category}
          />
        ))}
      </Menu>
      {selectedCategory !== "All" ? (
        <Menu
          visible={visibleSubcategory}
          onDismiss={closeSubcategoryMenu}
          anchor={
            <Button
              icon="menu-down"
              mode="contained"
              onPress={openSubcategoryMenu}
              theme={GreenTheme}
              style={styles.squareButton}
              contentStyle={styles.squareButtonContent}
              labelStyle={{ color: GreenTheme.colors.lightText }}
            >
              {selectedSubcategory}
            </Button>
          }
        >
          {subcategories.map((subcategory, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                setSelectedSubcategory(subcategory);
                closeSubcategoryMenu();
              }}
              title={subcategory}
            />
          ))}
        </Menu>
      ) : null}
      { !filterByInterested ?
      <Button
        icon="star"
        mode="contained"
        onPress={applyInterestedFilter}
        theme={GreenTheme}
        style={styles.squareButton}
        contentStyle={styles.squareButtonContent}
        labelStyle={{ color: GreenTheme.colors.lightText }}
      >
       Tools You're Interested In
      </Button>
      : 
      <Button
        icon="star"
        mode="contained"
        onPress={removeInterestedFilter}
        theme={GreenTheme}
        style={styles.removeButton}
        contentStyle={styles.squareButtonContent}
        labelStyle={{ color: GreenTheme.colors.lightText }}
      >
       Remove Filter By Interested
      </Button>}
      <Divider theme={GreenTheme} />

      <ScrollView>
        {loading ? (
          <Loader message={"Loading Tools..."} visible={loading} />
        ) : (
          <>
            {filterListings().map((listing) => (
              <ToolCard
                key={listing.listing_id}
                listing_id={listing.listing_id}
                category={listing.category}
                name={listing.tool}
                subcategory={listing.subcategory}
                photo={listing.photo_url}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  squareButton: {
    margin: 10,
    height: 50,
    backgroundColor: GreenTheme.colors.primary,
  },
  removeButton: {
    margin: 10,
    height: 50,
    backgroundColor: "grey"
  },
  squareButtonContent: {
    height: 50,
  },
});
