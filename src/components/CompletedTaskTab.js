// CompletedTasksTab.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const CompletedTasksTab = ({ completedTasks, onTaskPress }) => {
  const completedCount = completedTasks.filter((task) => task).length;

  const renderCompletedTask = ({ item, index }) => (
    <TouchableOpacity onPress={() => onTaskPress(index)}>
      <Text style={{ textDecorationLine: 'line-through' }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Completed Tasks ({completedCount})
      </Text>
      <FlatList
        data={completedTasks.map((task, index) => ({ task, index }))}
        renderItem={renderCompletedTask}
        keyExtractor={(item) => item.index.toString()}
      />
    </View>
  );
};

export default CompletedTasksTab;
