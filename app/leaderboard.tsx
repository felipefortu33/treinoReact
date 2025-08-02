import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Layout from '../components/Layout';

const { width } = Dimensions.get('window');

interface User {
  id: number;
  name: string;
  avatar: string;
  level: number;
  totalPoints: number;
  exercisesCompleted: number;
  rank: string;
  streak: number;
  country: string;
  isCurrentUser?: boolean;
}

const leaderboardData: User[] = [
  {
    id: 1,
    name: "CodeMaster_BR",
    avatar: "👨‍💻",
    level: 42,
    totalPoints: 15420,
    exercisesCompleted: 89,
    rank: "Lenda",
    streak: 47,
    country: "🇧🇷"
  },
  {
    id: 2,
    name: "FlexboxQueen",
    avatar: "👩‍💻",
    level: 38,
    totalPoints: 12850,
    exercisesCompleted: 76,
    rank: "Mestre",
    streak: 23,
    country: "🇧🇷"
  },
  {
    id: 3,
    name: "ReactNinja",
    avatar: "🥷",
    level: 35,
    totalPoints: 11200,
    exercisesCompleted: 68,
    rank: "Mestre",
    streak: 31,
    country: "🇧🇷"
  },
  {
    id: 4,
    name: "CSSWizard",
    avatar: "🧙‍♂️",
    level: 32,
    totalPoints: 9850,
    exercisesCompleted: 61,
    rank: "Expert",
    streak: 15,
    country: "🇺🇸"
  },
  {
    id: 5,
    name: "LayoutLegend",
    avatar: "⚡",
    level: 29,
    totalPoints: 8300,
    exercisesCompleted: 54,
    rank: "Expert",
    streak: 12,
    country: "🇨🇦"
  },
  {
    id: 6,
    name: "Você",
    avatar: "😎",
    level: 8,
    totalPoints: 2150,
    exercisesCompleted: 12,
    rank: "Avançado",
    streak: 5,
    country: "🇧🇷",
    isCurrentUser: true
  }
];

export default function LeaderboardPage() {
  const [selectedTab, setSelectedTab] = useState<'global' | 'brazil' | 'friends'>('global');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [animatedValues] = useState(leaderboardData.map(() => new Animated.Value(0)));

  useEffect(() => {
    // Animar entrada dos itens
    Animated.stagger(100, 
      animatedValues.map(value =>
        Animated.spring(value, {
          toValue: 1,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular atualização dos dados
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getRankColor = (rank: string) => {
    const colors: { [key: string]: string } = {
      'Lenda': '#8B5CF6',
      'Mestre': '#F59E0B',
      'Expert': '#EF4444',
      'Avançado': '#3B82F6',
      'Intermediário': '#10B981',
      'Iniciante': '#6B7280'
    };
    return colors[rank] || '#6B7280';
  };

  const getRankIcon = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `${position}`;
  };

  const UserCard = ({ user, position, animatedValue }: { user: User, position: number, animatedValue: Animated.Value }) => (
    <Animated.View
      style={[
        styles.userCard,
        user.isCurrentUser && styles.currentUserCard,
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
      <View style={styles.positionContainer}>
        <Text style={[
          styles.position,
          position <= 3 && styles.topPosition,
          user.isCurrentUser && styles.currentUserPosition
        ]}>
          {getRankIcon(position)}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, user.isCurrentUser && styles.currentUserName]}>
                {user.name}
              </Text>
              <Text style={styles.country}>{user.country}</Text>
            </View>
            <View style={styles.userStats}>
              <View style={[styles.rankBadge, { backgroundColor: getRankColor(user.rank) }]}>
                <Text style={styles.rankText}>Lv.{user.level}</Text>
              </View>
              <Text style={styles.rankLabel}>{user.rank}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalPoints.toLocaleString()}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.exercisesCompleted}</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.streak}</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>
        </View>
      </View>

      {user.isCurrentUser && (
        <TouchableOpacity style={styles.viewProfileButton}>
          <Ionicons name="person" size={16} color="#6366F1" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  return (
    <Layout title="Ranking Global">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#E5E7EB" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.title}>Ranking</Text>
            <Text style={styles.subtitle}>Competição Global</Text>
          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Filtros de Aba */}
        <View style={styles.tabsContainer}>
          {[
            { id: 'global', label: 'Global', icon: 'globe' as const },
            { id: 'brazil', label: 'Brasil', icon: 'flag' as const },
            { id: 'friends', label: 'Amigos', icon: 'people' as const }
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab.id as any)}
            >
              <Ionicons 
                name={tab.icon} 
                size={16} 
                color={selectedTab === tab.id ? "#6366F1" : "#9CA3AF"} 
              />
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtro de Tempo */}
        <View style={styles.timeFilters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.timeFilterContainer}>
              {[
                { id: 'today', label: 'Hoje' },
                { id: 'week', label: 'Esta Semana' },
                { id: 'month', label: 'Este Mês' },
                { id: 'all', label: 'Todo Tempo' }
              ].map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.timeFilter,
                    timeFilter === filter.id && styles.activeTimeFilter
                  ]}
                  onPress={() => setTimeFilter(filter.id as any)}
                >
                  <Text style={[
                    styles.timeFilterText,
                    timeFilter === filter.id && styles.activeTimeFilterText
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista do Ranking */}
        <ScrollView 
          style={styles.leaderboard}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#6366F1']}
              tintColor="#6366F1"
            />
          }
        >
          {/* Top 3 Pódium */}
          <View style={styles.podiumContainer}>
            <Text style={styles.sectionTitle}>🏆 Pódium</Text>
            <View style={styles.podium}>
              {/* 2º Lugar */}
              <View style={[styles.podiumPlace, styles.secondPlace]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[1].avatar}</Text>
                <View style={styles.podiumRank}>
                  <Text style={styles.podiumNumber}>2</Text>
                </View>
                <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[1].totalPoints.toLocaleString()} XP</Text>
              </View>

              {/* 1º Lugar */}
              <View style={[styles.podiumPlace, styles.firstPlace]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[0].avatar}</Text>
                <View style={[styles.podiumRank, styles.firstPlaceRank]}>
                  <Text style={styles.podiumNumber}>1</Text>
                </View>
                <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[0].totalPoints.toLocaleString()} XP</Text>
              </View>

              {/* 3º Lugar */}
              <View style={[styles.podiumPlace, styles.thirdPlace]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[2].avatar}</Text>
                <View style={styles.podiumRank}>
                  <Text style={styles.podiumNumber}>3</Text>
                </View>
                <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[2].totalPoints.toLocaleString()} XP</Text>
              </View>
            </View>
          </View>

          {/* Lista Completa */}
          <View style={styles.fullList}>
            <Text style={styles.sectionTitle}>📊 Ranking Completo</Text>
            {leaderboardData.map((user, index) => (
              <UserCard 
                key={user.id} 
                user={user} 
                position={index + 1}
                animatedValue={animatedValues[index]}
              />
            ))}
          </View>

          {/* Ações */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/exercise-list')}
            >
              <Ionicons name="code-slash" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Fazer Exercícios</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => router.push('/challenges')}
            >
              <Ionicons name="trophy" size={20} color="#6366F1" />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
                Ver Desafios
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1B23',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#2D2E36',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  tabText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6366F1',
  },
  timeFilters: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeFilterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  timeFilter: {
    backgroundColor: '#1A1B23',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTimeFilter: {
    backgroundColor: '#6366F1',
  },
  timeFilterText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTimeFilterText: {
    color: '#FFFFFF',
  },
  leaderboard: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  podiumContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 16,
  },
  podiumPlace: {
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 16,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  firstPlace: {
    borderColor: '#F59E0B',
    backgroundColor: '#1F1611',
    transform: [{ translateY: -8 }],
  },
  secondPlace: {
    borderColor: '#9CA3AF',
  },
  thirdPlace: {
    borderColor: '#CD7F32',
  },
  podiumAvatar: {
    fontSize: 32,
    marginBottom: 8,
  },
  podiumRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D2E36',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  firstPlaceRank: {
    backgroundColor: '#F59E0B',
  },
  podiumNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumPoints: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  fullList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  currentUserCard: {
    borderColor: '#6366F1',
    backgroundColor: '#1A1B28',
  },
  positionContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  position: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  topPosition: {
    fontSize: 20,
  },
  currentUserPosition: {
    color: '#6366F1',
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
    flex: 1,
  },
  currentUserName: {
    color: '#6366F1',
  },
  country: {
    fontSize: 14,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rankLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  viewProfileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D2E36',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  actions: {
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#6366F1',
  },
  bottomSpacing: {
    height: 40,
  },
});
