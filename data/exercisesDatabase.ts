// Banco de dados completo de exercícios estilo Beecrowd
export interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'Iniciante' | 'Fácil' | 'Médio' | 'Difícil' | 'Expert';
  category: 'flexbox' | 'grid' | 'layouts' | 'responsive' | 'animations' | 'hooks' | 'navigation' | 'state' | 'performance';
  type: 'code' | 'visual' | 'quiz' | 'drag-drop' | 'challenge';
  points: number;
  timeLimit?: number; // em minutos
  hints: string[];
  solution: string;
  testCases: TestCase[];
  examples: Example[];
  tags: string[];
  prerequisites?: number[];
  unlocked: boolean;
  completed: boolean;
  bestScore?: number;
  averageTime?: number;
  submissions?: number;
  successRate?: number;
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  description: string;
}

export interface Example {
  title: string;
  code: string;
  explanation: string;
}

export const exercisesDatabase: Exercise[] = [
  // === FLEXBOX CHALLENGES ===
  {
    id: 1001,
    title: "Centro Perfeito",
    description: "Você foi contratado para criar um cartão de apresentação digital. O cliente quer que o texto esteja PERFEITAMENTE centralizado na tela, tanto horizontal quanto verticalmente. Use apenas Flexbox para resolver este desafio!",
    difficulty: "Iniciante",
    category: "flexbox",
    type: "visual",
    points: 50,
    timeLimit: 5,
    hints: [
      "Flexbox tem duas propriedades principais para alinhamento",
      "justify-content controla o eixo principal (horizontal por padrão)",
      "align-items controla o eixo perpendicular (vertical por padrão)"
    ],
    solution: `
display: flex;
justify-content: center;
align-items: center;
    `,
    testCases: [
      {
        input: { width: "100vw", height: "100vh" },
        expectedOutput: "element centered both horizontally and vertically",
        description: "Elemento deve estar no centro absoluto"
      }
    ],
    examples: [
      {
        title: "Container Flex Básico",
        code: `.container {\n  display: flex;\n}`,
        explanation: "O primeiro passo é sempre definir display: flex no container pai"
      }
    ],
    tags: ["center", "alignment", "basic"],
    unlocked: true,
    completed: false
  },

  {
    id: 1002,
    title: "Navbar Responsiva",
    description: "A startup TechFlex precisa de uma navbar que se adapte a diferentes tamanhos de tela. Em desktop, os itens devem ficar espalhados igualmente. Em mobile, devem ficar empilhados. Você consegue criar isso?",
    difficulty: "Fácil",
    category: "flexbox",
    type: "code",
    points: 100,
    timeLimit: 10,
    hints: [
      "flex-direction pode mudar com media queries",
      "justify-content: space-between distribui elementos igualmente",
      "flex-wrap pode ser útil para elementos que não cabem"
    ],
    solution: `
/* Desktop */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
}
    `,
    testCases: [
      {
        input: { screenWidth: 1200 },
        expectedOutput: "horizontal layout with space-between",
        description: "Desktop: layout horizontal com espaçamento igual"
      },
      {
        input: { screenWidth: 600 },
        expectedOutput: "vertical layout with stacked items",
        description: "Mobile: layout vertical empilhado"
      }
    ],
    examples: [
      {
        title: "Space Between",
        code: `.container {\n  display: flex;\n  justify-content: space-between;\n}`,
        explanation: "Space-between coloca o primeiro item no início e o último no final, distribuindo o resto igualmente"
      }
    ],
    tags: ["responsive", "navbar", "media-queries"],
    prerequisites: [1001],
    unlocked: true,
    completed: false
  },

  {
    id: 1003,
    title: "Desafio do Card Flipper",
    description: "Um cliente quer um card que quando você passa o mouse, ele vira e mostra informações do verso. Use flexbox para centralizar o conteúdo em ambos os lados e crie um efeito de flip 3D impressionante!",
    difficulty: "Médio",
    category: "flexbox",
    type: "challenge",
    points: 200,
    timeLimit: 15,
    hints: [
      "transform: rotateY() cria efeito 3D",
      "perspective é necessário no container pai",
      "backface-visibility: hidden esconde o verso",
      "Ambos os lados do card precisam de flexbox para centralizar"
    ],
    solution: `
.card-container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card:hover {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.card-back {
  transform: rotateY(180deg);
}
    `,
    testCases: [
      {
        input: { action: "hover" },
        expectedOutput: "card flips 180 degrees smoothly",
        description: "Card deve virar suavemente ao passar o mouse"
      },
      {
        input: { action: "no-hover" },
        expectedOutput: "card shows front face",
        description: "Card deve mostrar a frente por padrão"
      }
    ],
    examples: [
      {
        title: "Básico de Transform",
        code: `.element {\n  transform: rotateY(180deg);\n}`,
        explanation: "RotateY gira o elemento no eixo Y (vertical)"
      }
    ],
    tags: ["3d", "animation", "hover", "advanced"],
    prerequisites: [1001, 1002],
    unlocked: true,
    completed: false
  },

  // === GRID CHALLENGES ===
  {
    id: 2001,
    title: "Dashboard de Admin",
    description: "Uma empresa precisa de um dashboard com header, sidebar, área principal e footer. Use CSS Grid para criar um layout profissional que se adapte a qualquer tamanho de tela!",
    difficulty: "Médio",
    category: "grid",
    type: "visual",
    points: 250,
    timeLimit: 20,
    hints: [
      "grid-template-areas é perfeito para layouts nomeados",
      "grid-template-rows e grid-template-columns definem tamanhos",
      "fr (fraction) é útil para espaços flexíveis",
      "minmax() garante tamanhos mínimos e máximos"
    ],
    solution: `
.dashboard {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }
  .sidebar { display: none; }
}
    `,
    testCases: [
      {
        input: { screenWidth: 1200 },
        expectedOutput: "header, sidebar, main, footer layout",
        description: "Desktop: layout completo com todas as áreas"
      },
      {
        input: { screenWidth: 600 },
        expectedOutput: "header, main, footer layout (no sidebar)",
        description: "Mobile: sidebar escondida"
      }
    ],
    examples: [
      {
        title: "Grid Template Areas",
        code: `.grid {\n  grid-template-areas:\n    "header header"\n    "sidebar main";\n}`,
        explanation: "Template areas permite nomear regiões do grid"
      }
    ],
    tags: ["dashboard", "layout", "responsive", "professional"],
    unlocked: true,
    completed: false
  },

  {
    id: 2002,
    title: "Galeria de Imagens Dinâmica",
    description: "Crie uma galeria que automaticamente ajusta o número de colunas baseado no tamanho da tela. As imagens devem ter o mesmo tamanho e ocupar todo o espaço disponível!",
    difficulty: "Médio",
    category: "grid",
    type: "code",
    points: 300,
    timeLimit: 18,
    hints: [
      "auto-fit e auto-fill são seus amigos",
      "minmax() define tamanho mínimo e máximo das colunas",
      "repeat() evita repetir código",
      "object-fit: cover mantém proporção das imagens"
    ],
    solution: `
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}
    `,
    testCases: [
      {
        input: { containerWidth: 1200 },
        expectedOutput: "4-5 columns with 250px min width",
        description: "Tela grande: 4-5 colunas"
      },
      {
        input: { containerWidth: 600 },
        expectedOutput: "2 columns with 250px min width",
        description: "Tela pequena: 2 colunas"
      },
      {
        input: { containerWidth: 400 },
        expectedOutput: "1 column with full width",
        description: "Mobile: 1 coluna"
      }
    ],
    examples: [
      {
        title: "Auto-fit vs Auto-fill",
        code: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`,
        explanation: "Auto-fit faz as colunas se expandirem para preencher o espaço"
      }
    ],
    tags: ["gallery", "auto-fit", "responsive", "images"],
    prerequisites: [2001],
    unlocked: true,
    completed: false
  },

  // === REACT NATIVE SPECIFIC ===
  {
    id: 3001,
    title: "ScrollView Inteligente",
    description: "Desenvolva um feed de notícias que carrega mais conteúdo quando o usuário chega ao final da lista (infinite scroll). Inclua pull-to-refresh e indicadores de carregamento!",
    difficulty: "Difícil",
    category: "navigation",
    type: "code",
    points: 400,
    timeLimit: 25,
    hints: [
      "onEndReached é disparado quando chega ao fim",
      "onRefresh é usado para pull-to-refresh",
      "refreshing state controla o indicador",
      "onEndReachedThreshold define quando disparar o evento"
    ],
    solution: `
import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';

const InfiniteScrollFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreData = async () => {
    if (loading) return;
    
    setLoading(true);
    // Simular API call
    const newData = await fetchNews(page);
    setData(prev => [...prev, ...newData]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    const freshData = await fetchNews(1);
    setData(freshData);
    setRefreshing(false);
  };

  return (
    <FlatList
      data={data}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={() => 
        loading ? <ActivityIndicator size="large" /> : null
      }
    />
  );
};
    `,
    testCases: [
      {
        input: { action: "scroll_to_end" },
        expectedOutput: "loads more data automatically",
        description: "Deve carregar mais dados quando chegar ao fim"
      },
      {
        input: { action: "pull_down" },
        expectedOutput: "refreshes data from beginning",
        description: "Deve recarregar dados quando puxar para baixo"
      }
    ],
    examples: [
      {
        title: "FlatList Básico",
        code: `<FlatList\n  data={items}\n  renderItem={({item}) => <Item />}\n/>`,
        explanation: "FlatList é otimizada para listas grandes"
      }
    ],
    tags: ["infinite-scroll", "performance", "flatlist", "mobile"],
    unlocked: true,
    completed: false
  },

  {
    id: 3002,
    title: "Animação de Gestos",
    description: "Crie um card que pode ser arrastado para os lados para revelar ações (como curtir/descartar no Tinder). Use React Native Gesture Handler e Animated API!",
    difficulty: "Expert",
    category: "animations",
    type: "challenge",
    points: 500,
    timeLimit: 30,
    hints: [
      "PanGestureHandler detecta movimentos de arrastar",
      "Animated.Value guarda valores animados",
      "interpolate mapeia valores de entrada para saída",
      "runOnJS permite chamar funções JS do worklet"
    ],
    solution: `
import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

const SwipeableCard = ({ onSwipeLeft, onSwipeRight }) => {
  const translateX = new Animated.Value(0);
  const rotate = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const opacity = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [0.5, 1, 0.5],
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      
      if (translationX > screenWidth * 0.25) {
        // Swipe right
        Animated.timing(translateX, {
          toValue: screenWidth,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipeRight?.();
          translateX.setValue(0);
        });
      } else if (translationX < -screenWidth * 0.25) {
        // Swipe left
        Animated.timing(translateX, {
          toValue: -screenWidth,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipeLeft?.();
          translateX.setValue(0);
        });
      } else {
        // Snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }, { rotate }],
          opacity,
        }}
      >
        {/* Card content */}
      </Animated.View>
    </PanGestureHandler>
  );
};
    `,
    testCases: [
      {
        input: { gesture: "swipe_right", distance: "30%" },
        expectedOutput: "card animates off screen right, calls onSwipeRight",
        description: "Swipe direita > 25% deve ativar ação direita"
      },
      {
        input: { gesture: "swipe_left", distance: "30%" },
        expectedOutput: "card animates off screen left, calls onSwipeLeft",
        description: "Swipe esquerda > 25% deve ativar ação esquerda"
      },
      {
        input: { gesture: "small_swipe", distance: "10%" },
        expectedOutput: "card springs back to center",
        description: "Swipe pequeno deve retornar ao centro"
      }
    ],
    examples: [
      {
        title: "Interpolação Básica",
        code: `const opacity = translateX.interpolate({\n  inputRange: [-100, 0, 100],\n  outputRange: [0, 1, 0]\n});`,
        explanation: "Interpolate mapeia valores de movimento para outras propriedades"
      }
    ],
    tags: ["gestures", "animation", "advanced", "tinder-like"],
    prerequisites: [3001],
    unlocked: false,
    completed: false
  },

  // === HOOKS E STATE MANAGEMENT ===
  {
    id: 4001,
    title: "Hook Customizado: useLocalStorage",
    description: "Crie um hook personalizado que sincroniza automaticamente o state com o AsyncStorage. Deve funcionar como useState, mas persistir os dados!",
    difficulty: "Médio",
    category: "hooks",
    type: "code",
    points: 300,
    timeLimit: 20,
    hints: [
      "useEffect para carregar dados iniciais",
      "AsyncStorage para persistência",
      "useState para state local",
      "useCallback para otimizar funções"
    ],
    solution: `
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // Carregar valor inicial do storage
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(\`Error loading \${key} from AsyncStorage:\`, error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  // Função para atualizar valor
  const setValue = useCallback(async (value: any) => {
    try {
      // Permitir função como no useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error saving \${key} to AsyncStorage:\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue, loading] as const;
};

// Exemplo de uso
const ProfileScreen = () => {
  const [user, setUser, loading] = useAsyncStorage('user', {
    name: '',
    email: '',
    preferences: {}
  });

  if (loading) return <LoadingSpinner />;

  return (
    <View>
      <TextInput
        value={user.name}
        onChangeText={(name) => setUser(prev => ({...prev, name}))}
      />
    </View>
  );
};
    `,
    testCases: [
      {
        input: { action: "set_value", value: "test" },
        expectedOutput: "value saved to AsyncStorage and state updated",
        description: "Deve salvar no AsyncStorage e atualizar state"
      },
      {
        input: { action: "reload_app" },
        expectedOutput: "value persists after app restart",
        description: "Dados devem persistir após reiniciar o app"
      }
    ],
    examples: [
      {
        title: "Custom Hook Básico",
        code: `const useCounter = () => {\n  const [count, setCount] = useState(0);\n  return [count, setCount];\n};`,
        explanation: "Hooks customizados sempre começam com 'use' e podem usar outros hooks"
      }
    ],
    tags: ["custom-hooks", "asyncstorage", "persistence", "state"],
    unlocked: true,
    completed: false
  },

  // === DESAFIOS DE PERFORMANCE ===
  {
    id: 5001,
    title: "Otimização de Lista Gigante",
    description: "Você precisa renderizar uma lista com 10,000 itens sem travar a interface. Use VirtualizedList, memo, e outras técnicas de otimização para manter 60 FPS!",
    difficulty: "Expert",
    category: "performance",
    type: "challenge",
    points: 600,
    timeLimit: 35,
    hints: [
      "React.memo previne re-renders desnecessários",
      "VirtualizedList renderiza apenas itens visíveis",
      "useCallback e useMemo otimizam computações",
      "getItemLayout melhora performance de scroll"
    ],
    solution: `
import React, { memo, useCallback, useMemo } from 'react';
import { VirtualizedList, Text, View } from 'react-native';

// Item otimizado com memo
const ListItem = memo(({ item, index }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>Item #{index}</Text>
    </View>
  );
});

const OptimizedList = () => {
  // Dados mockados gigantes
  const data = useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      title: \`Item \${i}\`,
      subtitle: \`Subtitle for item \${i}\`
    }))
  , []);

  const getItem = useCallback((data, index) => data[index], []);
  
  const getItemCount = useCallback((data) => data.length, []);

  // Layout fixo para melhor performance
  const getItemLayout = useCallback((data, index) => ({
    length: 70, // altura fixa do item
    offset: 70 * index,
    index,
  }), []);

  const renderItem = useCallback(({ item, index }) => (
    <ListItem item={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={10}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemCount={getItemCount}
      getItem={getItem}
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
};
    `,
    testCases: [
      {
        input: { listSize: 10000, action: "fast_scroll" },
        expectedOutput: "maintains 60fps during scroll",
        description: "Deve manter 60 FPS com scroll rápido"
      },
      {
        input: { listSize: 10000, action: "memory_usage" },
        expectedOutput: "memory usage stays constant",
        description: "Uso de memória deve se manter constante"
      }
    ],
    examples: [
      {
        title: "React.memo",
        code: `const Item = memo(({ data }) => {\n  return <View>{data.title}</View>;\n});`,
        explanation: "Memo previne re-renders quando props não mudam"
      }
    ],
    tags: ["performance", "virtualization", "optimization", "advanced"],
    prerequisites: [3001],
    unlocked: false,
    completed: false
  }
];

// Sistema de progressão e desbloqueio
export const checkUnlockConditions = (exerciseId: number, completedExercises: number[]): boolean => {
  const exercise = exercisesDatabase.find(ex => ex.id === exerciseId);
  if (!exercise?.prerequisites) return true;
  
  return exercise.prerequisites.every(prereqId => 
    completedExercises.includes(prereqId)
  );
};

// Categorias e filtros
export const categories = [
  { id: 'all', name: 'Todos', icon: 'apps' },
  { id: 'flexbox', name: 'Flexbox', icon: 'resize' },
  { id: 'grid', name: 'Grid', icon: 'grid' },
  { id: 'layouts', name: 'Layouts', icon: 'phone-portrait' },
  { id: 'responsive', name: 'Responsivo', icon: 'phone-landscape' },
  { id: 'animations', name: 'Animações', icon: 'sparkles' },
  { id: 'hooks', name: 'Hooks', icon: 'link' },
  { id: 'navigation', name: 'Navegação', icon: 'navigate' },
  { id: 'state', name: 'State', icon: 'layers' },
  { id: 'performance', name: 'Performance', icon: 'speedometer' }
];

export const difficulties = [
  { id: 'all', name: 'Todos', color: '#6B7280' },
  { id: 'Iniciante', name: 'Iniciante', color: '#10B981' },
  { id: 'Fácil', name: 'Fácil', color: '#3B82F6' },
  { id: 'Médio', name: 'Médio', color: '#F59E0B' },
  { id: 'Difícil', name: 'Difícil', color: '#EF4444' },
  { id: 'Expert', name: 'Expert', color: '#8B5CF6' }
];

// Sistema de pontuação e rankings
export const calculateUserLevel = (totalPoints: number): { level: number, progress: number, nextLevelPoints: number } => {
  const pointsPerLevel = 1000;
  const level = Math.floor(totalPoints / pointsPerLevel) + 1;
  const currentLevelPoints = totalPoints % pointsPerLevel;
  const progress = (currentLevelPoints / pointsPerLevel) * 100;
  const nextLevelPoints = pointsPerLevel - currentLevelPoints;
  
  return { level, progress, nextLevelPoints };
};

export const getUserRank = (totalPoints: number): string => {
  if (totalPoints >= 10000) return 'Lenda';
  if (totalPoints >= 5000) return 'Mestre';
  if (totalPoints >= 2500) return 'Expert';
  if (totalPoints >= 1000) return 'Avançado';
  if (totalPoints >= 500) return 'Intermediário';
  return 'Iniciante';
};
