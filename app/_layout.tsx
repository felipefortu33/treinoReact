
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
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
            title: 'Exercício',
            headerStyle: {
              backgroundColor: '#3B82F6',
            },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
      
      <StatusBar style="light" />
    </>
  );
}
