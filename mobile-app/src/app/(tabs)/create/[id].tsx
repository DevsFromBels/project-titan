import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { graphqlClient } from "@/graphql/gql.setup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

export default function TabSearchScreen() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>();
  const [image, setImage] = useState<string>();
  const [totalShows, setTotalShows] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [webSiteLink, setWebSiteLink] = useState("");

  const handleSubmit = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === "granted");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const balance = 10000;

  const priceShow = balance / +totalShows;

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "name",
      });
      const response = await fetch(
        `https://market-api.titanproject.top/create?name=${name}&price_peer_show=${priceShow}&total_shows=${totalShows}&link=${webSiteLink}&category=${category}`,
        {
          method: "POST",
          body: formData,
          headers: new Headers({
            accessToken: (await AsyncStorage.getItem("access_token")) || "",
            refreshToken: (await AsyncStorage.getItem("refresh_token")) || "",
          }),
        }
      );

      if (response.ok) {
        console.log("Upload successful");
        setName("");
        setTotalShows("");
        setImage("");
        graphqlClient.resetStore();
        router.replace("/(tabs)/market");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center h-screen w-screen bg-[#121111]">
      <Button label="Выберите изображение" onPress={handleSubmit} />
      {image && (
        <View className="absolute h-screen w-screen bg-[#121111] flex justify-center items-center gap-2">
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "white",
            }}
          />
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Введите название"
            className="w-[300px]"
          />
          <Input
            value={webSiteLink}
            onChangeText={setWebSiteLink}
            placeholder="Введите ссылку на свой сайт"
            className="w-[300px]"
          />
          <Input
            value={totalShows}
            keyboardType="numeric"
            onChangeText={setTotalShows}
            placeholder="Введите количество показов"
            className="w-[300px]"
          />
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Picker
              style={{
                width: 300,
                color: "white",
                alignItems: "center",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
              }}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="Веб-Сайт" value="Веб-Сайт" />
              <Picker.Item
                label="Социальная сеть (telegram)"
                value="Социальная сеть (telegram)"
              />
              <Picker.Item
                label="Социальная сеть (whatsapp)"
                value="Социальная сеть (whatsapp)"
              />
              <Picker.Item
                label="Социальная сеть (instagram)"
                value="Социальная сеть (instagram)"
              />
              <Picker.Item
                label="Социальная сеть (twitter)"
                value="Социальная сеть (twitter)"
              />
            </Picker>
          </View>
          <Text className="text-white ">
            Цена за один показ:{" "}
            {priceShow == Infinity ? 0 : Math.floor(priceShow).toFixed(2)}
          </Text>
          <View className="absolute h-screen w-screen items-center justify-end flex pb-16">
            <Pressable
              className="w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white"
              onPress={handleCreate}
            >
              <Text className="text-2xl text-black">Создать предложение</Text>
            </Pressable>
          </View>
          <View className="absolute h-screen w-screen flex p-2">
            <Pressable
              onPress={() => {
                setImage("");
              }}
              className="w-[250px]"
            >
              <MoveLeft color="white" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
