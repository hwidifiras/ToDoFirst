import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Key for AsyncStorage
const TASKS_STORAGE_KEY = 'TODO_TASKS';
// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles'; // Assuming you have a styles.js file for styling
type Task = {
  id: number;
  title: string;
  completed?: boolean;
};

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (e) {
        // Optionally handle error
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim().length === 0) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTask: Task = {
      id: Date.now(),
      title: input.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };
  const toggleCompleted = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  // deleting task with confirmation and animation
  const deleteTask = (id: number) => {
    Alert.alert(
      'Supprimer la tâche',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTasks(tasks.filter(task => task.id !== id));
          },
        },
      ]
    );
  };

  // Function to start editing a task

  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = (id: number) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, title: editText } : task
      )
    );
    setEditingId(null);
    setEditText('');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.title}>📝 Ma Liste de Tâches</Text>
      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter une tâche..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Button title="Ajouter" onPress={addTask} disabled={input.trim().length === 0} />
      </View>
      {tasks.length === 0 ? (
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          <MaterialIcons name="inbox" size={64} color="#ccc" style={{ marginBottom: 16 }} />
          <Text style={{ color: '#aaa', fontSize: 18, textAlign: 'center' }}>
            Aucune tâche pour le moment !
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              {editingId === item.id ? (
                <TextInput
                  style={[styles.taskItem, styles.editInput]}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                  onSubmitEditing={() => saveEdit(item.id)}
                  onBlur={() => saveEdit(item.id)}
                  returnKeyType="done"
                />
              ) : (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onLongPress={() => startEditing(item.id, item.title)}
                >
                  <Text style={[styles.taskItem, item.completed && styles.completedTask]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              <MaterialIcons
                name={item.completed ? "check-circle" : "radio-button-unchecked"}
                size={24}
                color={item.completed ? "#4caf50" : "#ccc"}
                style={{ marginRight: 10 }}
                onPress={() => toggleCompleted(item.id)}
              />
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
      )}
    </View>
    </SafeAreaView>

    
  );
}


