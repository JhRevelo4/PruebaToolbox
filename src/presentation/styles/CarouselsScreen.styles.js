import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  listContent: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  error: {
    color: '#f87171',
    fontSize: 14,
    textAlign: 'center',
    padding: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
  },
  logoutTouch: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  logoutText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});
