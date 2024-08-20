import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
export const commonStyles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    color: Colors.icon,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  mainImage: {
    width: "100%",
    height: 500,
  },
  containerWrapper: {
    backgroundColor: Colors.iconBackground,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    alignItems:'center',
    flex : 1,
  },
  heading: {
    fontSize: 20,
    fontFamily: "ralewayBold",
    textAlign: "center",
    paddingVertical: 10,
  },
  desc: {
    fontSize: 14,
    fontFamily: "raleway",
    textAlign: "center",
    color: Colors.icon,
    paddingVertical: 10,
  },
  btnContainer: {
    width: wp(50),
    backgroundColor : Colors.button,
    alignItems: "center",
    paddingVertical : 15,
    borderRadius : 12,
    margin : 10
  },
  btnText: {
    fontSize : 16,
    fontFamily: "ralewayMedium",
    color: Colors.dark.text
  },
  inputContainer : {
    display : "flex",
    flexDirection : 'row',
    alignItems: "center",
    borderWidth : 2,
    borderColor  : Colors.iconBackground,
    borderRadius : 15,
    marginVertical : 10, 
  },
  input : {
    width : wp(70),
    padding : 10,
    fontSize: 14,
    fontFamily : "ralewayMedium",
  },
  activity : {
    alignItems : 'center',
    justifyContent : 'center',
    height : '50%'
  }
});
