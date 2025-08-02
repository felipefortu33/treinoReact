import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavBar from '../components/navBar';

const challenges = [
  {
    id: 'flex-master',
    title: '🏆 Flex Master Challenge',
    description: 'Complete todos os exercícios de Flexbox básicos',
    progress: 5,
    total: 6,
    difficulty: 'Básico',
    color: '#10B981',
    reward: '100 XP + Badge "Flex Básico"',
    exercises: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'layout-wizard',
    title: '🎨 Layout Wizard',
    description: 'Crie 5 layouts complexos sem ajuda',
    progress: 2,
    total: 5,
    difficulty: 'Intermediário',
    color: '#F59E0B',
    reward: '250 XP + Badge "Designer"',
    exercises: [7, 8, 9, 10, 11]
  },
  {
    id: 'react-native-pro',
    title: '📱 React Native Pro',
    description: 'Domine componentes nativos avançados',
    progress: 0,
    total: 8,
    difficulty: 'Avançado',
    color: '#8B5CF6',
    reward: '500 XP + Badge "RN Expert"',
    exercises: [11, 12, 13, 14, 15, 16, 17, 18]
  },
  {
    id: 'expo-master',
    title: '🚀 Expo Master',
    description: 'Integre todas as APIs do Expo',
    progress: 0,
    total: 6,
    difficulty: 'Expert',
    color: '#EF4444',
    reward: '1000 XP + Badge "Expo Legend"',
    exercises: [18, 19, 20, 21, 22, 23]
  },
  {
    id: 'animation-ninja',
    title: '🎭 Animation Ninja',
    description: 'Crie animações fluidas e interativas',
    progress: 1,
    total: 4,
    difficulty: 'Expert',
    color: '#EC4899',
    reward: '750 XP + Badge "Animator"',
    exercises: [15, 16, 17, 24]
  },
  {
    id: 'performance-guru',
    title: '⚡ Performance Guru',
    description: 'Otimize apps para máxima performance',
    progress: 0,
    total: 3,
    difficulty: 'Expert',
    color: '#06B6D4',
    reward: '600 XP + Badge "Optimizer"',
    exercises: [25, 26, 27]
  }
];

const weeklyChallenge = {
  title: '🔥 Desafio da Semana',
  description: 'Clone a interface do Instagram Stories',
  deadline: '3 dias restantes',
  difficulty: 'Avançado',
  reward: '500 XP + Badge Especial',
  participants: 142,
  color: '#8B5CF6'
};

const ChallengeCard = ({ challenge }: { challenge: typeof challenges[0] }) => {
  const progressPercentage = (challenge.progress / challenge.total) * 100;
  
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: challenge.color }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{challenge.title}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: challenge.color }]}>
            <Text style={styles.badgeText}>{challenge.difficulty}</Text>
          </View>
        </View>
        
        <Text style={styles.cardDescription}>{challenge.description}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%`, backgroundColor: challenge.color }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {challenge.progress}/{challenge.total} exercícios
          </Text>
        </View>
        
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardLabel}>🎁 Recompensa:</Text>
          <Text style={styles.rewardText}>{challenge.reward}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: challenge.color }]}
          onPress={() => {
            // Navegar para o primeiro exercício não concluído
            const nextExercise = challenge.exercises[challenge.progress];
            if (nextExercise) {
              router.push(`/exercise/${nextExercise}`);
            }
          }}
        >
          <Text style={styles.startButtonText}>
            {challenge.progress === 0 ? 'Começar Desafio' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const WeeklyChallengeCard = () => {
  return (
    <View style={[styles.weeklyCard, { borderColor: weeklyChallenge.color }]}>
      <View style={styles.weeklyHeader}>
        <Text style={styles.weeklyTitle}>{weeklyChallenge.title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: weeklyChallenge.color }]}>
          <Text style={styles.badgeText}>{weeklyChallenge.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.weeklyDescription}>{weeklyChallenge.description}</Text>
      
      <View style={styles.weeklyStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>⏰</Text>
          <Text style={styles.statLabel}>{weeklyChallenge.deadline}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>👥</Text>
          <Text style={styles.statLabel}>{weeklyChallenge.participants} participantes</Text>
        </View>
      </View>
      
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardLabel}>🏆 Prêmio:</Text>
        <Text style={styles.rewardText}>{weeklyChallenge.reward}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.weeklyButton, { backgroundColor: weeklyChallenge.color }]}
      >
        <Text style={styles.startButtonText}>Participar Agora</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ChallengesPage() {
  const completedChallenges = challenges.filter(c => c.progress === c.total).length;
  const totalXP = challenges.reduce((sum, c) => {
    if (c.progress === c.total) {
      return sum + parseInt(c.reward.match(/\d+/)?.[0] || '0');
    }
    return sum;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Desafios</Text>
          <Text style={styles.subtitle}>
            Teste suas habilidades e ganhe recompensas!
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{completedChallenges}</Text>
            <Text style={styles.statLabel}>Concluídos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalXP}</Text>
            <Text style={styles.statLabel}>XP Ganho</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{challenges.length - completedChallenges}</Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
        </View>

        {/* Weekly Challenge */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>🔥 Desafio da Semana</Text>
          <WeeklyChallengeCard />
        </View>

        {/* Regular Challenges */}
        <View style={styles.challengesSection}>
          <Text style={styles.sectionTitle}>📋 Desafios Regulares</Text>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  weeklySection: {
    marginBottom: 30,
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weeklyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  weeklyDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 22,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  challengesSection: {
    marginBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
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
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  rewardContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  rewardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  rewardText: {
    fontSize: 14,
    color: '#6B7280',
  },
  startButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
