// AddTask.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../style/styles';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      addTask(task);
      setTask('');
    }
  };

  return (
    <View style={styles.addTaskContainer}>
      <TextInput
        style={styles.modalInput}
        placeholder="Task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
        <Text style={styles.addTaskButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;
