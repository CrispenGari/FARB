import { View, Text } from "react-native";
import React from "react";
import { MessageType } from "../../types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
interface Props {
  message: MessageType;
}
const Message: React.FC<Props> = ({ message }) => {
  return (
    <View
      onStartShouldSetResponder={() => true}
      style={{
        marginBottom: 5,
        flexDirection: message.sender === "bot" ? "row-reverse" : "row",
      }}
    >
      {message.sender === "bot" ? (
        <MaterialCommunityIcons
          name="robot"
          size={24}
          color={COLORS.darkGray}
          style={{
            marginLeft: 10,
          }}
        />
      ) : (
        <Ionicons
          name="person"
          size={24}
          color={COLORS.darkGray}
          style={{
            marginRight: 10,
          }}
        />
      )}
      <View
        style={{
          width: "70%",
          backgroundColor:
            message.sender === "bot" ? COLORS.gray : COLORS.darkGray,
          padding: 10,
          borderRadius: 5,
          borderTopLeftRadius: 0,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: message.sender === "bot" ? "back" : "white",
              fontFamily: FONTS.NunitoSansRegular,
            }}
          >
            {message.message}
          </Text>
        </View>
        <Text
          style={{
            width: "100%",
            textAlign: "right",
            marginTop: 10,
            fontFamily: FONTS.NunitoSansRegular,
            color: message.sender === "bot" ? COLORS.darkGray : "gray",
          }}
        >
          {message.sender}
        </Text>
      </View>
    </View>
  );
};

export default Message;
