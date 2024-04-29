import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../fireBaseConfig";
import { CustomButton } from "../components";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateBorn, setUpdateBorn] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const sendData = async () => {
    try {
      await addDoc(collection(db, "users"), {
        title: "Ada",
        content: "Lovelace",
        born: 1815,
      });
      getData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteData = async (id) => {
    try {
      if (id) {
        // Ensure id is valid before proceeding
        await deleteDoc(doc(db, "users", id));
        getData();
        console.log("Document successfully deleted!");
      } else {
        console.error("Invalid document ID.");
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const updateData = async () => {
    try {
      const users = doc(db, "users", updateId);
      await updateDoc(users, {
        title: updateTitle,
        content: updateContent,
        born: parseInt(updateBorn),
      });

      getData();
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  //LOGOUT

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.item}>{item.title}</Text>
      <Text style={styles.item}>{item.content}</Text>
      <Text style={styles.item}>{item.born}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setModalVisible(true);
            setUpdateId(item.id);
            setUpdateTitle(item.title);
            setUpdateContent(item.content);
            setUpdateBorn(item.born.toString());
          }}
        >
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteData(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Title</Text>
            <Text style={styles.headerText}>Content</Text>
            <Text style={styles.headerText}>Born</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={sendData}>
        <Text style={styles.addText}>Add Data</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Title:</Text>
            <TextInput
              style={styles.input}
              value={updateTitle}
              onChangeText={(text) => setUpdateTitle(text)}
            />
            <Text>Content:</Text>
            <TextInput
              style={styles.input}
              value={updateContent}
              onChangeText={(text) => setUpdateContent(text)}
            />
            <Text>Born:</Text>
            <TextInput
              style={styles.input}
              value={updateBorn}
              onChangeText={(text) => setUpdateBorn(text)}
            />
            <TouchableOpacity style={styles.updateButton} onPress={updateData}>
              <Text style={styles.actionText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomButton
        buttonText={"LOGOUT"}
        setWidth={"40%"}
        buttonColor={"red"}
        handleOnPress={handleLogout}
      ></CustomButton>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 5,
    backgroundColor: "blue",
    borderRadius: 5,
    marginLeft: 5,
  },
  actionText: {
    color: "#fff",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
