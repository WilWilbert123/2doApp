// TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../style/styles';
const TaskItem = ({ item, index, handleToggleComplete, onDeleteTask,completedTasks }) => {
    return (
        <View style={styles.taskListItemContainer}>
            <TouchableOpacity onPress={() => handleToggleComplete(index)}>
                <View style={[styles.circle, { backgroundColor: completedTasks[index] ? 'green' : 'white' }]}>
                    {completedTasks[index] && <AntDesign name="check" size={20} color="white" />}
                </View>
            </TouchableOpacity>
            <Text style={styles.modalTask}>{item}</Text>
            <TouchableOpacity onPress={() => onDeleteTask(index)}>
                <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

export default TaskItem;