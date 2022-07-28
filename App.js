import { Button, FlatList, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {useEffect, useState} from 'react';

import React from 'react';

const image = { uri: "https://i.pinimg.com/originals/87/60/50/8760508c95364b7405978967d5936377.jpg" };

export default function App() {

  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([]); //useState de array
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const onHandlerChangeItem = (text) => setTextItem(text);
  const onHandlerAddItem = () => {
    console.log('se agrego el item: ' + "'", textItem +  ".'")
    setItemList(currentItems => [...currentItems, { id: Date.now(), value: textItem, completed: false}])
    // setItemList({...itemList, id: Math.random()*10, value: textItem }) => hace lo mismo que la de arriba
    setTextItem('')
  }
  
  const onHandlerDeleteItem = id => {
      setItemList(currentItems => currentItems.filter(item => item.id !== id))
      setItemSelected({})
      setModalVisible(!modalVisible)
  }
  const onHandlerModal = id => {
      setItemSelected(itemList.find(item => item.id === id))
      setModalVisible(!modalVisible)
  }
  const onHandlerCompleteItem = id => {
    let itemCompleted = itemList.findIndex((item) => item.id === id)
    itemList[itemCompleted].completed = true
    setItemList([...itemList])
    setModalVisible(!modalVisible)
  }
  const onHandlerExit = id => {
    setItemList([...itemList])
    setModalVisible(!modalVisible)
  }
  const onHandlerUnompleteItem = id => {
    let itemCompleted = itemList.findIndex((item) => item.id === id)
    itemList[itemCompleted].completed = false
    setItemList([...itemList])
    setModalVisible(!modalVisible)
  }
return (
    <ImageBackground  source={image} 
                        resizeMode="cover" 
                        style={styles.image}
                        >
        <View style={styles.screen}>     
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
        <View style={styles.modal}>
           <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                   <Text>
                     My Modal.
                    </Text>
                    </View>
                    <View style={styles.modalMessage}>
                        <Text>Select an action:</Text>
                    </View>
                    <View style={styles.modalMessage}>
                        <Text style={styles.modalItem}>{itemSelected.value}</Text>
                    </View>
                    <View style={styles.modalButton}>
                        <Button onPress={() => onHandlerDeleteItem(itemSelected.id)} title='Delete.' />
                        <Button onPress={() => onHandlerCompleteItem(itemSelected.id)} title='Completed.' />
                        <Button onPress={() => onHandlerUnompleteItem(itemSelected.id)} title='Uncompleted' />
                        <Button onPress={() => onHandlerExit(itemSelected.id)} title='Exit Menu.' />
                        
                    </View>
                </View>
            </View>
        </Modal>
        <View style={styles.container}>
          <TextInput 
            placeholder='item goes here' 
            style={styles.input} 
            value={textItem}
            onChangeText={onHandlerChangeItem}  
            />
          <Button title='Add'onPress={onHandlerAddItem} disabled={textItem.length < 1 ? true : false}/>
        </View>
         <FlatList 
            data={itemList}
            renderItem={data => (
                <TouchableOpacity onPress={() => onHandlerModal(data.item.id)} style={styles.item}>
                    <Text style={{textDecorationLine: data.item.completed ? 'line-through' : null}}>{data.item.value}</Text>
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
        />  
    </View>  
   </ImageBackground>  
  );
}
        
const styles = StyleSheet.create({
  screen: {
    marginTop: '10%',
    padding: 30,
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image:{
    justifyContent: "center",
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: '10%',
    height: 50,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },  
  modalView: {
    backgroundColor: 'white',
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalTitle: {
    color: 'white',
    fontSize: 70
  },
  modalMessage: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  modalButton: {
    marginTop: 15,
  },
  modalItem: {
    fontSize: 30
  }
})