// Importing the necessary modules 
import { 
    StyleSheet
} from 'react-native'; 

// Creating the style sheet 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7F2',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoShield: {
    width: 80,
    height: 90,
    backgroundColor: '#C8E6C9', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  logoLeaf: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 15, // Note: Requires React Native 0.71+
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

// Exporting the style sheet 
export default styles; 