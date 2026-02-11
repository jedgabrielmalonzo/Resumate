import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login first
  return <Redirect href="/auth/login" />;
}