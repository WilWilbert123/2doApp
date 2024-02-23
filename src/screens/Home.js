// Home.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, Modal, TextInput } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styles';
import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';

const Home = () => {
  const [squares, setSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [completedTasksMap, setCompletedTasksMap] = useState({});
  const [deletedTaskIndex, setDeletedTaskIndex] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [squares, taskList]);

  useEffect(() => {
    loadCompletedTasksMap();
  }, [squares]);

  const totalCompletedTasks = () => {
   
    const allCompletedTasks = Object.values(completedTasksMap).flat();
    return allCompletedTasks.filter((task) => task).length;
  };
  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('taskData');
      if (savedData !== null) { 
        const parsedData = JSON.parse(savedData);
        setSquares(parsedData.squares || []);
        setTaskList(parsedData.taskList || []);
        setCompletedTasksMap(parsedData.completedTasksMap || {});
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };
  

  const saveData = async () => {
    try {
      const dataToSave = JSON.stringify({ squares, taskList, completedTasksMap });
      await AsyncStorage.setItem('taskData', dataToSave);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const loadCompletedTasksMap = () => {
    const map = { ...completedTasksMap }; 
    squares.forEach((square) => {
      if (!map[square.key]) {
        map[square.key] = square.taskList.map(() => false);
      }
    });
    setCompletedTasksMap(map);
  };

  const addTask = (newTask) => {
    if (newTask.trim() !== '') {
      if (selectedSquare) {
        setTaskList((prevTaskList) => {
          const updatedTaskList = [...prevTaskList, newTask].filter(Boolean);
          updateTitle(selectedSquare.key, editedTitle, updatedTaskList);
          return updatedTaskList;
        });
      } else {
        setTaskList((prevTaskList) => [...prevTaskList, newTask]);
      }
    }
  };

  useEffect(() => {
    if (deletedTaskIndex !== null) {
      setTaskList((prevTaskList) => {
        const updatedTaskList = [...prevTaskList];
        updatedTaskList.splice(deletedTaskIndex, 1);
        return updatedTaskList;
      });

      setDeletedTaskIndex(null);
    }
  }, [deletedTaskIndex]);

  const deleteTask = async (index) => {
    if (selectedSquare) {
      setSquares((prevSquares) => {
        const squareIndex = prevSquares.findIndex((square) => square.key === selectedSquare.key);
        const updatedTaskList = [...prevSquares[squareIndex].taskList];
        updatedTaskList.splice(index, 1);

        setDeletedTaskIndex(index);

        return prevSquares.map((square, i) =>
          i === squareIndex ? { ...square, taskList: updatedTaskList } : square
        );
      });
    } else {
      setTaskList((prevTaskList) => {
        const updatedTaskList = [...prevTaskList];
        updatedTaskList.splice(index, 1);

        setDeletedTaskIndex(index);

        return updatedTaskList;
      });
    }

    saveData();
  };

  const deleteSquare = (key) => {
    const updatedSquares = squares.filter((square) => square.key !== key);
    const deletedSquare = squares.find((square) => square.key === key);
    const updatedTotalCompletedTasks = totalCompletedTasks() - deletedSquare.taskList.filter((_, index) => completedTasksMap[key][index]).length;

    setSquares(updatedSquares);
    const updatedCompletedTasksMap = { ...completedTasksMap };
    delete updatedCompletedTasksMap[key];
    setCompletedTasksMap(updatedCompletedTasksMap);

    saveData();
  };

  const addSquare = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setSquares((prevSquares) => [
      ...prevSquares,
      { key: prevSquares.length.toString(), color: randomColor, title: 'Title', taskList: [] },
    ]);
  };

  const updateTitle = (key, newTitle, newTask) => {
    const updatedSquares = squares.map((square) =>
      square.key === key ? { ...square, title: newTitle, taskList: newTask } : square
    );
    setSquares(updatedSquares);
  };

  const openModal = (key) => {
    const square = squares.find((item) => item.key === key);
    setSelectedSquare(square);
    setEditedTitle(square.title);
    setEditedTask('');
    setTaskList(square.taskList);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedSquare(null);
    setModalVisible(false);
  };

  const goBack = () => {
    closeModal();
  };

  const handleToggleComplete = (squareKey, index) => {
    setCompletedTasksMap((prevCompletedTasksMap) => {
      const map = { ...prevCompletedTasksMap };
      map[squareKey][index] = !map[squareKey][index];
      return map;
    });

    saveData();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 30 }}>Task Lists</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
        Total Completed Tasks: {totalCompletedTasks()}
      </Text>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addSquare}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={squares}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.square, { backgroundColor: item.color }]}
            onPress={() => openModal(item.key)}
          >
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteSquare(item.key)}>
              <AntDesign name="delete" size={28} color="red" />
            </TouchableOpacity>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.completedInfo}>
  <Text style={styles.completedCount}>
    {completedTasksMap[item.key] ? completedTasksMap[item.key].filter(Boolean).length : 0}/{item.taskList.length}
  </Text>
</View>

            <FlatList
              data={item.taskList}
              renderItem={({ item: task, index }) => (
                <View style={styles.taskContainer}>
                  <View style={styles.circleCheck}>
                    
                  </View>
                  <TaskItem
                    item={task}
                    index={index}
                    completedTasks={completedTasksMap[item.key]}
                    handleToggleComplete={() => handleToggleComplete(item.key, index)}
                    onDeleteTask={deleteTask}
                  />
                </View>
              )}
              keyExtractor={(task, index) => index.toString()}
              contentContainerStyle={styles.taskListContainer}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        inverted
        contentContainerStyle={{ flexDirection: 'row-reverse' }}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput
            style={styles.modalInput1}
            placeholder="Title"
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />
          <AddTask addTask={addTask} />
          <FlatList
            data={taskList}
            renderItem={({ item, index }) => (
              <TaskItem
                item={item}
                index={index}
                completedTasks={completedTasksMap[selectedSquare.key]}
                handleToggleComplete={() => handleToggleComplete(selectedSquare.key, index)}
                onDeleteTask={deleteTask}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.taskListContainer}
          />
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
