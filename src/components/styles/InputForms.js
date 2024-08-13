// InputForms.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageBackground: { flex: 1, justifyContent: 'center' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    formContainer: { backgroundColor: '#fafafa', paddingHorizontal: 20, paddingVertical: 40, borderRadius: 15, width: '90%', alignItems: 'center' },
    input: { width: '100%', height: 37, borderWidth: 1, backgroundColor: '#ECECEC', borderColor: '#ECECEC', borderRadius: 20, marginBottom: 15, paddingHorizontal: 10 },
    signInText: { marginTop: 20, fontSize: 16, color: '#2F363B' },
    signInLink: { color: '#7731d8' },
    textArea: { borderColor: '#ECECEC', backgroundColor: '#ECECEC', borderWidth: 1, borderRadius: 15, padding: 10, textAlignVertical: 'top', width: '100%', height: "20%" },
});