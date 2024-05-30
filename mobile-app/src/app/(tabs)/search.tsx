import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Input } from "@/components/ui/Input"; // Убедитесь, что этот импорт верный
import { SEARCH_PROFILE } from "@/graphql/actions/search.action";
import { useQuery } from "@apollo/client";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState(null);

  const { loading, data, refetch } = useQuery(SEARCH_PROFILE, {
    variables: {
      userName: searchResult,
    },
  });

  useEffect(() => {
    if (!isLoading) {
      refetch({ userName: searchResult });
    }
  }, [searchResult]);

  const handleChange = (text) => {
    setSearchResult(text);
  };

  if (loading)
    return (
      <View>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  if (error) return <Text>Error :</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="white"
        style={styles.input}
        onChangeText={handleChange}
        value={searchResult}
        placeholder="Search"
      />
      {data && data.searchProfile && (
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
