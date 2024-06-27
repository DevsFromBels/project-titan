import { Skeleton } from "@/components/ui/Skeleton";
import useUser from "@/hooks/use-user";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { DiamondMinus, ClipboardIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

type SubscriptionItem = {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: string;
};

const Notification = () => {
  const { user, loading } = useUser();
  const [subs, setSubs] = useState<SubscriptionItem[]>([]);
  const [postLoading, setPostLoading] = useState(true);
  const textareaRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(
        `<iframe src="https://iframe-api.titanproject.top?type=single&token=${user?.id}"></iframe>`
      );
      Alert.alert("Код скопирован в буфер обмена");
    } catch (error) {
      console.error("Ошибка при копировании в буфер обмена: ", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      const fetchSubscriptions = async () => {
        const response = await fetch(
          `https://market-api.titanproject.top/get-user-subscriptions?token=${user.id}`
        );
        const data = await response.json();
        setSubs(data);
        setPostLoading(false);
      };

      fetchSubscriptions();
    }
  }, [user?.id]);

  if (loading || !user || postLoading) {
    return <Skeleton />;
  }

  if (!subs.length) {
    return (
      <View className="flex flex-col justify-center items-center bg-[#121111] h-screen gap-2">
        <DiamondMinus size="90" color={"white"} />
        <Text className="text-white font-bold text-2xl">
          У вас пока нет подписок.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-[#121111] h-full w-screen flex justify-start ">
      <View style={styles.container}>
        <Text style={styles.title}>Ваши подписки</Text>
        <Text style={styles.text}>
          Нажмите на получить код, чтобы вставить фрагмент кода на ваш сайт
        </Text>
        {subs.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Получить код</Text>
          </TouchableOpacity>
        )}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Код для вывода вашей рекламы</Text>
            <View style={styles.modalContent}>
              <TextInput
                multiline
                editable={false}
                ref={textareaRef}
                value={`<iframe src="https://iframe-api.titanproject.top?type=single&token=${user.id}"></iframe>`}
                style={styles.modalTextArea}
                onFocus={() => textareaRef?.current?.select()}
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <ClipboardIcon color="black" width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, margin: 10 }}
      >
        {subs.map((e) => (
          <React.Fragment key={e.content_id}>
            <Pressable
              onPress={() => router.replace(`/(tabs)/market/${e.content_id}`)}
              style={{ width: "48%" }}
            >
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                }}
                className="rounded-xl"
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  className="rounded-xl"
                  source={{
                    uri: `https://market-api.titanproject.top${e.content}`,
                  }}
                  onError={() => console.log("Image error")}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 10,
                  }}
                  className="rounded-xl"
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>{e.name}</Text>
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Осталось показов: {e.current_shows} / {e.total_shows}
                  </Text>
                </View>
              </View>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: "center",
    gap: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    height: 60,
    width: 200,
    borderRadius: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "#121111",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTextArea: {
    color: "#fff",
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  copyButton: {
    backgroundColor: "#fff",
    height: 50,
    width: 50,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copyButtonText: {
    color: "#121111",
    fontSize: 16,
  },
});

export default Notification;
