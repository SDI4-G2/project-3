import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Image,
} from "react-native";

import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import editingIconSeven from "../assets/editingiconseven.png";

export default function EditProfile() {
  return (
    <View>
      <SecondHeaderBar />
      <View style={styles.container}>
        <Bold fontBold="Edit Profile"></Bold>
        <View style={styles.padding}>
          <View style={styles.fieldsInput}>
            <View style={styles.buttonComponent}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.buttonText}>Username</Text>
                <Text style={styles.buttonTextTwo}>banana</Text>
              </View>
              <TouchableOpacity style={styles.editingIcon}>
                <Image
                  source={editingIconSeven}
                  style={{ height: 50, width: 50, opacity: 0.8 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonComponent}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.buttonText}>E-mail</Text>
                <Text style={styles.buttonTextTwo}>banana@gmail.com</Text>
              </View>
              {/* <TouchableOpacity style={styles.editingIcon}>
                <Image source={editingIcon} />
              </TouchableOpacity> */}
            </View>
            <View style={styles.buttonComponent}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.buttonText}>Password</Text>
                <Text style={styles.buttonTextTwo}>******</Text>
              </View>
              <TouchableOpacity style={styles.editingIcon}>
                <Image
                  source={editingIconSeven}
                  style={{ height: 50, width: 50, opacity: 0.8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View>
          <TouchableOpacity>
            <Buttons naming="Save Changes"></Buttons>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  padding: {
    paddingTop: "5%",
  },

  buttonComponent: {
    borderWidth: 1,
    padding: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "left",
    fontFamily: "Poppins_500Medium",
    color: "white",
    opacity: 0.8,

    fontSize: 20,
  },
  buttonTextTwo: {
    textAlign: "left",
    fontFamily: "Poppins_300Light",
    color: "white",
    opacity: 0.8,
    paddingTop: 15,
    fontSize: 13,
  },
  editingIcon: {
    alignSelf: "center",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 55,
    backgroundColor: "rgba(255,255,255, 0.05)",
    borderColor: "rgba(255,255,255, 0.3)",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },
  noInput: {
    height: 55,
    backgroundColor: "rgba(186, 192, 202, 0.6)",
    borderColor: "rgba(102, 112, 128, 0.4)",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "white",
    opacity: 0.4,
    width: "100%",
    alignSelf: "center",
  },
});
