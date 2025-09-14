import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compras da Semana</Text>

      <TextInput 
      style={styles.input}
      placeholder="Adicione um novo item" 
      placeholderTextColor="9CA3AF" 
      />

      <TouchableOpacity style={styles.button}>
        <text style={styles.textButton}>Adicionar Item</text>
      </TouchableOpacity>
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
    alignItems:"center",
    justifyContent: "center",
  },

  textButton: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
  }
});
