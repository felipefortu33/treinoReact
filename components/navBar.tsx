import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

type NavBarProps = {
  style?: ViewStyle;
};

const links = [
  { 
    label: '🏠 Início', 
    route: '/',
    description: 'Página principal',
    badge: null,
  },
  { 
    label: '💪 Exercícios', 
    route: '/exercises',
    description: '40 exercícios disponíveis',
    badge: '40',
  },
  { 
    label: '🎯 Desafios', 
    route: '/challenges',
    description: 'Novos desafios',
    badge: 'NEW',
  },
  { 
    label: '📊 Progresso', 
    route: '/progress',
    description: 'Seu progresso',
    badge: '75%',
  },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.95)', // Semi-transparente
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 25, // Mais arredondado
    marginHorizontal: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)', // Borda sutil
  },
  activeIndicator: {
    position: 'absolute',
    top: 6,
    width: '20%',
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
    zIndex: 1,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 80,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  activeButton: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    transform: [{ scale: 1.05 }],
  },
  linkText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  activeLinkText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#9CA3AF',
    fontSize: 8,
    textAlign: 'center',
    fontWeight: '400',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  progressBadge: {
    backgroundColor: '#10B981',
  },
  newBadge: {
    backgroundColor: '#F59E0B',
  },
});

function NavBar({ style }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animação do indicador ativo
    Animated.spring(animatedValue, {
      toValue: activeTab,
      useNativeDriver: false,
      tension: 120,
      friction: 8,
    }).start();

    // Animação de pulso para badges
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [activeTab]);

  const handlePress = (index: number, route: string) => {
    setActiveTab(index);
    
    // Navegação real
    router.push(route as any);
    
    console.log(`Navegando para: ${route}`);
  };

  const getBadgeStyle = (badge: string | null) => {
    if (!badge) return {};
    if (badge === 'NEW') return styles.newBadge;
    if (badge.includes('%')) return styles.progressBadge;
    return {};
  };

  return (
    <View style={[styles.container, style]}>
      {/* Indicador animado */}
      <Animated.View 
        style={[
          styles.activeIndicator,
          {
            left: animatedValue.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: ['8%', '30%', '52%', '74%'],
            }),
          }
        ]} 
      />
      
      {links.map((link, index) => (
        <TouchableOpacity 
          key={link.label} 
          onPress={() => handlePress(index, link.route)} 
          style={[
            styles.linkButton,
            activeTab === index && styles.activeButton
          ]}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.linkText,
            activeTab === index && styles.activeLinkText
          ]}>
            {link.label}
          </Text>
          <Text style={styles.descriptionText}>
            {link.description}
          </Text>
          
          {/* Badge com animação */}
          {link.badge && (
            <Animated.View 
              style={[
                styles.badge, 
                getBadgeStyle(link.badge),
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              <Text style={styles.badgeText}>{link.badge}</Text>
            </Animated.View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default NavBar;
