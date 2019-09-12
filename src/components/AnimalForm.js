import React, {useState, useEffect}  from 'react'
import {withFormik, Form, Field} from 'formik'
import * as yup from 'yup'
import axios from 'axios'



const AnimalForm = ({errors, touched, status }) => {
  const [animals, setAnimals] = useState([])
  return (

    
    <Form >
      {touched.species && errors.species && <p className='error'>{errors.species}</p>}   
      <Field type="text" name="species" placeholder="Species"  />

      {touched.age && errors.age && <p className='error'>{errors.age}</p>}
      <Field type='number' name='age' placeholder='Age' />

      {touched.diet && errors.diet && <p className='error'>{errors.diet}</p>}
      <Field component='select' name='diet'>
      <option value='Carnivore'>Select Diet:</option>
      <option value='Carnivore'>Carnivore</option>
      <option value='Herbivore'>Herbivore</option>
      <option value='Omnivore'>Omnivore</option>
      </Field>
      {touched.vaccinations && errors.vaccinations && <p className='error'>{errors.vaccinations}</p>}
      <label>
      <Field type='checkbox' name='vaccinations'/>
      <span>Vaccinations</span>
      </label>
      <Field component='textarea' name='notes' placeholder='Notes' />


      
      {/* {can add component='text' or textarea...} */}
      <button type="submit">Submit</button>

      Species{status.species}<br />
      Age{status.age}<br />
      Diet{status.diet}<br />
      Vaccinations{status.vaccinations} />
    </Form>
  )
}
export default withFormik({
   //values come from formik automatically ---magic!
  mapPropsToValues: (props)=> {
   //this makes thes inputs 'controlled', sets the values automatically for us
    return {
      //these keys line up with the 'name
      species: props.species || '',
      age: props.age || '',
      diet: props.diet || '',
      vaccinations: props.vaccinations || false,
      notes: props.notes || ''
    }
  },
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required'),
    age: yup.number().positive(),
    diet: yup.string().required(),
    vaccinations: yup.boolean().oneOf([true]),
  }),
  handleSubmit: (props, {setStatus}) => {
      axios.post('https://reqres.in/api/animals', props)
      .then((res) => {
        setStatus(res.data)
      })
      .catch((err) => {
        console.log('Error:', err)
      })
      

    }
})(AnimalForm)
