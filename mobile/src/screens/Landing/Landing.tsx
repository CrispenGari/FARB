import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { AppNavProps } from "../../params";

const Landing: React.FC<AppNavProps<"Landing">> = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.main,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          alignItems: "center",
          marginBottom: 30,
          flex: 0.7,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.NunitoSansExtraBold,
            color: "white",
            letterSpacing: 3,
            fontSize: 30,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          First Aid Recommendation Bot
        </Text>
        <Image
          source={{
            uri: Image.resolveAssetSource(require("../../../assets/logo.png"))
              .uri,
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: FONTS.NunitoSansRegular,
          }}
        >
          Welcome to the First Aid Recommendation Bot (FARB). If you trust this
          bot in giving you First Aid suggestions click Start Chatting Button
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flex: 0.3,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Home");
          }}
          style={{
            marginVertical: 30,
            backgroundColor: COLORS.dark,
            width: "90%",
            paddingHorizontal: 20,
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              color: "white",
              fontFamily: FONTS.NunitoSansRegular,
              letterSpacing: 2,
              fontSize: 20,
            }}
          >
            Start Chat
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            margin: 20,
            color: "white",
            textAlign: "center",
            fontFamily: FONTS.NunitoSansItalic,
          }}
        >
          Copyright © 2022 Crispen AI Tools Inc. All rights reserved
        </Text>
      </View>
    </View>
  );
};

export default Landing;
