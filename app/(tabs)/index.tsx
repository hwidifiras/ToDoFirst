import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, LayoutAnimation, Platform, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import TaskRow from './TaskRow';
import { Task } from './types';
// Key for AsyncStorage
const TASKS_STORAGE_KEY = 'TODO_TASKS';
// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    // Include the tag in the input if present
    let finalCategories = categories;
    const tag = categoriesInput.trim();
    if (tag && !categories.includes(tag)) {
      finalCategories = [...categories, tag];
    }
    const newTask: Task = {
      id: Date.now(),
      title: input.trim(),
      completed: false,
      dueDate: dueDate ? dueDate : undefined,
      priority,
      categories: finalCategories,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
    setDueDate('');
    setPriority('medium');
    setCategoriesInput('');
    setCategories([]);
  };
      {/* Tag input row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          style={[styles.input, { flex: 1, minWidth: 0, marginRight: 6 }]}
          placeholder="Ajouter un tag et appuyer sur Entrée..."
          value={categoriesInput}
          onChangeText={setCategoriesInput}
          onSubmitEditing={() => {
            const tag = categoriesInput.trim();
            if (tag && !categories.includes(tag)) {
              setCategories([...categories, tag]);
            }
            setCategoriesInput('');
          }}
          returnKeyType="done"
        />
        {categories.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map((cat, idx) => (
              <TouchableOpacity
                key={cat}
                style={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  marginRight: 4,
                  marginBottom: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setCategories(categories.filter((c) => c !== cat))}
              >
                <Text style={{ color: '#1976d2', fontSize: 13 }}>{cat}</Text>
                <Text style={{ color: '#1976d2', marginLeft: 2, fontWeight: 'bold' }}>×</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
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
          style={[styles.input, { flex: 1, minWidth: 0, marginRight: 6 }]}
          placeholder="Ajouter une tâche..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Button title="Ajouter" onPress={addTask} disabled={input.trim().length === 0} />
      </View>

      {/* Tag input row, visually separated and with standard height and margin */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ marginBottom: 4, fontWeight: 'bold', color: '#333' }}>Tags&nbsp;:</Text>
        <TextInput
          style={[
            styles.input,
            {
              width: '100%',
              height: 48,
              paddingVertical: 12,
              marginBottom: 0,
              marginTop: 0,
            },
          ]}
          placeholder="Ajouter un tag et appuyer sur Entrée..."
          value={categoriesInput}
          onChangeText={setCategoriesInput}
          onSubmitEditing={() => {
            const tag = categoriesInput.trim();
            if (tag && !categories.includes(tag)) {
              setCategories([...categories, tag]);
            }
            setCategoriesInput('');
          }}
          returnKeyType="done"
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 8, fontWeight: 'bold', color: '#333' }}>Priorité:</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            backgroundColor: priority === 'low' ? '#e0f7fa' : '#f5f5f5',
            marginRight: 4,
            borderWidth: 1,
            borderColor: priority === 'low' ? '#00bcd4' : '#ccc',
            minWidth: 60,
            alignItems: 'center',
          }}
          onPress={() => setPriority('low')}
        >
          <Text style={{ color: '#00bcd4', fontWeight: priority === 'low' ? 'bold' : 'normal' }}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            backgroundColor: priority === 'medium' ? '#fffde7' : '#f5f5f5',
            marginRight: 4,
            borderWidth: 1,
            borderColor: priority === 'medium' ? '#ffc107' : '#ccc',
            minWidth: 60,
            alignItems: 'center',
          }}
          onPress={() => setPriority('medium')}
        >
          <Text style={{ color: '#ffc107', fontWeight: priority === 'medium' ? 'bold' : 'normal' }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            backgroundColor: priority === 'high' ? '#ffebee' : '#f5f5f5',
            borderWidth: 1,
            borderColor: priority === 'high' ? '#f44336' : '#ccc',
            minWidth: 60,
            alignItems: 'center',
          }}
          onPress={() => setPriority('high')}
        >
          <Text style={{ color: '#f44336', fontWeight: priority === 'high' ? 'bold' : 'normal' }}>High</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateInputRow}>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: dueDate ? '#333' : '#aaa', fontSize: 14 }} numberOfLines={1}>
            {dueDate ? `📅 ${dueDate}` : 'Date d\'échéance...'}
          </Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const iso = selectedDate.toISOString().slice(0, 10);
              setDueDate(iso);
            }
          }}
        />
      )}
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
            <TaskRow
              item={item}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              startEditing={startEditing}
              saveEdit={saveEdit}
              toggleCompleted={toggleCompleted}
              deleteTask={deleteTask}
            />
          )}
        />
      )}
    </View>
    </SafeAreaView>

    
  );
}


