import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  },
  '2': {
    title: 'Justify Content',
    description: 'Alinhe os elementos no eixo principal para corresponder ao objetivo.',
    objective: 'Centralize os elementos horizontalmente',
    options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    correct: 'center',
    explanation: 'justify-content: center centraliza os elementos no eixo principal.',
    type: 'quiz',
  },
  '3': {
    title: 'Align Items',
    description: 'Alinhe os elementos no eixo perpendicular.',
    objective: 'Centralize os elementos verticalmente',
    options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    correct: 'center',
    explanation: 'align-items: center centraliza os elementos no eixo perpendicular.',
    type: 'quiz',
  },
  '4': {
    title: 'Flex Wrap',
    description: 'Controle como os elementos se comportam quando não cabem no container.',
    objective: 'Permita que os elementos quebrem para a próxima linha',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
    correct: 'wrap',
    explanation: 'flex-wrap: wrap permite que os elementos quebrem para a próxima linha.',
    type: 'quiz',
  },
  '5': {
    title: 'Align Content',
    description: 'Alinhe as linhas no container quando há quebra de linha.',
    objective: 'Centralize as linhas no container',
    options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'stretch'],
    correct: 'center',
    explanation: 'align-content: center centraliza as linhas no container.',
    type: 'quiz',
  },
  '6': {
    title: 'Flex Grow & Shrink',
    description: 'Controle como os elementos crescem e encolhem.',
    objective: 'Faça o elemento do meio ocupar o espaço restante',
    options: ['flex: 0', 'flex: 1', 'flex: 2', 'flex: auto'],
    correct: 'flex: 1',
    explanation: 'flex: 1 faz o elemento crescer para ocupar o espaço disponível.',
    type: 'quiz',
  },
  // Exercícios de Codificação
  '7': {
    title: 'Navbar Horizontal',
    description: 'Crie uma navbar com links alinhados horizontalmente',
    objective: 'Implemente uma navbar onde os links ficam alinhados horizontalmente com espaçamento igual entre eles.',
    type: 'code',
    template: `const navbar = {
  // Adicione as propriedades CSS aqui
  display: '',
  
};`,
    solution: `const navbar = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
};`,
    hints: ['Use display: flex', 'justifyContent para espaçamento', 'alignItems para alinhamento vertical'],
  },
  '8': {
    title: 'Layout de Cards',
    description: 'Crie um grid responsivo de cards usando flex',
    objective: 'Organize os cards em linhas que se ajustam automaticamente.',
    type: 'code',
    template: `const cardContainer = {
  // Complete o CSS
  display: '',
  
};`,
    solution: `const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'space-between',
};`,
    hints: ['Use flex-wrap para quebra de linha', 'gap para espaçamento', 'justify-content para distribuição'],
  },
  '9': {
    title: 'Sidebar Layout',
    description: 'Desenvolva um layout com sidebar e conteúdo principal',
    objective: 'Crie um layout com sidebar fixa à esquerda e conteúdo principal flexível.',
    type: 'code',
    template: `const layoutContainer = {
  // Complete o layout
  display: '',
  
};`,
    solution: `const layoutContainer = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
};

const sidebar = {
  width: '250px',
  backgroundColor: '#f5f5f5',
  flex: '0 0 auto',
};

const mainContent = {
  flex: 1,
  padding: '20px',
  overflow: 'auto',
};`,
    hints: ['Use flex-direction: row', 'Sidebar com largura fixa', 'Main content com flex: 1'],
  },
  '10': {
    title: 'Holy Grail Layout',
    description: 'Implemente o famoso layout Holy Grail com Flexbox',
    objective: 'Crie layout com header, footer, sidebar e main content.',
    type: 'code',
    template: `const holyGrailContainer = {
  // Complete o layout
  display: '',
  
};`,
    solution: `const holyGrailContainer = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const header = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem',
};

const main = {
  display: 'flex',
  flex: 1,
};

const sidebar = {
  width: '200px',
  backgroundColor: '#f0f0f0',
};

const content = {
  flex: 1,
  padding: '1rem',
};

const footer = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem',
};`,
    hints: ['Container principal com flex-direction: column', 'Main section com flex: 1', 'Sidebar com largura fixa'],
  },
  '11': {
    title: 'Centro Perfeito',
    description: 'Centralize um elemento vertical e horizontalmente',
    objective: 'Faça o elemento ficar perfeitamente centralizado no container.',
    type: 'code',
    template: `const centerContainer = {
  // Complete para centralizar
  display: '',
  height: '100vh',
  
};`,
    solution: `const centerContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};`,
    hints: ['justify-content para centro horizontal', 'align-items para centro vertical', 'height para ocupar a tela'],
  },
  '12': {
    title: 'Modal Dialog',
    description: 'Crie um modal centralizado com overlay',
    objective: 'Desenvolva um modal que fica perfeitamente centrado na tela.',
    type: 'code',
    template: `const modalOverlay = {
  // Complete o modal
  display: '',
  
};`,
    solution: `const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContent = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '90%',
};`,
    hints: ['position: fixed para overlay', 'Flex para centralizar', 'rgba para fundo semitransparente'],
  },
  '13': {
    title: 'Responsive Navigation',
    description: 'Navegação que se adapta a diferentes tamanhos de tela',
    objective: 'Crie uma navegação responsiva que funciona em mobile e desktop.',
    type: 'code',
    template: `const navigation = {
  // Complete a navegação responsiva
  display: '',
  
};`,
    solution: `const navigation = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '#333',
};

const navLinks = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  gap: '1rem',
};

const navLinksMobile = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  backgroundColor: '#333',
};`,
    hints: ['Flex horizontal para desktop', 'Flex vertical para mobile', 'Media queries para responsividade'],
  },
  '14': {
    title: 'Card Grid System',
    description: 'Sistema de grid de cards responsivo',
    objective: 'Crie um grid que se adapta automaticamente ao tamanho da tela.',
    type: 'code',
    template: `const cardGrid = {
  // Complete o grid responsivo
  display: '',
  
};`,
    solution: `const cardGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
};

const card = {
  flex: '1 1 300px',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  minWidth: '250px',
  maxWidth: '350px',
};`,
    hints: ['flex-wrap: wrap para quebra', 'flex: 1 1 300px para responsividade', 'gap para espaçamento uniforme'],
  },
  '15': {
    title: 'Sticky Footer',
    description: 'Footer que gruda no final da página',
    objective: 'Implemente um footer que sempre fica no final, mesmo com pouco conteúdo.',
    type: 'code',
    template: `const pageContainer = {
  // Complete o sticky footer
  display: '',
  
};`,
    solution: `const pageContainer = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const header = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem',
};

const main = {
  flex: 1,
  padding: '1rem',
};

const footer = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem',
  marginTop: 'auto',
};`,
    hints: ['min-height: 100vh no container', 'flex: 1 no main content', 'margin-top: auto no footer'],
  },
  '16': {
    title: 'Form Layout',
    description: 'Crie um formulário bem estruturado com Flexbox',
    objective: 'Organize os campos do formulário em uma coluna com espaçamento adequado.',
    type: 'code',
    template: `const formContainer = {
  // Organize o formulário
  display: '',
  
};`,
    solution: `const formContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const formButton = {
  alignSelf: 'flex-start',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};`,
    hints: ['flex-direction: column para organizar verticalmente', 'gap para espaçamento', 'max-width para limitar largura'],
  },
  '17': {
    title: 'Image Gallery',
    description: 'Galeria de imagens responsiva',
    objective: 'Crie uma galeria que organiza imagens automaticamente.',
    type: 'code',
    template: `const gallery = {
  // Complete a galeria
  display: '',
  
};`,
    solution: `const gallery = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
};

const imageItem = {
  flex: '1 1 200px',
  maxWidth: '300px',
  height: '200px',
  overflow: 'hidden',
  borderRadius: '8px',
};

const image = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};`,
    hints: ['flex-wrap para múltiplas linhas', 'flex: 1 1 200px para responsividade', 'object-fit: cover para imagens'],
  },
  '18': {
    title: 'Dashboard Layout',
    description: 'Layout de dashboard com múltiplas seções',
    objective: 'Crie um dashboard com header, sidebar e área de conteúdo.',
    type: 'code',
    template: `const dashboard = {
  // Complete o dashboard
  display: '',
  
};`,
    solution: `const dashboard = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const dashboardHeader = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const dashboardBody = {
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
};

const sidebar = {
  width: '250px',
  backgroundColor: '#f8fafc',
  borderRight: '1px solid #e2e8f0',
  overflow: 'auto',
};

const mainContent = {
  flex: 1,
  padding: '1rem',
  overflow: 'auto',
};`,
    hints: ['Layout vertical para estrutura principal', 'Layout horizontal para body', 'overflow: auto para scroll'],
  },
  '19': {
    title: 'Pricing Cards',
    description: 'Cards de preços com alinhamento perfeito',
    objective: 'Crie cards de preços que ficam alinhados independente do conteúdo.',
    type: 'code',
    template: `const pricingContainer = {
  // Complete os cards de preço
  display: '',
  
};`,
    solution: `const pricingContainer = {
  display: 'flex',
  gap: '2rem',
  padding: '2rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const pricingCard = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  padding: '2rem',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  backgroundColor: 'white',
};

const cardHeader = {
  textAlign: 'center',
  marginBottom: '1rem',
};

const cardFeatures = {
  flex: 1,
  marginBottom: '2rem',
};

const cardButton = {
  marginTop: 'auto',
  padding: '0.75rem',
  backgroundColor: '#2563eb',
  color: 'white',
  textAlign: 'center',
  borderRadius: '4px',
};`,
    hints: ['flex-direction: column nos cards', 'flex: 1 na seção de features', 'margin-top: auto no botão'],
  },
  '20': {
    title: 'Timeline Layout',
    description: 'Timeline vertical com indicadores',
    objective: 'Crie uma timeline vertical com pontos e linhas conectoras.',
    type: 'code',
    template: `const timeline = {
  // Complete a timeline
  display: '',
  
};`,
    solution: `const timeline = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
};

const timelineItem = {
  display: 'flex',
  gap: '1rem',
  position: 'relative',
};

const timelineMarker = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#2563eb',
  flexShrink: 0,
  marginTop: '0.25rem',
};

const timelineContent = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};`,
    hints: ['flex-direction: column para itens verticais', 'position: relative para linhas conectoras', 'flex-shrink: 0 no marker'],
  },
  // 🚀 EXERCÍCIOS REACT NATIVE/EXPO
  '27': {
    title: 'Animated Tabs',
    description: 'Crie tabs com animações usando Animated API do React Native',
    objective: 'Implemente tabs que deslizam suavemente com indicador animado.',
    type: 'react-native',
    template: `import { Animated, View, TouchableOpacity } from 'react-native';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const animatedValue = new Animated.Value(0);
  
  const animateTab = (index) => {
    // Complete a animação aqui
    
  };
  
  return (
    <View style={styles.container}>
      {/* Seu código aqui */}
    </View>
  );
};`,
    solution: `import { Animated, View, TouchableOpacity, Text } from 'react-native';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const animatedValue = new Animated.Value(0);
  
  const animateTab = (index) => {
    setActiveTab(index);
    Animated.spring(animatedValue, {
      toValue: index,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.indicator,
          {
            left: animatedValue.interpolate({
              inputRange: [0, 1, 2],
              outputRange: ['0%', '33.33%', '66.66%'],
            }),
          }
        ]} 
      />
      {tabs.map((tab, index) => (
        <TouchableOpacity 
          key={index}
          onPress={() => animateTab(index)}
        >
          <Text>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};`,
    hints: ['Use Animated.Value para controlar posição', 'Animated.spring para suavidade', 'interpolate para calcular posições'],
  },
  '28': {
    title: 'Pull to Refresh',
    description: 'Implemente pull-to-refresh em ScrollView',
    objective: 'Adicione funcionalidade de puxar para atualizar.',
    type: 'react-native',
    template: `import { ScrollView, RefreshControl } from 'react-native';

const PullToRefreshList = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    // Complete a função de refresh
    
  };
  
  return (
    <ScrollView
      refreshControl={
        // Adicione o RefreshControl aqui
      }
    >
      {/* Conteúdo da lista */}
    </ScrollView>
  );
};`,
    solution: `import { ScrollView, RefreshControl } from 'react-native';

const PullToRefreshList = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#10B981']}
          tintColor="#10B981"
        />
      }
    >
      {data.map(item => (
        <Text key={item.id}>{item.title}</Text>
      ))}
    </ScrollView>
  );
};`,
    hints: ['Use RefreshControl component', 'useState para gerenciar estado refreshing', 'useCallback para otimizar performance'],
  },
  '32': {
    title: 'Camera Integration',
    description: 'Interface de câmera com Expo Camera',
    objective: 'Crie uma tela de câmera com controles de captura.',
    type: 'expo',
    template: `import { Camera } from 'expo-camera';
import { useState, useRef } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  
  // Implemente as funções de câmera
  
  return (
    <Camera style={{ flex: 1 }} ref={cameraRef}>
      {/* Adicione controles aqui */}
    </Camera>
  );
};`,
    solution: `import { Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };
  
  return (
    <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity onPress={takePicture}>
          <Text>Capturar</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};`,
    hints: ['Solicite permissão da câmera', 'Use useRef para referenciar camera', 'takePictureAsync para capturar'],
  },
};

const DemoBox = ({ style, text }: { style?: any; text?: string }) => (
  <View style={[styles.demoBox, style]}>
    <Text style={styles.demoBoxText}>{text || '📦'}</Text>
  </View>
);

export default function ExercisePage() {
  const { id } = useLocalSearchParams();
  const exercise = exercises[id as keyof typeof exercises];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [showHints, setShowHints] = useState(false);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercício não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCodeExercise = exercise.type === 'code';
  const isQuizExercise = !isCodeExercise;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  const handleCodeSubmit = () => {
    setShowResult(true);
  };

  const resetExercise = () => {
    setSelectedOption(null);
    setShowResult(false);
    setUserCode('');
    setShowHints(false);
  };

  const initializeCodeTemplate = () => {
    if (isCodeExercise && userCode === '' && 'template' in exercise) {
      setUserCode(exercise.template);
    }
  };

  React.useEffect(() => {
    initializeCodeTemplate();
  }, []);

  const getDemoStyle = () => {
    if (!selectedOption || isCodeExercise) return {};

    const baseStyle = {
      flexDirection: 'row' as any,
      justifyContent: 'flex-start' as any,
      alignItems: 'flex-start' as any,
      flexWrap: 'nowrap' as any,
      alignContent: 'flex-start' as any,
    };

    switch (exercise.title) {
      case 'Flex Direction':
        return { ...baseStyle, flexDirection: selectedOption as any };
      case 'Justify Content':
        return { ...baseStyle, justifyContent: selectedOption as any };
      case 'Align Items':
        return { ...baseStyle, alignItems: selectedOption as any };
      case 'Flex Wrap':
        return { ...baseStyle, flexWrap: selectedOption as any };
      case 'Align Content':
        return { ...baseStyle, flexWrap: 'wrap', alignContent: selectedOption as any };
      default:
        return baseStyle;
    }
  };

  const isCorrect = isQuizExercise && 'correct' in exercise 
    ? selectedOption === exercise.correct 
    : false;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.title}</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {/* Objetivo */}
        <View style={styles.objectiveContainer}>
          <Text style={styles.objectiveTitle}>🎯 Objetivo:</Text>
          <Text style={styles.objective}>{exercise.objective}</Text>
        </View>

        {/* Demo Container - apenas para exercícios de quiz */}
        {isQuizExercise && (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Visualização:</Text>
            <View style={[styles.demoArea, getDemoStyle()]}>
              {exercise.title === 'Flex Grow & Shrink' ? (
                <>
                  <DemoBox text="A" />
                  <DemoBox 
                    style={selectedOption === 'flex: 1' ? { flex: 1 } : {}} 
                    text="B" 
                  />
                  <DemoBox text="C" />
                </>
              ) : (
                <>
                  <DemoBox text="1" />
                  <DemoBox text="2" />
                  <DemoBox text="3" />
                  {exercise.title === 'Flex Wrap' && (
                    <>
                      <DemoBox text="4" />
                      <DemoBox text="5" />
                      <DemoBox text="6" />
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        )}

        {/* Code Editor - para exercícios de código */}
        {isCodeExercise && 'template' in exercise && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeTitle}>💻 Editor de Código:</Text>
            <TextInput
              style={styles.codeEditor}
              value={userCode}
              onChangeText={setUserCode}
              multiline
              placeholder="Digite seu código aqui..."
              placeholderTextColor="#9CA3AF"
            />
            
            {/* Hints */}
            <TouchableOpacity 
              style={styles.hintsButton}
              onPress={() => setShowHints(!showHints)}
            >
              <Text style={styles.hintsButtonText}>
                {showHints ? '🙈 Ocultar Dicas' : '💡 Ver Dicas'}
              </Text>
            </TouchableOpacity>

            {showHints && 'hints' in exercise && (
              <View style={styles.hintsContainer}>
                {exercise.hints.map((hint, index) => (
                  <Text key={index} style={styles.hintText}>• {hint}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleCodeSubmit}>
              <Text style={styles.submitButtonText}>🚀 Verificar Código</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quiz Options */}
        {isQuizExercise && 'options' in exercise && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Escolha a propriedade correta:</Text>
            {exercise.options.map((option: string) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                  showResult && 'correct' in exercise && option === exercise.correct && styles.correctOption,
                  showResult && selectedOption === option && 'correct' in exercise && option !== exercise.correct && styles.incorrectOption,
                ]}
                onPress={() => handleOptionSelect(option)}
                disabled={showResult}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText,
                  showResult && 'correct' in exercise && option === exercise.correct && styles.correctOptionText,
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Result */}
        {showResult && (
          <View style={[styles.resultContainer, isCorrect ? styles.correctResult : styles.incorrectResult]}>
            <Text style={styles.resultTitle}>
              {isCodeExercise ? '🎉 Código Submetido!' : (isCorrect ? '✅ Correto!' : '❌ Incorreto')}
            </Text>
            
            {isQuizExercise && 'explanation' in exercise && (
              <Text style={styles.explanation}>{exercise.explanation}</Text>
            )}
            
            {isCodeExercise && 'solution' in exercise && (
              <View>
                <Text style={styles.solutionTitle}>💡 Solução Esperada:</Text>
                <View style={styles.solutionContainer}>
                  <Text style={styles.solutionText}>{exercise.solution}</Text>
                </View>
              </View>
            )}
            
            <TouchableOpacity style={styles.resetButton} onPress={resetExercise}>
              <Text style={styles.resetButtonText}>
                {isCodeExercise ? 'Tentar Outro Código' : 'Tentar Novamente'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  objectiveContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  objective: {
    fontSize: 14,
    color: '#1E40AF',
  },
  demoContainer: {
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  demoArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  demoBox: {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  demoBoxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  incorrectOption: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'monospace',
  },
  selectedOptionText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#065F46',
    fontWeight: '600',
  },
  resultContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  correctResult: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  incorrectResult: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#6B7280',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  // Estilos para exercícios de código
  codeContainer: {
    marginBottom: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  codeEditor: {
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    fontFamily: 'monospace',
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#374151',
  },
  hintsButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  hintsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  hintsContainer: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  hintText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  solutionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  solutionContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 16,
  },
  solutionText: {
    fontSize: 12,
    color: '#1F2937',
    fontFamily: 'monospace',
  },
});
