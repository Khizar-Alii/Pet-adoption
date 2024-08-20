import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat, InputToolbar, Composer } from "react-native-gifted-chat";
import { Colors } from "../../constants/Colors";

const ChatScreen = () => {
  const { user } = useUser();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // Ignore the specific warning
  LogBox.ignoreLogs(["Avatar: Support for defaultProps"]);

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "Chat", params?.id, "Messages"),
      (snapshot) => {
        const messageData = snapshot?.docs?.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    setLoading(true);
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users?.filter(
      (item) => item?.email != user?.primaryEmailAddress?.emailAddress
    );
    navigation.setOptions({
      headerShown: true,
      headerTitle: otherUser[0]?.name,
    });
    setLoading(false);
  };

  const onSend = async (newMessage) => {
    setMessages((prevMessage) => GiftedChat.append(prevMessage, newMessage));
    newMessage[0].createdAt = new Date().toISOString();
    await addDoc(collection(db, "Chat", params?.id, "Messages"), newMessage[0]);
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.primaryStyle}
        renderComposer={(props) => (
          <Composer {...props} textInputStyle={styles.composer} />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.button}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showUserAvatar={true}
          user={{
            _id: user?.primaryEmailAddress?.emailAddress || "default_email",
            name: user?.fullName || "Default Name",
            avatar: user?.imageUrl || "default_avatar_url",
          }}
          messagesContainerStyle={styles.messagesContainer}
          renderInputToolbar={renderInputToolbar}
          inverted={false} 
        />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  messagesContainer: {
    backgroundColor: Colors.light.background,
  },
  inputToolbar: {
    borderTopWidth: 0.3,
    borderTopColor: Colors.icon,
    backgroundColor: Colors.light.background,
  },
  primaryStyle: {
    alignItems: "center",
  },
  composer: {
    backgroundColor: Colors.light.text,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    color: Colors.light.text,
    fontFamily: "ralewayMedium",
  },
});
