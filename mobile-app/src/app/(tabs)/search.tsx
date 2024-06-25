import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SEARCH_PROFILE } from "@/graphql/actions/search.action";
import { useQuery } from "@apollo/client";
import { useDebounce } from "@uidotdev/usehooks";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchResult, 300);

  const { loading, data } = useQuery(SEARCH_PROFILE, {
    variables: {
      userName: debouncedSearchTerm,
    },
  });

  if (loading)
    return (
      <View className='bg-[#121111] h-screen w-screen flex justify-center items-center'>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  if (error) return <Text>Error :</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="white"
        style={styles.input}
        onChangeText={setSearchResult}
        value={searchResult}
        placeholder="Поиск"
      />
      {data.searchProfile && (
        <FlatList
          data={data.searchProfile.users || []}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121111",
    paddingHorizontal: 20,
  },
  input: {
    marginVertical: 20,
    borderWidth: 1,
    color: "white",
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Search;
