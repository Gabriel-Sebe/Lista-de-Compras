import { Stack } from "expo-router";
import { ListsProvider } from "./context/ListContext";

export default function RootLayout(){
  return (
  <ListsProvider>
      <Stack screenOptions={{
        headerShown: false,
      }} />
    </ListsProvider>
  );
}
