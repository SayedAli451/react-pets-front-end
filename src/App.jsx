import { useState, useEffect } from 'react'

// services
import * as petService from './services/petService'

// Comonents
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';

// Styling
import './App.css'
import PetForm from './components/PetForm';

function App() {
  const [petList, setPetList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index()

        if (pets.error) {
          throw new Error(pets.error)
        }

        setPetList(pets)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPets()
  }, [])

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData)

      if (newPet.error) throw new Error(newPet.error)

      setPetList([...petList, newPet])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdatePet = async (id, formData) => {
    try {
      const updatedPet = await petService.update(id, formData)

      if (updatedPet.error) throw new Error(updatedPet.error)

      const updatedList = petList.map(pet => {
        if (pet._id === updatedPet._id) {
          return updatedPet
        }

        return pet
      })

      setSelected(updatedPet)
      setPetList(updatedList)
      setIsFormOpen(false)

    } catch (error) {
      console.log(error)
    }
  }

  const handleRemovePet = async (id) => {
    try {
      const response = await petService.deletePet(id)

      if (response.error) throw new Error(response.error)

      const newPetList = petList.filter((pet) => pet._id !== id)
      setPetList(newPetList)
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PetList
        updateSelected={updateSelected}
        petList={petList}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {
        isFormOpen ? (
          < PetForm
            handleAddPet={handleAddPet}
            handleUpdatePet={handleUpdatePet}
            selected={selected}
          />
        ) : (
          <PetDetail
            selected={selected}
            handleFormView={handleFormView}
            handleRemovePet={handleRemovePet}
          />
        )
      }

    </>
  )
}

export default App