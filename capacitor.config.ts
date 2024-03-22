import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'my.notes.app2',
  appName: 'Notes App 2',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
