import { router } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavBar from '../components/navBar';

const { width } = Dimensions.get('window');

const stats = {
  totalExercises: 23,
  completedExercises: 8,
  currentLevel: 12,
  xp: 2350,
  streak: 7,
};

const recentExercises = [
  { id: 1, title: 'Flex Direction', difficulty: 'Básico', completed: true },
  { id: 2, title: 'Justify Content', difficulty: 'Básico', completed: true },
  { id: 3, title: 'Align Items', difficulty: 'Básico', completed: false },
  { id: 4, title: 'Flex Wrap', difficulty: 'Intermediário', completed: false },
];

const quickActions = [
  {
    title: '🎯 Continuar Treino',
    description: 'Continue de onde parou',
    color: '#10B981',
    action: () => router.push('/exercises'),
  },
  {
    title: '🏆 Ver Desafios',
    description: 'Desafios especiais',
    color: '#F59E0B',
    action: () => router.push('/challenges'),
  },
  {
    title: '📊 Meu Progresso',
    description: 'Acompanhe sua evolução',
    color: '#3B82F6',
    action: () => router.push('/progress'),
  },
];

const ExerciseCard = ({ exercise }: { exercise: typeof recentExercises[0] }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '#10B981';
      case 'Intermediário': return '#F59E0B';
      case 'Avançado': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.exerciseCard, { opacity: exercise.completed ? 0.7 : 1 }]}
      onPress={() => router.push(`/exercise/${exercise.id}`)}
    >
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseTitle}>
          {exercise.completed ? '✅' : '⏳'} {exercise.title}
        </Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
          <Text style={styles.badgeText}>{exercise.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActionCard = ({ action }: { action: typeof quickActions[0] }) => {
  return (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor: action.color }]}
      onPress={action.action}
    >
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDescription}>{action.description}</Text>
    </TouchableOpacity>
  );
};

export default function HomePage() {
  const progressPercentage = (stats.completedExercises / stats.totalExercises) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🚀 Treino React Native</Text>
          <Text style={styles.subtitle}>
            Aprenda flexbox e desenvolvimento mobile de forma prática!
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.statNumber}>{stats.completedExercises}</Text>
            <Text style={styles.statLabel}>Concluídos</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.statNumber}>Nível {stats.currentLevel}</Text>
            <Text style={styles.statLabel}>{stats.xp} XP</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.statNumber}>{stats.streak} dias</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>📈 Seu Progresso</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progressPercentage)}% concluído ({stats.completedExercises}/{stats.totalExercises})
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <ActionCard key={index} action={action} />
            ))}
          </View>
        </View>

        {/* Recent Exercises */}
        <View style={styles.exercisesSection}>
          <Text style={styles.sectionTitle}>📚 Exercícios Recentes</Text>
          {recentExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/exercises')}
          >
            <Text style={styles.viewAllText}>Ver Todos os Exercícios →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar */}
      <NavBar style={styles.navbar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flex: 1,
    marginTop: 80,
  },
  navbar: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 30,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsSection: {
    marginBottom: 30,
  },
  actionsGrid: {
    paddingHorizontal: 20,
  },
  actionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  exercisesSection: {
    marginBottom: 100,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  exerciseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  viewAllButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
