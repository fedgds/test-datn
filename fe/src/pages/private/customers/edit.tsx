import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../../store/rootStore';

const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_number: Yup.string().required('Phone number is required')
      .min(10, 'Phone number must be 10 charecter')
      .max(10, 'Phone number must be 10 charecter')
  })

const CustomerEdit = () => {
    const { rootStore: { customerStore } } = useStore();
    const { getData, updateData } = customerStore;
    const { id } = useParams()

    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        full_name: "",
        email: "",
        phone_number: "",
      }
    })

    const onSubmit = async (data:any) => {
        try {
            if(id){
                const resData = await updateData(id, data)
                if (resData){
                    reset()
                    navigate('..')
                }
            }
        } catch (error:any) {
            Object.keys(error?.data).map((e:any) => {
                setError(e, {
                type: 'manual', // Use 'manual' for manually triggered errors
                message: error?.data[e],
                });
            })
        }
    }

    const initForm = async () => {
        try {
          if(id){
            const resData = await getData(id)
            reset(resData.data.customer)
          }else{
            navigate(-1)
          }
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error while fetching data:', error);
        }
      }
      useEffect(() => {
        initForm()
    }, [id])

    return (
        <Box sx={{ width: '100%' }}>
        <h4>Edit</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                    <TextField
                    {...field}
                    fullWidth
                    id="full_name"
                    label="Full name"
                    variant="filled"
                    error={!!errors.full_name}
                    helperText={errors.full_name?.message}
                    />
                )}
                />
            </Grid>
            <Grid item xs={7}>
                <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                    {...field}
                    fullWidth
                    id="email"
                    label="Email"
                    variant="filled"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    />
                )}
                />
            </Grid>
            <Grid item xs={5}>
                <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                    <TextField
                    {...field}
                    fullWidth
                    id="phone_number"
                    label="Phone number"
                    variant="filled"
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message}
                    />
                )}
                />
            </Grid>
            </Grid>
            <Button sx={{ mt: 2 }} type="submit" variant="contained" color="success">
                Save
            </Button>
            <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={() => navigate(-1)}>
                Back
            </Button>
        </form>
        </Box>
    );
}


export default observer(CustomerEdit)