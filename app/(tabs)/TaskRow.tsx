import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Task } from './types';

export interface TaskRowProps {
  item: Task;
  editingId: number | null;
  editText: string;
  setEditText: (text: string) => void;
  startEditing: (id: number, title: string) => void;
  saveEdit: (id: number) => void;
  toggleCompleted: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  item,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  toggleCompleted,
  deleteTask,
}) => (
  <>
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
        name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
        size={24}
        color={item.completed ? '#4caf50' : '#ccc'}
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
    {item.dueDate && (
      <View style={{ marginLeft: 16, marginTop: -6, marginBottom: 6 }}>
        <Text style={{ fontSize: 12, color: '#888' }}>📅 {item.dueDate}</Text>
      </View>
    )}
  </>
);

export default TaskRow;
