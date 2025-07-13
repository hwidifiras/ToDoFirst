import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles'; // Assuming you have a styles.js file for styling
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
            <MaterialIcons
        name="delete"
        size={24}
        color="red"
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      />
          </View>
  )}
/>

    </View>
    </SafeAreaView>

    
  );
}


