import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Componente básico para um item da lista de pessoas
const PersonItem = ({ person, onDelete, onSelect }) => (
  <View style={styles.personItemContainer}>
    <TouchableOpacity style={styles.personButton} onPress={() => onSelect(person)}>
      <Text style={styles.personName}>{person.name}</Text>
    </TouchableOpacity>
    <Button title="Deletar" onPress={() => onDelete(person.id)} color="red" />
  </View>
);

const PeopleScreen = ({ navigation }) => {
  // Estado para armazenar a lista de pessoas
  const [people, setPeople] = useState([]);
  // Estado para o nome da nova pessoa a ser adicionada (simplificado)
  const [newPersonName, setNewPersonName] = useState(''); // Você precisará de um input para isso

  // Efeito para carregar as pessoas (você precisará implementar a lógica de carregamento real)
  useEffect(() => {
    // Aqui você carregaria os dados das pessoas do seu armazenamento (banco de dados, etc.)
    // Exemplo de dados mockados:
    setPeople([
      { id: '1', name: 'João' },
      { id: '2', name: 'Maria' },
      { id: '3', name: 'José' },
    ]);
  }, []);

  // Função para adicionar uma nova pessoa (você precisará implementar a lógica real)
  const handleAddPerson = () => {
    // Aqui você adicionaria a nova pessoa ao seu armazenamento
    // Por enquanto, apenas adiciona aos dados mockados
    const newId = Date.now().toString(); // Gerar um ID simples (para exemplo)
    const newPerson = { id: newId, name: `Nova Pessoa ${people.length + 1}` }; // Exemplo de nome
    setPeople([...people, newPerson]);
    // Limpar o campo de input (você precisará ter um campo de input)
    // setNewPersonName('');
  };

  // Função para deletar uma pessoa (você precisará implementar a lógica real)
  const handleDeletePerson = (personId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta pessoa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            // Aqui você deletaria a pessoa do seu armazenamento
            setPeople(people.filter(person => person.id !== personId));
          }
        }
      ]
    );
  };

  // Função para selecionar uma pessoa e navegar para a próxima tela
  const handleSelectPerson = (person) => {
    // Navegar para a tela de informações mensais (Página 2)
    // Você precisará configurar a navegação em seu aplicativo (usando React Navigation, por exemplo)
    navigation.navigate('MonthlyInfo', { personId: person.id, personName: person.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleção de Pessoa</Text>
      <FlatList
        data={people}
        renderItem={({ item }) => (
          <PersonItem
            person={item}
            onDelete={handleDeletePerson}
            onSelect={handleSelectPerson}
          />
        )}
        keyExtractor={item => item.id}
      />
      {/* Você precisará de um input para digitar o nome da nova pessoa */}
      {/* Exemplo: <TextInput placeholder="Nome da nova pessoa" value={newPersonName} onChangeText={setNewPersonName} /> */}
      <Button title="Adicionar novo nome" onPress={handleAddPerson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  personItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  personButton: {
    flex: 1, // Ocupa o espaço restante
    marginRight: 10,
  },
  personName: {
    fontSize: 18,
  },
});

export default PeopleScreen;