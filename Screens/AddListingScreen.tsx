import React, { useContext, useState } from "react";
import { TextInput, Switch, Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GreenTheme } from "../Themes/GreenTheme";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import DropDownPicker from "react-native-dropdown-picker";
import Alert from "../Components/Alert";

const AddListingScreen: React.FC = () => {
  const categoryValues: object[] = [
    { label: "Power Tools", value: "Power Tools" },
    { label: "Hand Tools", value: "Hand Tools" },
  ];

  const subcategoryValues: object[] = [
    { label: "Example1", value: "Example1" },
    { label: "Example2", value: "Example2" },
  ];

  const { api, user } = useContext(GlobalStateContext);
  const [toolName, setToolName] = useState<string>();
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [subcategorySelected, setSubcategorySelected] = useState<string>("");
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] =
    useState<boolean>(false);
  const [isDepositRequired, setIsDepositRequired] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("")
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [notValidUrl, setNotValidUrl] = useState<boolean>(false);

  function postNewListing(categorySelected: string, subcategorySelected: string, isDepositRequired: boolean | null, depositAmount: number | undefined, description: string | null, photoUrl: string | null) {
    return api.post("/listing", {
      owner_id: user.profile_id,
      category: categorySelected,
      subcategory: subcategorySelected,
      deposit_required: isDepositRequired,
      deposit_amount: depositAmount,
      description: description,
      photo_url: photoUrl
    });
  }

  function isValidUrl(input: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(input);
  };

  function handlePhotoUrlInput() {
    if (isValidUrl(urlInput)) {
      setPhotoUrl(urlInput);
      setNotValidUrl(false);
    } else {
      setNotValidUrl(true);
      setUrlInput('')
    }
  }

  async function handleSubmit() {
    await postNewListing(categorySelected, subcategorySelected, isDepositRequired, depositAmount, description, photoUrl)
  }

  return (
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
        value={categorySelected}
        items={categoryValues}
        setOpen={() => setShowCategoryDropdown(true)}
        setValue={(value) => setCategorySelected(value)}
        onChangeValue={(value) => setCategorySelected(value)}
        onClose={() => setShowCategoryDropdown(false)}
        placeholder="Category*"
        style={styles.dropdown}
      />
      {categorySelected ? (
        <DropDownPicker
          open={showSubcategoryDropdown}
          value={subcategorySelected}
          items={subcategoryValues}
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
      { isDepositRequired ? 
      <TextInput
        label="Deposit amount (£)"
        keyboardType="numeric"
        mode="outlined"
        value={depositAmount}
        onChangeText={(value) => setDepositAmount(value)}
      /> : null}
      <TextInput
      label="Description of tool"
      mode="outlined"
      multiline={true}
      value={description}
      onChangeText={(value: string) => setDescription(value)}
      style={styles.description}
      />
      <View style={styles.photoUrl}>
      <TextInput
      label="Link to image"
      mode="outlined"
      multiline={true}
      value={urlInput}
      onChangeText={(value) => setUrlInput(value)}
      style={styles.urlInputBox}/>
      <Button onPress={handlePhotoUrlInput} style={styles.validateButton}>Validate url</Button>
      </View>
      { notValidUrl ? <Alert text={"Please enter a valid URL'"}/> : null}
      <Text variant="labelMedium">*required fields</Text>
      <Button
      icon="plus"
      mode="contained"
      style={styles.submitButton}
      onPress={() => handleSubmit()}
      >Submit listing</Button>
    </View>
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
    position: "relative",
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
  photoUrl: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center"
  },
  urlInputBox: {
    width: "70%",
    marginRight: 10,
  },
  validateButton: {
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
  },
  submitButton: {
    marginTop: 20,
  }
});

export default AddListingScreen;
