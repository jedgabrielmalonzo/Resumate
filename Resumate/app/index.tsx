import { Redirect } from 'expo-router';

export default function Index() {
  // For now, always redirect to login while we debug
  return <Redirect href="/auth/login" />;
}