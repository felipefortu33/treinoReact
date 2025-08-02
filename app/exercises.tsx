import { router } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavBar from '../components/navBar';

const { width } = Dimensions.get('window');

const exercises = [
  // Exercícios Básicos de Flexbox
  {
    id: 1,
    title: 'Flex Direction',
    description: 'Aprenda a controlar a direção dos elementos',
    difficulty: 'Básico',
    color: '#10B981',
    type: 'quiz',
    category: 'flexbox'
  },
  {
    id: 2,
    title: 'Justify Content',
    description: 'Alinhe elementos no eixo principal',
    difficulty: 'Básico',
    color: '#3B82F6',
    type: 'quiz',
    category: 'flexbox'
  },
  {
    id: 3,
    title: 'Align Items',
    description: 'Alinhe elementos no eixo perpendicular',
    difficulty: 'Básico',
    color: '#8B5CF6',
    type: 'quiz',
    category: 'flexbox'
  },
  {
    id: 4,
    title: 'Flex Wrap',
    description: 'Controle quebra de linha dos elementos',
    difficulty: 'Intermediário',
    color: '#F59E0B',
    type: 'quiz',
    category: 'flexbox'
  },
  {
    id: 5,
    title: 'Align Content',
    description: 'Alinhe linhas no container',
    difficulty: 'Intermediário',
    color: '#EF4444',
    type: 'quiz',
    category: 'flexbox'
  },
  {
    id: 6,
    title: 'Flex Grow & Shrink',
    description: 'Controle o crescimento e encolhimento',
    difficulty: 'Avançado',
    color: '#EC4899',
    type: 'quiz',
    category: 'flexbox'
  },

  // Exercícios de Codificação CSS/Layout
  {
    id: 7,
    title: 'Navbar Horizontal 💻',
    description: 'Code uma navbar com links alinhados horizontalmente',
    difficulty: 'Básico',
    color: '#06B6D4',
    type: 'code',
    category: 'layout'
  },
  {
    id: 8,
    title: 'Layout de Cards 🎨',
    description: 'Crie um grid responsivo de cards usando flex',
    difficulty: 'Básico',
    color: '#84CC16',
    type: 'code',
    category: 'layout'
  },
  {
    id: 9,
    title: 'Sidebar Layout 📱',
    description: 'Desenvolva um layout com sidebar e conteúdo principal',
    difficulty: 'Intermediário',
    color: '#A855F7',
    type: 'code',
    category: 'layout'
  },
  {
    id: 10,
    title: 'Holy Grail Layout ⚡',
    description: 'Implemente o famoso layout Holy Grail com Flexbox',
    difficulty: 'Intermediário',
    color: '#F97316',
    type: 'code',
    category: 'layout'
  },
  {
    id: 11,
    title: 'Centro Perfeito 🎯',
    description: 'Centralize um elemento vertical e horizontalmente',
    difficulty: 'Básico',
    color: '#10B981',
    type: 'code',
    category: 'layout'
  },
  {
    id: 12,
    title: 'Modal Dialog 🪟',
    description: 'Crie um modal centralizado com overlay',
    difficulty: 'Intermediário',
    color: '#3B82F6',
    type: 'code',
    category: 'layout'
  },
  {
    id: 13,
    title: 'Responsive Navigation �',
    description: 'Navegação que se adapta a diferentes tamanhos',
    difficulty: 'Avançado',
    color: '#8B5CF6',
    type: 'code',
    category: 'layout'
  },
  {
    id: 14,
    title: 'Card Grid System 🎨',
    description: 'Sistema de grid de cards responsivo',
    difficulty: 'Intermediário',
    color: '#F59E0B',
    type: 'code',
    category: 'layout'
  },
  {
    id: 15,
    title: 'Sticky Footer �',
    description: 'Footer que gruda no final da página',
    difficulty: 'Intermediário',
    color: '#EF4444',
    type: 'code',
    category: 'layout'
  },
  {
    id: 16,
    title: 'Form Layout 📝',
    description: 'Formulário bem estruturado com Flexbox',
    difficulty: 'Básico',
    color: '#EC4899',
    type: 'code',
    category: 'layout'
  },
  {
    id: 17,
    title: 'Image Gallery 🖼️',
    description: 'Galeria de imagens responsiva',
    difficulty: 'Intermediário',
    color: '#06B6D4',
    type: 'code',
    category: 'layout'
  },
  {
    id: 18,
    title: 'Dashboard Layout 📊',
    description: 'Layout de dashboard com múltiplas seções',
    difficulty: 'Avançado',
    color: '#84CC16',
    type: 'code',
    category: 'layout'
  },
  {
    id: 19,
    title: 'Pricing Cards 💰',
    description: 'Cards de preços com alinhamento perfeito',
    difficulty: 'Intermediário',
    color: '#A855F7',
    type: 'code',
    category: 'layout'
  },
  {
    id: 20,
    title: 'Timeline Layout ⏰',
    description: 'Timeline vertical com indicadores',
    difficulty: 'Avançado',
    color: '#F97316',
    type: 'code',
    category: 'layout'
  },

  // Exercícios React Native
  {
    id: 27,
    title: 'Animated Tabs 🎭',
    description: 'Tabs com animações usando Animated API',
    difficulty: 'Avançado',
    color: '#EF4444',
    type: 'react-native',
    category: 'animation'
  },
  {
    id: 28,
    title: 'Pull to Refresh �',
    description: 'Domine ScrollView com RefreshControl',
    difficulty: 'Intermediário',
    color: '#8B5CF6',
    type: 'react-native',
    category: 'react-native'
  },
  {
    id: 32,
    title: 'Camera Integration �',
    description: 'Interface de câmera com Expo Camera',
    difficulty: 'Expert',
    color: '#84CC16',
    type: 'expo',
    category: 'expo'
  },
];

const categories = [
  { id: 'all', label: 'Todos', icon: '📚', color: '#6B7280' },
  { id: 'flexbox', label: 'Flexbox', icon: '🎯', color: '#3B82F6' },
  { id: 'layout', label: 'Layout', icon: '🎨', color: '#10B981' },
  { id: 'react-native', label: 'React Native', icon: '📱', color: '#8B5CF6' },
  { id: 'animation', label: 'Animações', icon: '🎭', color: '#F59E0B' },
  { id: 'expo', label: 'Expo', icon: '🚀', color: '#EF4444' },
];

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const getColor = () => {
    switch (difficulty) {
      case 'Básico': return '#10B981';
      case 'Intermediário': return '#F59E0B';
      case 'Avançado': return '#EF4444';
      case 'Expert': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getIcon = () => {
    switch (difficulty) {
      case 'Básico': return '🌱';
      case 'Intermediário': return '🔥';
      case 'Avançado': return '⚡';
      case 'Expert': return '💎';
      default: return '📝';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getColor() }]}>
      <Text style={styles.badgeText}>
        {getIcon()} {difficulty}
      </Text>
    </View>
  );
};

const TypeBadge = ({ type }: { type: string }) => {
  const badges: { [key: string]: { color: string; label: string } } = {
    'quiz': { color: '#3B82F6', label: '❓ Quiz' },
    'code': { color: '#10B981', label: '💻 Code' },
    'react-native': { color: '#8B5CF6', label: '📱 RN' },
    'expo': { color: '#EC4899', label: '🚀 Expo' },
  };
  
  const badge = badges[type] || { color: '#6B7280', label: '📝 Other' };
  
  return (
    <View style={[styles.typeBadge, { backgroundColor: badge.color }]}>
      <Text style={[styles.badgeText, { fontSize: 10 }]}>{badge.label}</Text>
    </View>
  );
};

const ExerciseCard = ({ exercise }: { exercise: typeof exercises[0] }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: exercise.color }]}
      onPress={() => router.push(`/exercise/${exercise.id}`)}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{exercise.title}</Text>
          <View style={styles.badgeContainer}>
            <TypeBadge type={exercise.type} />
            <DifficultyBadge difficulty={exercise.difficulty} />
          </View>
        </View>
        <Text style={styles.cardDescription}>{exercise.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>💪 Exercícios</Text>
          <Text style={styles.subtitle}>
            {exercises.length} exercícios para dominar React Native
          </Text>
        </View>

        {/* Filtros de Categoria */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color },
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryLabel}>{category.label}</Text>
                <Text style={styles.categoryCount}>
                  {category.id === 'all' ? exercises.length : exercises.filter(ex => ex.category === category.id).length}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de Exercícios */}
        <View style={styles.exercisesContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Todos os Exercícios' : categories.find(c => c.id === selectedCategory)?.label} 
            ({filteredExercises.length})
          </Text>
          
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
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
  categoriesContainer: {
    marginBottom: 30,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  categoryCount: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.8,
  },
  exercisesContainer: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    lineHeight: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
