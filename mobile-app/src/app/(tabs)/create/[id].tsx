import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Input } from "@/components/ui/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function TabSearchScreen() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>();
  const [image, setImage] = useState<string>();
  const [totalShows, setTotalShows] = useState("");
  const [name, setName] = useState("");

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

  const balance = 100;

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
        `https://market-api.titanproject.top/create?name=${name}&price_peer_show=${priceShow}&total_shows=${totalShows}`,
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
      <Text className="text-white relative z-10 h-screen flex justify-start items-center">
        Создайте свою рекламу
      </Text>
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
            className="w-[250px]"
          />
          <Input
            value={totalShows}
            keyboardType="numeric"
            onChangeText={setTotalShows}
            placeholder="Введите количество показов"
            className="w-[250px]"
          />
          <Text className="text-white ">
            Цена за один показ: {!priceShow ? 0 : priceShow}
          </Text>

          <Button label="Создать предложение" onPress={handleCreate} />
          <View className="">
            <Button
              label="Отмена"
              onPress={() => {
                setImage("");
              }}
              className="w-[250px] mt-5 "
            />
          </View>
        </View>
      )}
    </View>
  );
}
