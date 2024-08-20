import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/pet-details/PetInfo";
import { commonStyles } from "../../styles/commonStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from "../../constants/Colors";
import PetSubInfo from "../../components/pet-details/PetSubInfo";
import AboutPet from "../../components/pet-details/AboutPet";
import OwnerInfo from "../../components/pet-details/OwnerInfo";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const PetDetails = () => {
  const { item } = useLocalSearchParams();
  const navigation = useNavigation();
  const petItemID = JSON.parse(item);
  const { user } = useUser();

  const [petDetails, setPetDetails] = useState(null);

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
      headerTintColor: Colors.iconBackground,
    });
    GetPetDetails();
  }, []);

  const GetPetDetails = async () => {
    const docRef = doc(db, "Pets", petItemID);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPetDetails(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };

  if (!petDetails) {
    return (
      <ActivityIndicator
        size={"large"}
        color={Colors.button}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      />
    );
  }

  // logic to initiate chat between screens

  const InitiateChat = async () => {
    const docId1 =
      user?.primaryEmailAddress?.emailAddress + "_" + petDetails?.email;
    const docId2 =
      petDetails?.email + "_" + user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });
    if (querySnapShot?.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: petDetails?.email,
            imageUrl: petDetails?.userImage,
            name: petDetails?.username,
          },
        ],
        userIds :[user?.primaryEmailAddress?.emailAddress,petDetails?.email]
      });
    }
    router.push({
      pathname: "/chat",
      params: { id: docId1 },
    });
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView>
        {/* pet info */}
        <PetInfo item={petDetails} />

        {/* pet subInfo */}
        <PetSubInfo item={petDetails} />

        {/* About Pet */}
        <AboutPet item={petDetails} />

        {/* owner details */}
        <OwnerInfo item={petDetails} />
        <View style={{ height: 100 }} />
      </ScrollView>
      {/* adopt me button */}
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnContainer} onPress={InitiateChat}>
          <Text style={commonStyles.btnText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  btnWrapper: {
    position: "absolute",
    bottom: 0,
  },
  btnContainer: {
    width: wp(100),
    backgroundColor: Colors.button,
    alignItems: "center",
    paddingVertical: 15,
  },
});
