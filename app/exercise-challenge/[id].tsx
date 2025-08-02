import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Dimensions,
  Modal
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../../components/Layout';
import { exercisesDatabase } from '../../data/exercisesDatabase';

const { width, height } = Dimensions.get('window');

interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual?: any;
  error?: string;
}

export default function ExerciseChallengePage() {
  const { id } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const exercise = exercisesDatabase.find(ex => ex.id === parseInt(id as string));

  useEffect(() => {
    // Iniciar timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (testResults.length > 0) {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [testResults]);

  if (!exercise) {
    return (
      <Layout title="Exercício não encontrado">
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#EF4444" />
          <Text style={styles.errorTitle}>Exercício não encontrado</Text>
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

  const runTests = async () => {
    setIsRunning(true);
    setAttempts(prev => prev + 1);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Executar testes (simulado)
    const results = exercise.testCases.map(testCase => {
      // Simular execução do código
      const passed = Math.random() > 0.3; // 70% chance de passar
      return {
        passed,
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: passed ? testCase.expectedOutput : "Resultado incorreto",
        error: !passed ? "Lógica incorreta ou sintaxe inválida" : undefined
      };
    });

    setTestResults(results);
    
    // Calcular score
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    const baseScore = (passedTests / totalTests) * exercise.points;
    
    // Bonus por velocidade e tentativas
    const timeBonus = exercise.timeLimit ? Math.max(0, (exercise.timeLimit * 60 - timeElapsed) / (exercise.timeLimit * 60)) * 50 : 0;
    const attemptPenalty = Math.max(0, (attempts - 1) * 10);
    
    const finalScore = Math.round(Math.max(0, baseScore + timeBonus - attemptPenalty));
    setScore(finalScore);
    
    setIsRunning(false);
    setShowResults(true);

    // Se passou em todos os testes
    if (passedTests === totalTests) {
      setTimeout(() => {
        Alert.alert(
          'Parabéns! 🎉',
          `Exercício completo!\nPontuação: ${finalScore} XP\nTempo: ${formatTime(timeElapsed)}\nTentativas: ${attempts}`,
          [
            { text: 'Próximo Exercício', onPress: () => router.push('/exercise-list') },
            { text: 'Ver Ranking', onPress: () => router.push('/leaderboard') },
            { text: 'Continuar', style: 'cancel' }
          ]
        );
      }, 1000);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

  const CodeEditor = () => (
    <View style={styles.codeSection}>
      <View style={styles.codeHeader}>
        <Text style={styles.sectionTitle}>Seu Código</Text>
        <View style={styles.codeActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setCode('')}
          >
            <Ionicons name="trash" size={16} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {/* Implementar copy/paste */}}
          >
            <Ionicons name="copy" size={16} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={setCode}
          placeholder="// Digite seu código aqui..."
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          selectionColor="#6366F1"
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.runButton, isRunning && styles.runButtonDisabled]}
        onPress={runTests}
        disabled={isRunning || !code.trim()}
      >
        {isRunning ? (
          <View style={styles.runningIndicator}>
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [{
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  }],
                },
              ]}
            >
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
            </Animated.View>
            <Text style={styles.runButtonText}>Executando...</Text>
          </View>
        ) : (
          <View style={styles.runButtonContent}>
            <Ionicons name="play" size={20} color="#FFFFFF" />
            <Text style={styles.runButtonText}>Executar Testes</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const TestResultsView = () => (
    <Animated.View 
      style={[
        styles.resultsSection,
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
      <Text style={styles.sectionTitle}>Resultados dos Testes</Text>
      
      {testResults.map((result, index) => (
        <View key={index} style={[
          styles.testResult,
          result.passed ? styles.testPassed : styles.testFailed
        ]}>
          <View style={styles.testHeader}>
            <Text style={styles.testNumber}>Teste {index + 1}</Text>
            <Ionicons 
              name={result.passed ? "checkmark-circle" : "close-circle"} 
              size={20} 
              color={result.passed ? "#10B981" : "#EF4444"} 
            />
          </View>
          
          {!result.passed && (
            <View style={styles.testDetails}>
              <Text style={styles.testLabel}>Entrada:</Text>
              <Text style={styles.testValue}>{JSON.stringify(result.input)}</Text>
              
              <Text style={styles.testLabel}>Esperado:</Text>
              <Text style={styles.testExpected}>{JSON.stringify(result.expected)}</Text>
              
              <Text style={styles.testLabel}>Obtido:</Text>
              <Text style={styles.testActual}>{JSON.stringify(result.actual)}</Text>
              
              {result.error && (
                <>
                  <Text style={styles.testLabel}>Erro:</Text>
                  <Text style={styles.testError}>{result.error}</Text>
                </>
              )}
            </View>
          )}
        </View>
      ))}
      
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Pontuação Final</Text>
        <Text style={styles.scoreValue}>{score} XP</Text>
        <View style={styles.scoreDetails}>
          <Text style={styles.scoreDetail}>
            Testes: {testResults.filter(r => r.passed).length}/{testResults.length}
          </Text>
          <Text style={styles.scoreDetail}>Tempo: {formatTime(timeElapsed)}</Text>
          <Text style={styles.scoreDetail}>Tentativas: {attempts}</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <Layout title={exercise?.title || "Exercício"}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backIconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#E5E7EB" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{exercise.title}</Text>
            <Text style={styles.exerciseId}>#{exercise.id}</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.timer}>
              <Ionicons name="time" size={16} color="#F59E0B" />
              <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
            </View>
            {exercise.timeLimit && (
              <Text style={styles.timeLimit}>
                Limite: {exercise.timeLimit}min
              </Text>
            )}
          </View>
        </View>

        {/* Status Bar */}
        <View style={styles.statusBar}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
            <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
          </View>
          <Text style={styles.categoryText}>{exercise.category}</Text>
          <Text style={styles.pointsText}>+{exercise.points} XP</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Descrição do Problema */}
          <View style={styles.problemSection}>
            <Text style={styles.sectionTitle}>Problema</Text>
            <Text style={styles.problemDescription}>{exercise.description}</Text>
          </View>

          {/* Exemplos */}
          <View style={styles.examplesSection}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setShowExamples(!showExamples)}
            >
              <Text style={styles.sectionTitle}>Exemplos</Text>
              <Ionicons 
                name={showExamples ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
            
            {showExamples && exercise.examples.map((example, index) => (
              <View key={index} style={styles.example}>
                <Text style={styles.exampleTitle}>{example.title}</Text>
                <View style={styles.codeExample}>
                  <Text style={styles.codeExampleText}>{example.code}</Text>
                </View>
                <Text style={styles.exampleExplanation}>{example.explanation}</Text>
              </View>
            ))}
          </View>

          {/* Editor de Código */}
          <CodeEditor />

          {/* Resultados dos Testes */}
          {showResults && <TestResultsView />}

          {/* Dicas */}
          <View style={styles.hintsSection}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setShowHints(!showHints)}
            >
              <Text style={styles.sectionTitle}>
                Dicas ({currentHint + 1}/{exercise.hints.length})
              </Text>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </TouchableOpacity>
            
            {showHints && (
              <View style={styles.hintsContainer}>
                <Text style={styles.hintText}>{exercise.hints[currentHint]}</Text>
                
                <View style={styles.hintNavigation}>
                  <TouchableOpacity 
                    style={[styles.hintButton, currentHint === 0 && styles.hintButtonDisabled]}
                    onPress={() => setCurrentHint(Math.max(0, currentHint - 1))}
                    disabled={currentHint === 0}
                  >
                    <Ionicons name="chevron-back" size={16} color={currentHint === 0 ? "#6B7280" : "#E5E7EB"} />
                    <Text style={[styles.hintButtonText, currentHint === 0 && styles.hintButtonTextDisabled]}>
                      Anterior
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.hintButton, currentHint === exercise.hints.length - 1 && styles.hintButtonDisabled]}
                    onPress={() => setCurrentHint(Math.min(exercise.hints.length - 1, currentHint + 1))}
                    disabled={currentHint === exercise.hints.length - 1}
                  >
                    <Text style={[styles.hintButtonText, currentHint === exercise.hints.length - 1 && styles.hintButtonTextDisabled]}>
                      Próxima
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color={currentHint === exercise.hints.length - 1 ? "#6B7280" : "#E5E7EB"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
    padding: 20,
    paddingBottom: 16,
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  exerciseId: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  timeLimit: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryText: {
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
  },
  problemSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  problemDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  examplesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  example: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  codeExample: {
    backgroundColor: '#0F1419',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  codeExampleText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'monospace',
  },
  exampleExplanation: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  codeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  codeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1A1B23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2E36',
    marginBottom: 16,
  },
  codeInput: {
    fontSize: 14,
    color: '#E5E7EB',
    fontFamily: 'monospace',
    padding: 16,
    minHeight: 200,
  },
  runButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  runButtonDisabled: {
    backgroundColor: '#4B5563',
  },
  runButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  runningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spinner: {
    width: 20,
    height: 20,
  },
  runButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  testResult: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  testPassed: {
    backgroundColor: '#0F1B16',
    borderColor: '#10B981',
  },
  testFailed: {
    backgroundColor: '#1F1315',
    borderColor: '#EF4444',
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  testNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
  },
  testDetails: {
    gap: 8,
  },
  testLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  testValue: {
    fontSize: 12,
    color: '#E5E7EB',
    fontFamily: 'monospace',
  },
  testExpected: {
    fontSize: 12,
    color: '#10B981',
    fontFamily: 'monospace',
  },
  testActual: {
    fontSize: 12,
    color: '#EF4444',
    fontFamily: 'monospace',
  },
  testError: {
    fontSize: 12,
    color: '#F87171',
    fontStyle: 'italic',
  },
  scoreCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 8,
  },
  scoreDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  scoreDetail: {
    fontSize: 11,
    color: '#6B7280',
  },
  hintsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  hintsContainer: {
    backgroundColor: '#1A1B23',
    borderRadius: 12,
    padding: 16,
  },
  hintText: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
    marginBottom: 16,
  },
  hintNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#2D2E36',
  },
  hintButtonDisabled: {
    backgroundColor: '#1A1B23',
  },
  hintButtonText: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  hintButtonTextDisabled: {
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 40,
  },
});
