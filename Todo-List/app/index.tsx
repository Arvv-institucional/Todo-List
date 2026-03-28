import ViewModal from "@/components/ViewModal";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false)

  const updateState =() =>{
    setIsVisible(!isVisible)
  }

  return (
    /*Esta parte del codigo posiblemente se tenga que mover a donde se haga el componente de las tarjetas*/
    <View>
      <ViewModal id={2} isVisible={isVisible} newState={updateState}/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <Pressable onPress={updateState}>
        <Text>
          Boton
        </Text>
      </Pressable>
    </View>
  );
}
