import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Link } from "expo-router";
import { useLists } from "./context/ListContext";


export default function Index() {
   const { lists, addList, deleteList} = useLists();
   const [newListName, setNewListName] = useState("");

  function handleAddList() {
    if (newListName.trim()) {
      addList(newListName);
      setNewListName("");
    }
  }


  return (
    <View style={styles.container}>
      {/* Ícone do carrinho acima do título */}
      <MaterialIcons name="shopping-cart" size={48} color="#CA3884" style={{ marginBottom: 10 }} />

      <Text style={styles.title}>Minhas Lista de Compras</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da nova lista"
        placeholderTextColor="#9CA3AF"
        value={newListName}
        onChangeText={setNewListName}
      />

      <TouchableOpacity onPress={handleAddList} style={styles.button}>
        <Text style={styles.textButton}>Criar Lista</Text>
      </TouchableOpacity>

      {/* ScrollView para rolar a lista */}
      <ScrollView style={{ marginTop: 20, width: "100%" }}>
        {lists.map((list) => (
          <View key={list.id} style={styles.card}>
            <Link href={`/list/${list.id}`} style={styles.listLink}>
              {list.name}
            </Link>
            <Pressable onPress={() => deleteList(list.id)}>
              <MaterialIcons name="delete" size={24} color="gray" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: "center",
  },

  title: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#CA3884",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  textButton: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",  
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 8, 
    elevation: 2 },

  infocard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  textItem: {
    color: "#374151",
    fontSize: 16,
  },

  cardConteiner: {
    paddingBottom: 50,
    gap: 15,
  },

  listLink: { fontSize: 18, 
    color: "#333" },
});
