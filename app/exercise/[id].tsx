import { useLocalSearchParams, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../../components/Layout';

const { width } = Dimensions.get('window');

const exercises = {
  '1': {
    title: 'Flex Direction',
    description: 'Escolha a direção correta para organizar os elementos como mostrado no objetivo.',
    objective: 'Organize os elementos em uma coluna',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
    correct: 'column',
    explanation: 'flex-direction: column organiza os elementos verticalmente de cima para baixo.',
    type: 'quiz',
    difficulty: 'Básico',
    points: 10,
    hint: 'Pense em como você quer que os elementos fiquem dispostos: horizontal ou vertical?'
  },
  '2': {
    title: 'Justify Content',
    description: 'Alinhe os elementos no eixo principal para corresponder ao objetivo.',
    objective: 'Centralize os elementos horizontalmente',
    options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    correct: 'center',
    explanation: 'justify-content: center centraliza os elementos no eixo principal.',
    type: 'quiz',
    difficulty: 'Básico',
    points: 10,
    hint: 'Para centralizar no eixo principal, qual propriedade você usaria?'
  },
  '3': {
    title: 'Align Items',
    description: 'Alinhe os elementos no eixo perpendicular.',
    objective: 'Centralize os elementos verticalmente',
    options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    correct: 'center',
    explanation: 'align-items: center centraliza os elementos no eixo perpendicular.',
    type: 'quiz',
    difficulty: 'Básico',
    points: 10,
    hint: 'O eixo perpendicular é o contrário do eixo principal.'
  },
  '4': {
    title: 'Flex Wrap',
    description: 'Controle como os elementos se comportam quando não cabem no container.',
    objective: 'Permita que os elementos quebrem para a próxima linha',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
    correct: 'wrap',
    explanation: 'flex-wrap: wrap permite que os elementos quebrem para a próxima linha.',
    type: 'quiz',
    difficulty: 'Intermediário',
    points: 15,
    hint: 'Quando elementos não cabem em uma linha, o que deveria acontecer?'
  },
};

const FlexContainer = ({ 
  flexDirection, 
  justifyContent, 
  alignItems, 
  flexWrap 
}: {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
}) => (
  <View style={[
    styles.flexContainer,
    {
      flexDirection: flexDirection as any || 'row',
      justifyContent: justifyContent as any || 'flex-start',
      alignItems: alignItems as any || 'flex-start',
      flexWrap: flexWrap as any || 'nowrap',
    }
  ]}>
    <View style={[styles.flexItem, { backgroundColor: '#3B82F6' }]}>
      <Text style={styles.flexItemText}>1</Text>
    </View>
    <View style={[styles.flexItem, { backgroundColor: '#10B981' }]}>
      <Text style={styles.flexItemText}>2</Text>
    </View>
    <View style={[styles.flexItem, { backgroundColor: '#F59E0B' }]}>
      <Text style={styles.flexItemText}>3</Text>
    </View>
  </View>
);

const OptionButton = ({ 
  option, 
  isSelected, 
  isCorrect, 
  isWrong, 
  onPress, 
  disabled 
}: {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  onPress: () => void;
  disabled: boolean;
}) => {
  let backgroundColor = '#1A1B23';
  let borderColor = '#2D2E36';
  let textColor = '#FFFFFF';

  if (isSelected && !disabled) {
    backgroundColor = '#6366F1';
    borderColor = '#6366F1';
  } else if (isCorrect && disabled) {
    backgroundColor = '#10B981';
    borderColor = '#10B981';
  } else if (isWrong && disabled) {
    backgroundColor = '#EF4444';
    borderColor = '#EF4444';
  }

  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        { backgroundColor, borderColor }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.optionText, { color: textColor }]}>
        {option}
      </Text>
      {isCorrect && disabled && (
        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
      )}
      {isWrong && disabled && (
        <Ionicons name="close" size={20} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );
};

export default function ExercisePage() {
  const { id } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  const exercise = exercises[id as keyof typeof exercises];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!exercise) {
    return (
      <Layout title="Exercício não encontrado">
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color="#F59E0B" />
          <Text style={styles.errorTitle}>Exercício não encontrado</Text>
          <Text style={styles.errorDescription}>
            O exercício que você está procurando não existe.
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    
    setSelectedOption(option);
    setAttempts(prev => prev + 1);
    setShowResult(true);
  };

  const isCorrect = selectedOption === exercise.correct;
  const getScore = () => {
    if (!isCorrect) return 0;
    if (attempts === 1) return exercise.points;
    if (attempts === 2) return Math.floor(exercise.points * 0.7);
    return Math.floor(exercise.points * 0.5);
  };

  const handleContinue = () => {
    const nextId = parseInt(id as string) + 1;
    if (exercises[nextId.toString() as keyof typeof exercises]) {
      router.push(`/exercise/${nextId}`);
    } else {
      router.push('/exercises');
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '#10B981';
      case 'Intermediário': return '#F59E0B';
      case 'Avançado': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Layout 
      title={exercise.title}
      showBackButton
      onBackPress={() => router.back()}
      headerRight={
        <TouchableOpacity onPress={() => setShowHint(!showHint)}>
          <Ionicons name="help-circle" size={24} color="#6366F1" />
        </TouchableOpacity>
      }
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Exercise Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={[
                styles.difficultyBadge, 
                { backgroundColor: getDifficultyColor(exercise.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
              </View>
              <View style={styles.pointsBadge}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.pointsText}>{exercise.points} pts</Text>
              </View>
            </View>
            
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          </View>

          {/* Hint */}
          {showHint && (
            <View style={styles.hintContainer}>
              <View style={styles.hintHeader}>
                <Ionicons name="bulb" size={16} color="#F59E0B" />
                <Text style={styles.hintTitle}>Dica</Text>
              </View>
              <Text style={styles.hintText}>{exercise.hint}</Text>
            </View>
          )}

          {/* Objective */}
          <View style={styles.objectiveContainer}>
            <Text style={styles.objectiveTitle}>🎯 Objetivo</Text>
            <Text style={styles.objectiveText}>{exercise.objective}</Text>
          </View>

          {/* Visual Demo */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Resultado Esperado</Text>
            <View style={styles.demoWrapper}>
              <FlexContainer 
                flexDirection={exercise.title.includes('Direction') ? exercise.correct : 'row'}
                justifyContent={exercise.title.includes('Justify') ? exercise.correct : 'flex-start'}
                alignItems={exercise.title.includes('Align Items') ? exercise.correct : 'flex-start'}
                flexWrap={exercise.title.includes('Wrap') ? exercise.correct : 'nowrap'}
              />
            </View>
          </View>

          {/* Your Answer */}
          {selectedOption && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerTitle}>Sua Resposta</Text>
              <View style={styles.demoWrapper}>
                <FlexContainer 
                  flexDirection={exercise.title.includes('Direction') ? selectedOption : 'row'}
                  justifyContent={exercise.title.includes('Justify') ? selectedOption : 'flex-start'}
                  alignItems={exercise.title.includes('Align Items') ? selectedOption : 'flex-start'}
                  flexWrap={exercise.title.includes('Wrap') ? selectedOption : 'nowrap'}
                />
              </View>
            </View>
          )}

          {/* Options */}
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Escolha a opção correta:</Text>
            <View style={styles.optionsList}>
              {exercise.options.map((option) => (
                <OptionButton
                  key={option}
                  option={option}
                  isSelected={selectedOption === option}
                  isCorrect={option === exercise.correct}
                  isWrong={selectedOption === option && option !== exercise.correct}
                  onPress={() => handleOptionSelect(option)}
                  disabled={showResult}
                />
              ))}
            </View>
          </View>

          {/* Result */}
          {showResult && (
            <View style={[
              styles.resultContainer,
              { backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }
            ]}>
              <View style={styles.resultHeader}>
                <Ionicons 
                  name={isCorrect ? "checkmark-circle" : "close-circle"} 
                  size={24} 
                  color={isCorrect ? "#10B981" : "#EF4444"} 
                />
                <Text style={[
                  styles.resultTitle,
                  { color: isCorrect ? "#10B981" : "#EF4444" }
                ]}>
                  {isCorrect ? "Correto!" : "Incorreto"}
                </Text>
                {isCorrect && (
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>+{getScore()} XP</Text>
                  </View>
                )}
              </View>

              <Text style={styles.resultExplanation}>{exercise.explanation}</Text>

              <View style={styles.resultActions}>
                {isCorrect ? (
                  <TouchableOpacity 
                    style={styles.continueButton}
                    onPress={handleContinue}
                  >
                    <Text style={styles.continueButtonText}>Continuar</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.tryAgainButton}
                      onPress={handleTryAgain}
                    >
                      <Ionicons name="refresh" size={16} color="#FFFFFF" />
                      <Text style={styles.tryAgainButtonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.skipButton}
                      onPress={handleContinue}
                    >
                      <Text style={styles.skipButtonText}>Pular</Text>
                      <Ionicons name="arrow-forward" size={16} color="#6366F1" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Exercício {id} de {Object.keys(exercises).length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(parseInt(id as string) / Object.keys(exercises).length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  hintContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  hintText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  objectiveContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  demoContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  demoWrapper: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  flexContainer: {
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  flexItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexItemText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  answerContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  answerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  optionsContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  optionsList: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  scoreContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10B981',
  },
  resultExplanation: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 20,
  },
  resultActions: {
    gap: 12,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  tryAgainButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  tryAgainButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skipButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  progressContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  bottomSpacing: {
    height: 32,
  },
});
