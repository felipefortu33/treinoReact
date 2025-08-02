import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Layout from '../components/Layout';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const userStats = {
    level: 8,
    xp: 2150,
    nextLevelXP: 1000,
    streak: 5,
    completedExercises: 12,
    totalExercises: 45,
    rank: 'Avançado'
  };

  const quickActions = [
    {
      id: 'exercise-list',
      title: 'Exercícios Beecrowd',
      description: 'Desafios avançados de programação',
      icon: 'code-slash' as const,
      color: '#8B5CF6',
      route: '/exercise-list' as const
    },
    {
      id: 'exercises',
      title: 'Exercícios Básicos',
      description: 'Aprenda CSS e React Native',
      icon: 'fitness' as const,
      color: '#10B981',
      route: '/exercises' as const
    },
    {
      id: 'challenges',
      title: 'Desafios',
      description: 'Competições e conquistas',
      icon: 'trophy' as const,
      color: '#F59E0B',
      route: '/challenges' as const
    },
    {
      id: 'leaderboard',
      title: 'Ranking',
      description: 'Veja sua posição global',
      icon: 'podium' as const,
      color: '#EF4444',
      route: '/leaderboard' as const
    }
  ];

  const recentExercises = [
    {
      id: 1001,
      title: 'Centro Perfeito',
      type: 'Flexbox',
      difficulty: 'Iniciante',
      score: 95,
      completed: true
    },
    {
      id: 1002,
      title: 'Navbar Responsiva',
      type: 'Flexbox',
      difficulty: 'Fácil',
      score: 87,
      completed: true
    },
    {
      id: 2001,
      title: 'Dashboard de Admin',
      type: 'Grid',
      difficulty: 'Médio',
      score: null,
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'Iniciante': '#10B981',
      'Fácil': '#3B82F6',
      'Médio': '#F59E0B',
      'Difícil': '#EF4444',
      'Expert': '#8B5CF6'
    };
    return colors[difficulty] || '#6B7280';
  };

  const calculateProgress = () => {
    const currentLevelXP = userStats.xp % 1000;
    return (currentLevelXP / userStats.nextLevelXP) * 100;
  };

  return (
    <Layout title="Dashboard">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <Animated.View 
          style={[
            styles.welcomeSection,
            {
              opacity: animatedValue,
              transform: [{
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Olá, CodeMaster! 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Pronto para mais um dia de aprendizado?
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.profileEmoji}>😎</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Level & XP Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nível {userStats.level}</Text>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{userStats.rank}</Text>
              </View>
            </View>
            <Text style={styles.xpText}>{userStats.xp.toLocaleString()} XP</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${calculateProgress()}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {userStats.nextLevelXP - (userStats.xp % 1000)} XP para o próximo nível
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#10B981' }]}>
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{userStats.completedExercises}</Text>
              <Text style={styles.statLabel}>Exercícios Completos</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#F59E0B' }]}>
                <Ionicons name="flame" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Dias em Sequência</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(action.route)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Exercises */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercícios Recentes</Text>
            <TouchableOpacity onPress={() => router.push('/exercise-list')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {recentExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => {
                if (exercise.completed) {
                  router.push('/exercise-list');
                } else {
                  router.push('/exercise-list');
                }
              }}
            >
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseId}>#{exercise.id}</Text>
                <View style={styles.exerciseMeta}>
                  <View style={[
                    styles.difficultyBadge, 
                    { backgroundColor: getDifficultyColor(exercise.difficulty) }
                  ]}>
                    <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
                  </View>
                  <Text style={styles.exerciseType}>{exercise.type}</Text>
                </View>
              </View>
              
              <View style={styles.exerciseRight}>
                {exercise.completed ? (
                  <View style={styles.exerciseScore}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.scoreText}>{exercise.score}%</Text>
                  </View>
                ) : (
                  <View style={styles.exercisePending}>
                    <Ionicons name="play-circle" size={20} color="#6366F1" />
                    <Text style={styles.pendingText}>Iniciar</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Challenge */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Desafio em Destaque</Text>
          <TouchableOpacity 
            style={styles.featuredCard}
            onPress={() => router.push('/challenges')}
          >
            <View style={styles.featuredContent}>
              <View style={styles.featuredIcon}>
                <Ionicons name="trophy" size={32} color="#F59E0B" />
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>Sprint Flexbox Semanal</Text>
                <Text style={styles.featuredDescription}>
                  Complete 3 exercícios de flexbox em sequência sem erros
                </Text>
                <View style={styles.featuredReward}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.rewardText}>50 XP + Título "Speed Runner"</Text>
                </View>
              </View>
            </View>
            <View style={styles.featuredProgress}>
              <Text style={styles.progressLabel}>Progresso: 1/3</Text>
              <View style={styles.challengeProgressBar}>
                <View style={[styles.challengeProgressFill, { width: '33%' }]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 Dica do Dia</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={24} color="#F59E0B" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Flexbox vs Grid</Text>
              <Text style={styles.tipText}>
                Use Flexbox para layouts unidimensionais (linha ou coluna) e Grid para 
                layouts bidimensionais (linhas e colunas simultaneamente).
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 24,
  },
  levelCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  rankBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  xpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2D2E36',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  exerciseId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseType: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  exerciseRight: {
    alignItems: 'flex-end',
  },
  exerciseScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  exercisePending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featuredCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredIcon: {
    marginRight: 16,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 8,
  },
  featuredReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  featuredProgress: {
    gap: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  challengeProgressBar: {
    height: 6,
    backgroundColor: '#2D2E36',
    borderRadius: 3,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 40,
  },
});
