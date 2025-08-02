
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="exercises" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="challenges" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="progress" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="exercise/[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="exercise-list" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="exercise-challenge/[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="leaderboard" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
      
      <StatusBar style="light" backgroundColor="#1A1B23" />
    </GestureHandlerRootView>
  );
}
