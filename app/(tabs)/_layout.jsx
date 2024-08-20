import { Tabs } from "expo-router";
import { Image } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { Colors } from "../../constants/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.button,
        tabBarInactiveTintColor: Colors.icon,
        tabBarActiveBackgroundColor: Colors.iconBackground,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 3,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Image
              style={commonStyles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/10473/10473299.png",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite/index"
        options={{
          tabBarLabel: "Favourite",
          tabBarIcon: () => (
            <Image
              style={commonStyles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/8294/8294893.png",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message/index"
        options={{
          tabBarLabel: "Message",
          tabBarIcon: () => (
            <Image
              style={commonStyles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2190/2190552.png",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <Image
              style={commonStyles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/17436/17436250.png",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
