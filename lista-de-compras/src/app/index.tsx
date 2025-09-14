import { Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";

interface BuysProps {
  id: number;
  name: string;
  complete: boolean;
}

export default function Index() {
  const [buys, setbuys] = useState<BuysProps[]>([]);
  const [item, setItem] = useState("");

  function saveItem() {
    if(item.trim()){
      setbuys([...buys, { id: buys.length + 1, name: item, complete: false }]);
      setItem("");
    }
  }

  function toggleComplete(id: number) {
    const updatedBuys = buys.map((buy) =>
      buy.id === id? {...buy, complete: !buy.complete } : buy
    );
    setbuys(updatedBuys);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compras da Semana</Text>

      <TextInput
        style={styles.input}
        placeholder="Adicione um novo item"
        placeholderTextColor="9CA3AF"
        onChangeText={setItem}
      />

      <TouchableOpacity onPress={saveItem} style={styles.button}>
        <Text style={styles.textButton}>Adicionar Item</Text>
      </TouchableOpacity>

        <View style={styles.cardConteiner}>
          {buys.map((item) => (
            <View key={item.id} style={item.complete ? [styles.card, {backgroundColor: "#a9ffbe"}] : styles.card}>
              <View style={styles.infocard}>
                <Pressable onPress={() => toggleComplete(item.id)}>
                  {
                    item.complete ? (
                      <MaterialIcons name="check-box" size={20} color="black" />
                    ) : (
                      <MaterialIcons 
                        name="check-box-outline-blank" 
                        size={20} 
                        color="#bcbfc5" 
                      />
                    )
                  }
                </Pressable>
                <Text style={styles.textItem}>{item.name}</Text>
              </View>
              <MaterialIcons name="delete" size={24} color="#bcbfc5" />
            </View>
          ))}
        </View>
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
    marginBottom: 50,
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
    width: "100%",
    height: 57,
    backgroundColor: "#FFFFFF",
    elevation: 15,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

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
    width: "100%",
    gap: 15,
  }
});
