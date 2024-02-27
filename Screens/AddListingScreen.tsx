import React, { useContext, useEffect, useState } from "react";
import { TextInput, Switch, Text, Button, Snackbar } from "react-native-paper";
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GreenTheme } from "../Themes/GreenTheme";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import DropDownPicker from "react-native-dropdown-picker";
import Alert from "../Components/Alert";
import { useNavigation } from "@react-navigation/native";

const AddListingScreen: React.FC = () => {
  const { api, user } = useContext(GlobalStateContext);
  const navigation: any = useNavigation()
  const [toolName, setToolName] = useState<string | null>(null);
  const [categoryValues, setCategoryValues] = useState<string[]>();
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [subcategoryValues, setSubcategoryValues] = useState<string[]>();
  const [subcategorySelected, setSubcategorySelected] = useState<string | null>(null);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] =
    useState<boolean>(false);
  const [isDepositRequired, setIsDepositRequired] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showInvalidUrlAlert, setShowInvalidUrlAlert] = useState<boolean>(false);
  const [showInvalidAmountAlert, setShowInvalidAmountAlert] = useState<boolean>(false);
  const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState<boolean>(false);
  const [successVisible, setSuccessVisible] = useState<boolean>(false)

  function postNewListing(
    toolName: string,
    categorySelected: string,
    subcategorySelected: string,
    isDepositRequired: boolean | null,
    depositAmount: number | null,
    description: string | null,
    photoUrl: string | null
  ) {
    return api.post("/listing", {
      owner_id: user.profile_id,
      tool: toolName,
      category: categorySelected,
      subcategory: subcategorySelected,
      deposit_required: isDepositRequired,
      deposit_amount: depositAmount,
      description: description,
      photo_url: photoUrl,
    });
  }

  function handleTapOutside() {
    Keyboard.dismiss()
  }

  function getCategories() {
    return api.get("/listing/categories").then((apiResponse: any) => {
      const {
        data: { data },
      } = apiResponse;
      return data;
    });
  }

  function getSubcategoriesByCategory(categorySelected: string) {
    return api
      .get(`/listing/subcategories/${categorySelected}`)
      .then((apiResponse) => {
        const {
          data: { data },
        } = apiResponse;
        return data;
      });
  }

  useEffect(() => {
    ( async () => {
      try {
        const categories = await getCategories()
        setCategoryValues(categories)
        if (categorySelected) {
          const subcategories = await getSubcategoriesByCategory(categorySelected)
          setSubcategoryValues(subcategories)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [categorySelected]);


  async function handleSubmit() {
    try {
      if (!toolName || !categorySelected || !subcategorySelected) {
        setShowRequiredFieldsAlert(true)
      } else if (isDepositRequired !== false && !(/^\d*$/.test(depositAmount))) {
        setShowRequiredFieldsAlert(false)
        setShowInvalidAmountAlert(true)
      } else if (photoUrl !== null && !(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(photoUrl))) {
        setShowRequiredFieldsAlert(false)
        setShowInvalidAmountAlert(false)
        setShowInvalidUrlAlert(true)
      } else {
        setShowRequiredFieldsAlert(false);
        setShowInvalidAmountAlert(false);
        setShowInvalidUrlAlert(false)
        await postNewListing(
          toolName,
          categorySelected,
          subcategorySelected,
          isDepositRequired,
          Number(depositAmount),
          description,
          photoUrl
        );
        setToolName(null)
        setCategorySelected(null)
        setSubcategorySelected(null)
        setIsDepositRequired(false)
        setDepositAmount(null)
        setDescription(null)
        setPhotoUrl(null)
        setSuccessVisible(true)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
    <View style={styles.container}>
      <TextInput
        label="Name of tool*"
        mode="outlined"
        value={toolName}
        onChangeText={(value) => setToolName(value)}
        style={styles.inputBox}
      />
      <DropDownPicker
        open={showCategoryDropdown}
        value={categorySelected || ''}
        items={categoryValues?.map((category) => ({
          label: category,
          value: category,
        })) || []}
        setOpen={() => setShowCategoryDropdown(true)}
        setValue={(value) => setCategorySelected(value)}
        onChangeValue={(value) => setCategorySelected(value)}
        onClose={() => setShowCategoryDropdown(false)}
        placeholder="Category*"
        style={styles.dropdown}
        dropDownDirection="TOP"
      />
      {categorySelected ? (
        <DropDownPicker
          open={showSubcategoryDropdown}
          value={subcategorySelected || ''}
          items={subcategoryValues?.map((subcategory) => ({label: subcategory, value: subcategory})) || []}
          setOpen={() => setShowSubcategoryDropdown(true)}
          setValue={(value) => setSubcategorySelected(value)}
          onChangeValue={(value) => setSubcategorySelected(value)}
          onClose={() => setShowSubcategoryDropdown(false)}
          placeholder="Subcategory*"
          style={styles.dropdown}
        />
       ) : null}
      <View style={styles.depositRequired}>
        <Text variant="bodyMedium" style={{ marginRight: 10 }}>
          Deposit required
        </Text>
        <Switch
          value={isDepositRequired}
          onValueChange={() => setIsDepositRequired(!isDepositRequired)}
        />
      </View>
      {isDepositRequired ? (
        <TextInput
          label="Deposit amount (£)"
          keyboardType="numeric"
          mode="outlined"
          value={depositAmount?.toString()}
          onChangeText={(value) => setDepositAmount(value)}
        />
      ) : null}
      <TextInput
        label="Description of tool"
        mode="outlined"
        multiline={true}
        value={description}
        onChangeText={(value: string) => setDescription(value)}
        style={styles.description}
      />
        <TextInput
          label="Link to image"
          mode="outlined"
          multiline={true}
          value={photoUrl}
          onChangeText={(value) => setPhotoUrl(value)}
          style={styles.urlInputBox}
        />
      <Text variant="labelMedium">*required fields</Text>
      <Button
        icon="plus"
        mode="contained"
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        Submit listing
      </Button>
      {showRequiredFieldsAlert ? <Alert text={"Please complete all required fields"}/> : null}
      { showInvalidAmountAlert ? <Alert text={"Invalid deposit amount. Please enter a whole number"}/> : null}
      { showInvalidUrlAlert ? <Alert text={"Please enter a valid URL"}/> : null}
      <Snackbar visible={successVisible} onDismiss={() => setSuccessVisible(false)} action={{
          label: 'Back to My Tools',
          onPress: () => {
            navigation.navigate('MyTools')
          },
        }}>
        Your listing has been succesfully added!
        </Snackbar>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  inputBox: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  depositRequired: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    marginTop: 10,
    marginBottom: 20,
  },
  urlInputBox: {
    marginBottom: 20,
  },
  validateButton: {
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AddListingScreen;
