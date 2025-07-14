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
}) => {
  return (
    <View style={[styles.row, item.completed && styles.completedRow]}>
      <TouchableOpacity onPress={() => toggleCompleted(item.id)} style={styles.circle}>
        {item.completed && <MaterialIcons name="check" size={18} color="#fff" />}
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        {editingId === item.id ? (
          <TextInput
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={() => saveEdit(item.id)}
            style={styles.editInput}
            autoFocus
          />
        ) : (
          <Text style={[styles.title, item.completed && styles.completedText]}>{item.title}</Text>
        )}
        {/* Priority, due date, and tag chips */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
          {item.dueDate && (
            <View style={styles.dueDateChip}>
              <Text style={styles.dueDateText}>📅 {item.dueDate}</Text>
            </View>
          )}
          {item.priority && (
            <View style={
              item.priority === 'high'
                ? styles.highPriorityChip
                : item.priority === 'medium'
                ? styles.mediumPriorityChip
                : styles.lowPriorityChip
            }>
              <Text style={
                item.priority === 'high'
                  ? styles.highPriorityText
                  : item.priority === 'medium'
                  ? styles.mediumPriorityText
                  : styles.lowPriorityText
              }>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
              </Text>
            </View>
          )}
          {item.categories && item.categories.length > 0 && item.categories.map((cat) => (
            <View key={cat} style={styles.tagChip}>
              <Text style={{ color: '#1976d2', fontSize: 13 }}>#{cat}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskRow;
