import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: number;
  title: string;
};

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim().length === 0) return;

    const newTask: Task = {
      id: Date.now(),
      title: input.trim(),
    };

    setTasks([newTask, ...tasks]);
    setInput('');
  };
  const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id));
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.title}>📝 Ma Liste de Tâches</Text>

      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche..."
        value={input}
        onChangeText={setInput}
      />

      <Button title="Ajouter" onPress={addTask} />

      <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.taskRow}>
      <Text style={styles.taskItem}>• {item.title}</Text>
      <Button title="Supprimer" color="red" onPress={() => deleteTask(item.id)} />
    </View>
  )}
/>

    </View>
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 10,
  backgroundColor: '#fff',
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#11114E', // your theme color
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  borderRadius: 8,
  marginBottom: 10,
},
taskItem: {
  fontSize: 16,
  color: '#333',
},
taskRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
safeArea: {
  flex: 1,
  backgroundColor: '#fff',
},

});
