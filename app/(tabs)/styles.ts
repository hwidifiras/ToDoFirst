import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    color: '#11114E',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 2,
    width: '80%',
  },
  addButton: {
    backgroundColor: '#11114E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  taskItem: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    opacity: 0.7,
    fontStyle: 'italic',
  },
  editInput: {
    backgroundColor: '#fffbe6',
    borderColor: '#ffd700',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'center', // Ensures vertical centering
    height: 40, // Fixed height for better alignment
  },
});

export default styles;