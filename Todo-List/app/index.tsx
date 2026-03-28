import ViewModal from "@/components/ViewModal";
import EditModal from "@/components/EditModal";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  const [isVisibleView, setIsVisibleView] = useState(false)

  const updateStateView =() =>{
    setIsVisibleView(!isVisibleView)
  }

  const [isVisibleEdit, setIsVisibleEdit] = useState(false)

  const updateStateEdit =() =>{
    setIsVisibleEdit(!isVisibleEdit)
  }

  return (
    /*Esta parte del codigo posiblemente se tenga que mover a donde se haga el componente de las tarjetas*/
    <View>
      <ViewModal id={2} isVisibleView={isVisibleView} newState={updateStateView}/>
      <EditModal id={2} isVisibleEdit={isVisibleEdit} newState={updateStateEdit}/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <Pressable onPress={updateStateView}>
        <Text>
          Boton para ver
        </Text>
      </Pressable>

      <Pressable onPress={updateStateEdit}>
        <Text>
          Boton para editar
        </Text>
      </Pressable>
    </View>
  );
}
