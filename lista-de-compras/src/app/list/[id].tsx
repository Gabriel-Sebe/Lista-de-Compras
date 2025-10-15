import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLists } from "../context/ListContext";

export default function ListPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { lists, addItem, toggleItem, deleteItem } = useLists();
  const list = lists.find((l) => l.id === Number(id));

  const [newItem, setNewItem] = useState("");

  function handleAddItem() {
    if (list && newItem.trim()) {
      addItem(list.id, newItem);
      setNewItem("");
    }
  }

  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Lista não encontrada 😥</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo item"
        placeholderTextColor="#9CA3AF"
        value={newItem}
        onChangeText={setNewItem}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.textButton}>Adicionar Item</Text>
      </TouchableOpacity>

      <ScrollView style={{ marginTop: 20, width: "100%" }}>
        {list.items.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: item.complete ? "#a9ffbe" : "#fff" },
            ]}
          >
            <View style={styles.itemRow}>
              <Pressable onPress={() => toggleItem(list.id, item.id)}>
                {item.complete ? (
                  <MaterialIcons name="check-box" size={24} color="black" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={24} color="#999" />
                )}
              </Pressable>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>

            <Pressable onPress={() => deleteItem(list.id, item.id)}>
              <MaterialIcons name="delete" size={24} color="gray" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.textButton}>⬅ Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f9f9f9" },
    
  title: {
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 },

  input: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    borderRadius: 8, 
    width: "100%", 
    marginBottom: 10 },

  button: { 
    backgroundColor: "#CA3884", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    width: "100%" },
    
  textButton: { 
    color: "#fff", 
    fontWeight: "bold" },

  card: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 8, 
    elevation: 2 },
    
  itemRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10 },

  itemText: { 
    fontSize: 16 },

  backButton: { 
    marginTop: 20, 
    backgroundColor: "#CA3884", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center" },
});