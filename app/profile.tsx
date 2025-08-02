import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Layout from '../components/Layout';

const { width } = Dimensions.get('window');

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  level: number;
  totalPoints: number;
  exercisesCompleted: number;
  rank: string;
  streak: number;
  joinDate: string;
  bio: string;
  country: string;
  favoriteCategory: string;
  achievements: number;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    autoplay: boolean;
    showHints: boolean;
  };
}

const userProfile: UserProfile = {
  id: 1,
  name: "CodeMaster",
  email: "codemaster@example.com",
  avatar: "😎",
  level: 8,
  totalPoints: 2150,
  exercisesCompleted: 12,
  rank: "Avançado",
  streak: 5,
  joinDate: "Janeiro 2024",
  bio: "Desenvolvedor apaixonado por CSS e React Native. Sempre buscando aprender algo novo!",
  country: "🇧🇷 Brasil",
  favoriteCategory: "Flexbox",
  achievements: 7,
  preferences: {
    notifications: true,
    darkMode: true,
    autoplay: false,
    showHints: true
  }
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedBio, setEditedBio] = useState(profile.bio);

  const handleSaveProfile = () => {
    setProfile(prev => ({
      ...prev,
      name: editedName,
      bio: editedBio
    }));
    setIsEditing(false);
    Alert.alert('Perfil Atualizado', 'Suas informações foram salvas com sucesso!');
  };

  const handlePreferenceChange = (key: keyof typeof profile.preferences, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
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

  const calculateNextLevel = () => {
    const pointsPerLevel = 1000;
    const currentLevelPoints = profile.totalPoints % pointsPerLevel;
    const progress = (currentLevelPoints / pointsPerLevel) * 100;
    const nextLevelPoints = pointsPerLevel - currentLevelPoints;
    return { progress, nextLevelPoints };
  };

  const { progress, nextLevelPoints } = calculateNextLevel();

  const StatCard = ({ icon, label, value, color = "#6366F1" }: {
    icon: 'trophy' | 'flame' | 'medal' | 'heart';
    label: string;
    value: string | number;
    color?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const PreferenceItem = ({ 
    icon, 
    label, 
    value, 
    onValueChange,
    description 
  }: {
    icon: 'notifications' | 'moon' | 'play' | 'bulb';
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    description?: string;
  }) => (
    <View style={styles.preferenceItem}>
      <View style={styles.preferenceLeft}>
        <View style={styles.preferenceIcon}>
          <Ionicons name={icon} size={20} color="#6366F1" />
        </View>
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceLabel}>{label}</Text>
          {description && (
            <Text style={styles.preferenceDescription}>{description}</Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#2D2E36', true: '#6366F1' }}
        thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
      />
    </View>
  );

  return (
    <Layout title="Meu Perfil">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#E5E7EB" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "create"} 
              size={20} 
              color={isEditing ? "#10B981" : "#6366F1"} 
            />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{profile.avatar}</Text>
            <TouchableOpacity style={styles.avatarEditButton}>
              <Ionicons name="camera" size={16} color="#6366F1" />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={styles.nameInput}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Nome de usuário"
                placeholderTextColor="#9CA3AF"
              />
              <TextInput
                style={styles.bioInput}
                value={editedBio}
                onChangeText={setEditedBio}
                placeholder="Fale um pouco sobre você..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <View style={styles.editActions}>
                <TouchableOpacity 
                  style={[styles.editActionButton, styles.cancelButton]}
                  onPress={() => {
                    setIsEditing(false);
                    setEditedName(profile.name);
                    setEditedBio(profile.bio);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.editActionButton, styles.saveButton]}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.userEmail}>{profile.email}</Text>
              <Text style={styles.userBio}>{profile.bio}</Text>
              
              <View style={styles.profileMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="location" size={14} color="#9CA3AF" />
                  <Text style={styles.metaText}>{profile.country}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar" size={14} color="#9CA3AF" />
                  <Text style={styles.metaText}>Desde {profile.joinDate}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nível {profile.level}</Text>
              <View style={[styles.rankBadge, { backgroundColor: getRankColor(profile.rank) }]}>
                <Text style={styles.rankText}>{profile.rank}</Text>
              </View>
            </View>
            <Text style={styles.totalPoints}>{profile.totalPoints.toLocaleString()} XP</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {nextLevelPoints} XP para o próximo nível
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="trophy"
              label="Exercícios"
              value={profile.exercisesCompleted}
              color="#10B981"
            />
            <StatCard
              icon="flame"
              label="Sequência"
              value={`${profile.streak} dias`}
              color="#F59E0B"
            />
            <StatCard
              icon="medal"
              label="Conquistas"
              value={profile.achievements}
              color="#8B5CF6"
            />
            <StatCard
              icon="heart"
              label="Favorita"
              value={profile.favoriteCategory}
              color="#EF4444"
            />
          </View>
        </View>

        {/* Achievements Preview */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
            <TouchableOpacity onPress={() => router.push('/progress')}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsList}>
              {[
                { icon: "🏃‍♂️", title: "Speed Runner", description: "Complete 3 exercícios em 5 min" },
                { icon: "🔥", title: "Em Chamas", description: "Sequência de 5 dias" },
                { icon: "💡", title: "Sem Dicas", description: "Complete sem usar dicas" },
                { icon: "⚡", title: "Flash", description: "Resolva em menos de 2 min" }
              ].map((achievement, index) => (
                <View key={index} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <PreferenceItem
            icon="notifications"
            label="Notificações"
            value={profile.preferences.notifications}
            onValueChange={(value) => handlePreferenceChange('notifications', value)}
            description="Receber lembretes e atualizações"
          />
          
          <PreferenceItem
            icon="moon"
            label="Modo Escuro"
            value={profile.preferences.darkMode}
            onValueChange={(value) => handlePreferenceChange('darkMode', value)}
            description="Interface com tema escuro"
          />
          
          <PreferenceItem
            icon="play"
            label="Reprodução Automática"
            value={profile.preferences.autoplay}
            onValueChange={(value) => handlePreferenceChange('autoplay', value)}
            description="Iniciar próximo exercício automaticamente"
          />
          
          <PreferenceItem
            icon="bulb"
            label="Mostrar Dicas"
            value={profile.preferences.showHints}
            onValueChange={(value) => handlePreferenceChange('showHints', value)}
            description="Exibir dicas durante exercícios"
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/leaderboard')}
          >
            <Ionicons name="podium" size={20} color="#6366F1" />
            <Text style={styles.actionButtonText}>Ver Ranking</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/progress')}
          >
            <Ionicons name="stats-chart" size={20} color="#6366F1" />
            <Text style={styles.actionButtonText}>Progresso Detalhado</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Em Breve', 'Função de exportar dados em desenvolvimento')}
          >
            <Ionicons name="download" size={20} color="#6366F1" />
            <Text style={styles.actionButtonText}>Exportar Dados</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]}
            onPress={() => Alert.alert(
              'Sair da Conta',
              'Tem certeza que deseja sair?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive', onPress: () => router.replace('/') }
              ]
            )}
          >
            <Ionicons name="log-out" size={20} color="#EF4444" />
            <Text style={[styles.actionButtonText, styles.dangerButtonText]}>Sair da Conta</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 64,
    backgroundColor: '#1A1B23',
    borderRadius: 40,
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: 80,
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2D2E36',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F1419',
  },
  editForm: {
    width: '100%',
    gap: 16,
  },
  nameInput: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  bioInput: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#2D2E36',
    minHeight: 80,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editActionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2D2E36',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    color: '#E5E7EB',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  userBio: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  profileMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  levelSection: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalPoints: {
    fontSize: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 52) / 2,
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
  },
  achievementsList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    width: 140,
    alignItems: 'center',
    gap: 8,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E5E7EB',
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
  },
  preferencesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2E36',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  dangerButtonText: {
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 40,
  },
});
