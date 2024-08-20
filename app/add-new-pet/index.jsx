import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { commonStyles } from "../../styles/commonStyles";
import Button from "../../components/Button/Button";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const [pickImg, setPickImg] = useState(null);
  const [formData, setFormData] = useState({ category: "Dogs", sex: "Male" });
  const [gender, setGender] = useState();
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [activeCateogry, setActiveCateogry] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: "transparent",
        backgroundColor: "transparent",
      },
      headerTintColor: Colors.icon,
    });
    getCategoriesName();
  }, []);

  //   getting categories
  const getCategoriesName = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  // picked image
  const handleImgPress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPickImg(result.assets[0].uri);
      } else {
        ToastAndroid.show("No image selected", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
      ToastAndroid.show(
        "An error occurred while selecting the image",
        ToastAndroid.SHORT
      );
    }
  };
  // saving image to firebase

  const UploadImgToFirebase = async () => {
    if (!pickImg) {
      return;
    }
    setLoader(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(pickImg);
    const blob = await resp.blob();
    const imgRef = ref(storage, "pet-adopt/" + fileName);
    uploadBytes(imgRef, blob)
      .then((snapshot) => {
        console.log("File Uploaded...");
      })
      .then((resp) => {
        getDownloadURL(imgRef).then(async (downloadUrl) => {
          UploadingImg(downloadUrl);
        });
      });
  };
  const UploadingImg = async (imageUrl) => {
    const docID = Date.now().toString();
    await setDoc(doc(db, "Pets", docID), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docID,
    });
    setPickImg(null);
    setLoader(false);
    ToastAndroid.show("Pet Added Successfully", ToastAndroid.BOTTOM);
    router.replace("/(tabs)/home")
  };

  const handleInputChange = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Please Enter all Details", ToastAndroid.SHORT);
      return;
    }
    UploadImgToFirebase();
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Add New Pet For Adoption</Text>

        {/* image input */}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            gap: 20,
          }}
          onPress={handleImgPress}
        >
          {!pickImg ? (
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/10054/10054290.png",
              }}
            />
          ) : (
            <Image
              style={styles.icon}
              source={{
                uri: pickImg,
              }}
            />
          )}
          {!pickImg ? (
            <Text style={{ fontFamily: "raleway", fontSize: 12 }}>
              Please Select Pet Image
            </Text>
          ) : (
            <Text style={{ fontFamily: "raleway", fontSize: 12 }}>
              Image selected
            </Text>
          )}
        </TouchableOpacity>
        {/* Inputs here */}
        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground },
          ]}
        >
          <TextInput
            placeholder="Enter Pets Name"
            style={commonStyles.input}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <Image
            style={[commonStyles.icon, { position: "absolute", right: 10 }]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/1076/1076826.png",
            }}
          />
        </View>
        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground },
          ]}
        >
          <TextInput
            placeholder="Enter Pet Breed"
            style={commonStyles.input}
            onChangeText={(value) => handleInputChange("breed", value)}
          />
          <Image
            style={[commonStyles.icon, { position: "absolute", right: 10 }]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/10754/10754301.png",
            }}
          />
        </View>
        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground },
          ]}
        >
          <TextInput
            placeholder="Enter Pet Age"
            style={commonStyles.input}
            onChangeText={(value) => handleInputChange("age", value)}
            keyboardType="number-pad"
          />
          <Image
            style={[commonStyles.icon, { position: "absolute", right: 10 }]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/10938/10938225.png",
            }}
          />
        </View>

        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground },
          ]}
        >
          <TextInput
            placeholder="Enter Pet Weight"
            style={commonStyles.input}
            onChangeText={(value) => handleInputChange("weight", value)}
            keyboardType="number-pad"
          />
          <Image
            style={[commonStyles.icon, { position: "absolute", right: 10 }]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/5871/5871935.png",
            }}
          />
        </View>
        <View style={[commonStyles.inputContainer]}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleInputChange("sex", itemValue);
            }}
            style={{
              padding: 10,
              fontSize: 14,
              fontFamily: "ralewayMedium",
              width: "100%",
            }}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        {/* categories */}
        <View style={[commonStyles.inputContainer]}>
          <Picker
            selectedValue={activeCateogry}
            onValueChange={(itemValue, itemIndex) => {
              setActiveCateogry(itemValue);
              handleInputChange("category", itemValue);
            }}
            dropdownStyle={styles.dropdown}
            style={{
              padding: 10,
              fontSize: 14,
              fontFamily: "ralewayMedium",
              width: "100%",
              borderRadius: 20,
            }}
          >
            {categoryList?.map((item, index) => {
              return (
                <Picker.Item
                  label={item?.name}
                  value={item?.name}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
        {/* ........... */}
        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground },
          ]}
        >
          <TextInput
            placeholder="Enter Address"
            style={commonStyles.input}
            onChangeText={(value) => handleInputChange("address", value)}
          />
          <Image
            style={[commonStyles.icon, { position: "absolute", right: 10 }]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/10205/10205841.png",
            }}
          />
        </View>

        <View
          style={[
            commonStyles.inputContainer,
            { borderColor: Colors.iconBackground, alignItems: "baseline" },
          ]}
        >
          <TextInput
            placeholder="About Pet"
            style={[commonStyles.input]}
            onChangeText={(value) => handleInputChange("about", value)}
            numberOfLines={4}
            multiline={true}
            textAlignVertical="top"
          />
          <Image
            style={[
              commonStyles.icon,
              { position: "absolute", right: 10, marginTop: 10 },
            ]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/16969/16969456.png",
            }}
          />
        </View>

        {/* ........ */}

        {/* Button */}
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          {loader ? (
            <ActivityIndicator size={"large"} color={Colors.button} />
          ) : (
            <Button title="Submit" handlePress={handleSubmit} />
          )}
        </View>
        {/* ........... */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    flex: 1,
    // height : '200%'
  },
  heading: {
    fontSize: 20,
    fontFamily: "ralewayMedium",
  },
  icon: {
    width: 50,
    height: 50,
  },
  dropdown: {
    borderRadius: 20,
    backgroundColor: Colors.iconBackground,
  },
});
