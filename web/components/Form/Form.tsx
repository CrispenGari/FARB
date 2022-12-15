import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewMessage } from "../../actions";
import { useAskBotMutation } from "../../graphql/generated/graphql";
import styles from "./Form.module.css";
interface Props {}
const Form: React.FC<Props> = ({}) => {
  const [message, setMessage] = useState<string>("");
  const [askBot, { loading, data }] = useAskBotMutation({
    fetchPolicy: "network-only",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      setNewMessage({
        message,
        sender: "human",
      })
    );
    await askBot({
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
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything to the First Aid Bot"
      ></textarea>
      <Button isLoading={loading} disabled={!!!message} type="submit">
        Send
      </Button>
    </form>
  );
};

export default Form;
