import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { COLORS, FONTS } from "../../constants";

import { AppNavProps } from "../../params";
import { useHeaderHeight } from "@react-navigation/elements";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../types";
import { Message } from "../../components";
import { setNewMessage } from "../../actions";
import { useAskBotMutation } from "../../graphql/generated/graphql";
const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const height = useHeaderHeight();
  const messages = useSelector(({ messages }: StateType) => messages);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.dark,
        height: 120,
      },
      headerTitle: "FAR Bot",
      headerTitleStyle: {
        color: "white",
        fontFamily: FONTS.NunitoSansRegular,
        letterSpacing: 2,
      },
      headerLeft: () => (
        <Image
          source={{
            uri: Image.resolveAssetSource(
              require("../../../assets/logo-header.png")
            ).uri,
          }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      ),
      headerLeftContainerStyle: {
        paddingLeft: 20,
      },
    });
  }, []);

  const [message, setMessage] = React.useState<string>("");

  const [_askBot, { loading, data }] = useAskBotMutation({
    fetchPolicy: "network-only",
  });
  const dispatch = useDispatch();

  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();

  const askBot = async () => {
    await dispatch(
      setNewMessage({
        message,
        sender: "human",
      })
    );
    await _askBot({
      variables: {
        input: {
          message,
        },
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.askBot?.success) {
      setMessage("");
      dispatch(
        setNewMessage({
          message: data?.askBot.response?.message ?? "",
          sender: "bot",
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            style={{
              marginBottom: 30,
              flex: 1,
              padding: 10,
              height: Dimensions.get("screen").height - 200,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {messages.length === 0 ? (
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  fontFamily: FONTS.NunitoSansRegular,
                  letterSpacing: 2,
                  fontSize: 20,
                }}
              >
                No messages, ask the Bot about First Aid Recommendation ONLY.
              </Text>
            ) : (
              messages.map((message, index) => (
                <Message message={message} key={index} />
              ))
            )}

            {loading && (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.NunitoSansItalic,
                  textAlign: "right",
                  width: "100%",
                }}
              >
                bot typing...
              </Text>
            )}
            <View style={{ height: 100 }} />
          </ScrollView>
          <KeyboardAvoidingView
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            keyboardVerticalOffset={height + 20}
            behavior="padding"
            enabled
          >
            <TextInput
              multiline
              editable={!loading}
              onSubmitEditing={askBot}
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{
                backgroundColor: "white",
                flex: 1,
                padding: 10,
                height: 50,
                fontSize: 16,
                fontFamily: FONTS.NunitoSansRegular,
                borderRadius: 5,
                marginHorizontal: 10,
              }}
              placeholder="Ask anything to the First Aid Bot"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.dark,
                marginRight: 10,
                padding: 10,
                borderRadius: 5,
                width: 100,
                alignItems: "center",
              }}
              disabled={!!!messages || loading}
              onPress={askBot}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: FONTS.NunitoSansRegular,
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Home;
