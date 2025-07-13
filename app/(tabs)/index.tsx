import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskItem: {
    paddingVertical: 8,
    fontSize: 16,
  },
  taskRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
},

});
