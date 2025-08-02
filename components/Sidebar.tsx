import { router, usePathname } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = 280;

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  slideAnim: Animated.Value;
}

const menuItems = [
  {
    id: 'home',
    title: 'Início',
    icon: 'home' as const,
    route: '/',
    description: 'Dashboard principal',
    color: '#6366F1',
  },
  {
    id: 'exercises',
    title: 'Exercícios',
    icon: 'fitness' as const,
    route: '/exercises',
    description: '23 exercícios disponíveis',
    color: '#10B981',
    badge: '23',
  },
  {
    id: 'challenges',
    title: 'Desafios',
    icon: 'trophy' as const,
    route: '/challenges',
    description: 'Desafios especiais',
    color: '#F59E0B',
    badge: 'NEW',
  },
  {
    id: 'progress',
    title: 'Progresso',
    icon: 'stats-chart' as const,
    route: '/progress',
    description: 'Acompanhe sua evolução',
    color: '#3B82F6',
    badge: '75%',
  },
];

const userStats = {
  level: 12,
  xp: 2350,
  nextLevelXp: 3000,
  streak: 7,
  completedExercises: 8,
  totalExercises: 23,
};

export default function Sidebar({ isVisible, onClose, slideAnim }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (route: string) => {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.startsWith(route)) return true;
    return false;
  };

  const handleNavigation = (route: string) => {
    router.push(route as any);
    onClose();
  };

  const progressPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

  return (
    <>
      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: slideAnim.interpolate({
              inputRange: [-SIDEBAR_WIDTH, 0],
              outputRange: [0, 0.5],
            }),
            pointerEvents: isVisible ? 'auto' : 'none',
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          }
        ]}
      >
        <SafeAreaView style={styles.sidebarContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.appTitle}>🚀 Treino React</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            {/* User Stats */}
            <View style={styles.userStats}>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Nível {userStats.level}</Text>
                <Text style={styles.xpText}>{userStats.xp} XP</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${progressPercentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(progressPercentage)}% para o próximo nível
                </Text>
              </View>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userStats.streak}</Text>
                  <Text style={styles.statLabel}>dias</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{userStats.completedExercises}/{userStats.totalExercises}</Text>
                  <Text style={styles.statLabel}>exercícios</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Navigation Menu */}
          <View style={styles.navigation}>
            <Text style={styles.navigationTitle}>Navegação</Text>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  isActive(item.route) && styles.menuItemActive
                ]}
                onPress={() => handleNavigation(item.route)}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <Ionicons 
                    name={item.icon} 
                    size={20} 
                    color="white" 
                  />
                </View>
                
                <View style={styles.menuContent}>
                  <Text style={[
                    styles.menuTitle,
                    isActive(item.route) && styles.menuTitleActive
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                
                {item.badge && (
                  <View style={[styles.badge, { backgroundColor: item.color }]}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                
                {isActive(item.route) && (
                  <View style={[styles.activeIndicator, { backgroundColor: item.color }]} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Continue aprendendo e evoluindo! 🎯
            </Text>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 999,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#1A1B23',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
  },
  sidebarContent: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2E36',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  userStats: {
    gap: 12,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  xpText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressContainer: {
    gap: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  navigation: {
    flex: 1,
    padding: 20,
  },
  navigationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: '#2D2E36',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuTitleActive: {
    color: '#6366F1',
  },
  menuDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: 12,
    bottom: 12,
    width: 3,
    borderRadius: 2,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2D2E36',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
