import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Layout from '../components/Layout';
import { exercisesDatabase, categories, difficulties, checkUnlockConditions, calculateUserLevel } from '../data/exercisesDatabase';

const { width } = Dimensions.get('window');

export default function ExercisePage() {
  const [exercises, setExercises] = useState(exercisesDatabase);
  const [filteredExercises, setFilteredExercises] = useState(exercisesDatabase);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([1001, 1002]); // Simulando progresso
  const [userPoints, setUserPoints] = useState(350); // Simulando pontos do usuário

  const userLevel = calculateUserLevel(userPoints);

  useEffect(() => {
    filterExercises();
  }, [selectedCategory, selectedDifficulty, searchQuery, exercises]);

  const filterExercises = () => {
    let filtered = exercises;

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }

    // Filtro por dificuldade
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }

    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(query) ||
        ex.description.toLowerCase().includes(query) ||
        ex.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Verificar quais exercícios estão desbloqueados
    filtered = filtered.map(ex => ({
      ...ex,
      unlocked: checkUnlockConditions(ex.id, completedExercises)
    }));

    setFilteredExercises(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    const difficultyColors: { [key: string]: string } = {
      'Iniciante': '#10B981',
      'Fácil': '#3B82F6',
      'Médio': '#F59E0B',
      'Difícil': '#EF4444',
      'Expert': '#8B5CF6'
    };
    return difficultyColors[difficulty] || '#6B7280';
  };

  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      'flexbox': 'resize',
      'grid': 'grid',
      'layouts': 'phone-portrait',
      'responsive': 'phone-landscape',
      'animations': 'sparkles',
      'hooks': 'link',
      'navigation': 'navigate',
      'state': 'layers',
      'performance': 'speedometer'
    };
    return categoryIcons[category] || 'code-slash';
  };

  const handleExercisePress = (exercise: any) => {
    if (!exercise.unlocked) {
      Alert.alert(
        'Exercício Bloqueado',
        'Complete os exercícios pré-requisitos para desbloquear este desafio!',
        [{ text: 'OK' }]
      );
      return;
    }

    router.push(`/exercise-challenge/${exercise.id}`);
  };

  const ExerciseCard = ({ exercise }: { exercise: any }) => {
    const isCompleted = completedExercises.includes(exercise.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.exerciseCard,
          !exercise.unlocked && styles.exerciseCardLocked,
          isCompleted && styles.exerciseCardCompleted
        ]}
        onPress={() => handleExercisePress(exercise)}
        disabled={!exercise.unlocked}
      >
        {/* Header do Card */}
        <View style={styles.cardHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
            <Ionicons 
              name={getCategoryIcon(exercise.category) as any} 
              size={20} 
              color="#FFFFFF" 
            />
          </View>
          
          <View style={styles.cardInfo}>
            <Text style={[styles.exerciseTitle, !exercise.unlocked && styles.textLocked]}>
              {exercise.title}
            </Text>
            <Text style={[styles.exerciseId, !exercise.unlocked && styles.textLocked]}>
              #{exercise.id}
            </Text>
          </View>

          <View style={styles.cardRight}>
            {isCompleted ? (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
            ) : !exercise.unlocked ? (
              <View style={styles.lockedBadge}>
                <Ionicons name="lock-closed" size={16} color="#6B7280" />
              </View>
            ) : (
              <Text style={styles.pointsText}>+{exercise.points} XP</Text>
            )}
          </View>
        </View>

        {/* Descrição */}
        <Text style={[styles.exerciseDescription, !exercise.unlocked && styles.textLocked]}>
          {exercise.description}
        </Text>

        {/* Tags e Metadados */}
        <View style={styles.cardFooter}>
          <View style={styles.tags}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
              <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{exercise.type}</Text>
            </View>
          </View>

          <View style={styles.metadata}>
            {exercise.timeLimit && (
              <View style={styles.metadataItem}>
                <Ionicons name="time" size={12} color="#9CA3AF" />
                <Text style={styles.metadataText}>{exercise.timeLimit}min</Text>
              </View>
            )}
            <View style={styles.metadataItem}>
              <Ionicons name="code" size={12} color="#9CA3AF" />
              <Text style={styles.metadataText}>{exercise.category}</Text>
            </View>
          </View>
        </View>

        {/* Pré-requisitos */}
        {exercise.prerequisites && exercise.prerequisites.length > 0 && !exercise.unlocked && (
          <View style={styles.prerequisites}>
            <Text style={styles.prerequisitesLabel}>Pré-requisitos:</Text>
            <View style={styles.prerequisitesList}>
              {exercise.prerequisites.map((prereqId: number) => (
                <Text key={prereqId} style={styles.prerequisitesItem}>
                  #{prereqId}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Indicador de Progresso para Exercícios com Múltiplas Partes */}
        {exercise.testCases && exercise.testCases.length > 1 && isCompleted && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Layout title="Lista de Exercícios">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header com Stats do Usuário */}
        <View style={styles.header}>
          <View style={styles.userStats}>
            <Text style={styles.headerTitle}>Exercícios Avançados</Text>
            <Text style={styles.headerSubtitle}>Desafios estilo Beecrowd</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Nível {userLevel.level}</Text>
                <Text style={styles.statLabel}>Atual</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userPoints} XP</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{completedExercises.length}</Text>
                <Text style={styles.statLabel}>Completos</Text>
              </View>
            </View>

            {/* Barra de Progresso do Nível */}
            <View style={styles.levelProgress}>
              <View style={styles.progressBarBackground}>
                <View style={[
                  styles.progressBarFill, 
                  { width: `${userLevel.progress}%` }
                ]} />
              </View>
              <Text style={styles.progressText}>
                {userLevel.nextLevelPoints} XP para próximo nível
              </Text>
            </View>
          </View>
        </View>

        {/* Barra de Busca e Filtros */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar exercícios..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={20} color="#E5E7EB" />
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            {/* Categorias */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Categoria</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.filterOption,
                        selectedCategory === category.id && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedCategory(category.id)}
                    >
                      <Ionicons 
                        name={category.icon as any} 
                        size={16} 
                        color={selectedCategory === category.id ? "#6366F1" : "#9CA3AF"} 
                      />
                      <Text style={[
                        styles.filterOptionText,
                        selectedCategory === category.id && styles.filterOptionTextActive
                      ]}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Dificuldades */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Dificuldade</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {difficulties.map(difficulty => (
                    <TouchableOpacity
                      key={difficulty.id}
                      style={[
                        styles.filterOption,
                        selectedDifficulty === difficulty.id && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedDifficulty(difficulty.id)}
                    >
                      <View style={[
                        styles.difficultyDot,
                        { backgroundColor: difficulty.color }
                      ]} />
                      <Text style={[
                        styles.filterOptionText,
                        selectedDifficulty === difficulty.id && styles.filterOptionTextActive
                      ]}>
                        {difficulty.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {/* Lista de Exercícios */}
        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredExercises.length} exercício{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {filteredExercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}

          {filteredExercises.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="code-slash" size={64} color="#6B7280" />
              <Text style={styles.emptyTitle}>Nenhum exercício encontrado</Text>
              <Text style={styles.emptyDescription}>
                Tente ajustar os filtros ou buscar por outros termos
              </Text>
            </View>
          )}
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
    padding: 20,
    paddingTop: 10,
  },
  userStats: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  levelProgress: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#2D2E36',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#E5E7EB',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  filterOptionActive: {
    backgroundColor: '#2D2E36',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  filterOptionTextActive: {
    color: '#6366F1',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  exercisesSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
  },
  exerciseCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  exerciseCardLocked: {
    opacity: 0.6,
    backgroundColor: '#16171D',
  },
  exerciseCardCompleted: {
    borderColor: '#10B981',
    backgroundColor: '#0F1B16',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  exerciseId: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  textLocked: {
    color: '#6B7280',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#2D2E36',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  metadata: {
    flexDirection: 'row',
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metadataText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  prerequisites: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#16171D',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  prerequisitesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 4,
  },
  prerequisitesList: {
    flexDirection: 'row',
    gap: 8,
  },
  prerequisitesItem: {
    fontSize: 11,
    color: '#9CA3AF',
    backgroundColor: '#2D2E36',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2D2E36',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
