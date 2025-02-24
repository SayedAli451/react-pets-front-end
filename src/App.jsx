
// src/App.jsx
import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';

const App = () => {
  const [selected, setSelected] = useState(null);
  const [petList, setPetList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();

        if (pets.error) {
          throw new Error(pets.error);
        }

        setPetList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }
  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);

      if (newPet.error) {
        throw new Error(newPet.error);
      }

      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  };
  return (
    <>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen} />

      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  )
};

export default App;