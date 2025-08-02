import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/navBar';

const { width } = Dimensions.get('window');

const userProgress = {
  level: 12,
  xp: 2350,
  xpToNextLevel: 2500,
  totalExercises: 40,
  completedExercises: 28,
  streak: 7,
  badges: [
    { id: 1, name: 'Flex Master', icon: '🏆', color: '#10B981', earned: true },
    { id: 2, name: 'Layout Wizard', icon: '🎨', color: '#3B82F6', earned: true },
    { id: 3, name: 'Code Ninja', icon: '🥷', color: '#8B5CF6', earned: true },
    { id: 4, name: 'React Native Pro', icon: '📱', color: '#F59E0B', earned: false },
    { id: 5, name: 'Animation Master', icon: '🎭', color: '#EF4444', earned: false },
    { id: 6, name: 'Expo Legend', icon: '🚀', color: '#EC4899', earned: false },
  ]
};

const weeklyStats = [
  { day: 'Seg', exercises: 3, date: '22' },
  { day: 'Ter', exercises: 5, date: '23' },
  { day: 'Qua', exercises: 2, date: '24' },
  { day: 'Qui', exercises: 4, date: '25' },
  { day: 'Sex', exercises: 6, date: '26' },
  { day: 'Sáb', exercises: 1, date: '27' },
  { day: 'Dom', exercises: 0, date: '28' },
];

const skillsProgress = [
  { skill: 'Flexbox', progress: 90, color: '#10B981' },
  { skill: 'React Native', progress: 65, color: '#3B82F6' },
  { skill: 'Expo APIs', progress: 40, color: '#8B5CF6' },
  { skill: 'Animações', progress: 35, color: '#F59E0B' },
  { skill: 'Performance', progress: 25, color: '#EF4444' },
];

const recentAchievements = [
  { 
    title: 'Flex Master Completado!', 
    description: 'Você dominou todos os conceitos básicos de Flexbox',
    date: '2 dias atrás',
    icon: '🏆',
    color: '#10B981'
  },
  { 
    title: 'Sequência de 7 dias!', 
    description: 'Manteve a consistência por uma semana inteira',
    date: '1 dia atrás',
    icon: '🔥',
    color: '#F59E0B'
  },
  { 
    title: 'Layout Expert', 
    description: 'Criou 5 layouts complexos sem ajuda',
    date: '3 dias atrás',
    icon: '🎨',
    color: '#3B82F6'
  },
];

const Badge = ({ badge }: { badge: typeof userProgress.badges[0] }) => {
  return (
    <View style={[styles.badge, { opacity: badge.earned ? 1 : 0.3 }]}>
      <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
        <Text style={styles.badgeIconText}>{badge.icon}</Text>
      </View>
      <Text style={styles.badgeName}>{badge.name}</Text>
      {!badge.earned && <Text style={styles.badgeStatus}>Bloqueado</Text>}
    </View>
  );
};

const SkillBar = ({ skill }: { skill: typeof skillsProgress[0] }) => {
  return (
    <View style={styles.skillContainer}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.skill}</Text>
        <Text style={styles.skillPercentage}>{skill.progress}%</Text>
      </View>
      <View style={styles.skillBar}>
        <View 
          style={[
            styles.skillProgress, 
            { 
              width: `${skill.progress}%`, 
              backgroundColor: skill.color 
            }
          ]} 
        />
      </View>
    </View>
  );
};

const ActivityDay = ({ day }: { day: typeof weeklyStats[0] }) => {
  const maxExercises = Math.max(...weeklyStats.map(d => d.exercises));
  const height = day.exercises === 0 ? 4 : Math.max(4, (day.exercises / maxExercises) * 40);
  
  return (
    <View style={styles.activityDay}>
      <Text style={styles.dayLabel}>{day.day}</Text>
      <View style={styles.dayBar}>
        <View 
          style={[
            styles.dayProgress, 
            { 
              height: height,
              backgroundColor: day.exercises > 0 ? '#10B981' : '#E5E7EB'
            }
          ]} 
        />
      </View>
      <Text style={styles.dayNumber}>{day.date}</Text>
    </View>
  );
};

const AchievementItem = ({ achievement }: { achievement: typeof recentAchievements[0] }) => {
  return (
    <View style={styles.achievementItem}>
      <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
        <Text style={styles.achievementIconText}>{achievement.icon}</Text>
      </View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementDate}>{achievement.date}</Text>
      </View>
    </View>
  );
};

export default function ProgressPage() {
  const progressPercentage = (userProgress.completedExercises / userProgress.totalExercises) * 100;
  const xpPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📊 Seu Progresso</Text>
          <Text style={styles.subtitle}>
            Acompanhe sua jornada de aprendizado
          </Text>
        </View>

        {/* Level & XP */}
        <View style={styles.levelContainer}>
          <View style={styles.levelInfo}>
            <Text style={styles.levelNumber}>Nível {userProgress.level}</Text>
            <Text style={styles.xpText}>{userProgress.xp} / {userProgress.xpToNextLevel} XP</Text>
          </View>
          <View style={styles.xpBar}>
            <View 
              style={[styles.xpProgress, { width: `${xpPercentage}%` }]} 
            />
          </View>
          <Text style={styles.xpToNext}>
            {userProgress.xpToNextLevel - userProgress.xp} XP para próximo nível
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.statNumber}>{userProgress.completedExercises}</Text>
            <Text style={styles.statLabel}>Exercícios Concluídos</Text>
            <Text style={styles.statPercentage}>{Math.round(progressPercentage)}%</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.statNumber}>{userProgress.streak}</Text>
            <Text style={styles.statLabel}>Dias Consecutivos</Text>
            <Text style={styles.statPercentage}>🔥 Sequência</Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>📅 Atividade da Semana</Text>
          <View style={styles.activityChart}>
            {weeklyStats.map((day, index) => (
              <ActivityDay key={index} day={day} />
            ))}
          </View>
          <Text style={styles.activitySummary}>
            {weeklyStats.reduce((sum, day) => sum + day.exercises, 0)} exercícios esta semana
          </Text>
        </View>

        {/* Skills Progress */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>💪 Habilidades</Text>
          {skillsProgress.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </View>

        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>🏆 Conquistas</Text>
          <View style={styles.badgesGrid}>
            {userProgress.badges.map((badge) => (
              <Badge key={badge.id} badge={badge} />
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>🎉 Conquistas Recentes</Text>
          {recentAchievements.map((achievement, index) => (
            <AchievementItem key={index} achievement={achievement} />
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
  levelContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  xpText: {
    fontSize: 16,
    color: '#6B7280',
  },
  xpBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 8,
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  xpToNext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  statPercentage: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  activitySection: {
    marginBottom: 30,
  },
  activityChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityDay: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  dayBar: {
    height: 50,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dayProgress: {
    width: 12,
    borderRadius: 2,
  },
  dayNumber: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activitySummary: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  skillsSection: {
    marginBottom: 30,
  },
  skillContainer: {
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
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  skillPercentage: {
    fontSize: 14,
    color: '#6B7280',
  },
  skillBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skillProgress: {
    height: '100%',
    borderRadius: 4,
  },
  badgesSection: {
    marginBottom: 30,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  badge: {
    alignItems: 'center',
    width: (width - 64) / 3, // 3 badges por linha
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeIconText: {
    fontSize: 24,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeStatus: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  achievementsSection: {
    marginBottom: 100,
  },
  achievementItem: {
    flexDirection: 'row',
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
