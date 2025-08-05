import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueTime, setDueTime] = useState('');
  const router = useRouter();

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    // In a real app, this would save to a database
    Alert.alert('Success', 'Task added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const priorities = [
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'low', label: 'Low', color: '#10b981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Task</Text>
          <Text style={styles.subtitle}>Create a new task to stay organized</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              value={title}
              onChangeText={setTitle}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Work, Personal, Study"
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Due Time (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., From 9:00 to 10:00 pm"
              value={dueTime}
              onChangeText={setDueTime}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.priorityButton,
                    priority === p.value && styles.selectedPriority,
                    { borderColor: p.color }
                  ]}
                  onPress={() => setPriority(p.value as any)}
                >
                  <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
                  <Text style={[
                    styles.priorityText,
                    priority === p.value && { color: p.color }
                  ]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <LinearGradient
              colors={['#ec4899', '#d946ef']}
              style={styles.buttonGradient}
            >
              <Text style={styles.addButtonText}>Add Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 50,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  selectedPriority: {
    backgroundColor: '#fef7f7',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  addButton: {
    marginTop: 20,
    marginBottom: 40,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});