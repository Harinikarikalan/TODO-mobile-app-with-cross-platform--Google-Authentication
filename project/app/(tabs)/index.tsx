import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Clock, Star } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueTime?: string;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Mathematics',
      category: 'Study',
      priority: 'high',
      completed: false,
      dueTime: 'From 9:00 to 10:00 pm'
    },
    {
      id: '2',
      title: 'Workout',
      category: 'Health',
      priority: 'medium',
      completed: false,
      dueTime: 'From 6:00 to 7:00 pm'
    },
    {
      id: '3',
      title: 'Working on projects',
      category: 'Work',
      priority: 'high',
      completed: false,
      dueTime: 'From 9:00 to 6:00 pm'
    },
    {
      id: '4',
      title: 'Read a book',
      category: 'Personal',
      priority: 'low',
      completed: true,
      dueTime: 'From 8:00 to 9:00 pm'
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello!</Text>
          <Text style={styles.subtitle}>You have {pendingTasks.length} tasks today</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedTasks.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingTasks.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today Tasks</Text>
          
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, task.completed && styles.completedTask]}
              onPress={() => toggleTask(task.id)}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                </View>
                <View style={styles.taskActions}>
                  <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                  <TouchableOpacity 
                    style={[styles.checkbox, task.completed && styles.checkedBox]}
                    onPress={() => toggleTask(task.id)}
                  >
                    {task.completed && <Check size={16} color="#ffffff" />}
                  </TouchableOpacity>
                </View>
              </View>
              
              {task.dueTime && (
                <View style={styles.timeContainer}>
                  <Clock size={14} color="#6b7280" />
                  <Text style={styles.timeText}>{task.dueTime}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d946ef',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: '#f9fafb',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  taskCategory: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#d946ef',
    borderColor: '#d946ef',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
});